import Principal "mo:base/Principal";
import Time "mo:base/Time";
import List "mo:base/List";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";

actor Challenger {
  public type Task = {
    keyId : Text;
    userId : Principal;
    title : Text;
    status : Text;
    deadlineTimestamp : Time.Time;
    completionTimestamp : Time.Time;
    amount : Int;
    donationAddress : Text;
    proofUrl : Text;
    txHash : Text;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };
  let onlyOwner = func(caller : Principal) : Task -> Bool {func(m : Task) : Bool { m.userId == caller } };
  let keyHash = func(n : Text) : Hash.Hash { Text.hash(n) };

  var _tasks = HashMap.HashMap<Text, Task>(0, Text.equal, keyHash);
  stable var backup : [(Text, Task)] = [];

  system func preupgrade() {
    backup := Iter.toArray(_tasks.entries());
  };
  system func postupgrade() {
    _tasks := HashMap.fromIter<Text, Task>(backup.vals(), backup.size(), Text.equal, keyHash);
    backup := [];
  };

  func getSingleTask(keyId : Text) : Result.Result<Task, Text> {
    let selected = _tasks.get(keyId);
    let task : Task = switch selected {
      case null return #err "Failed to complete task";
      case (?Task) Task;
    };
    #ok task;
  };

  func updateTask(task : Task, status : Text, proofUrl : Text, txHash : Text) : Task {
    {
      keyId = task.keyId;
      userId = task.userId;
      title = task.title;
      deadlineTimestamp = task.deadlineTimestamp;
      amount = task.amount;
      donationAddress = task.donationAddress;
      status = status;
      completionTimestamp = Time.now();
      proofUrl = proofUrl;
      txHash = txHash;
      createdAt = task.createdAt;
      updatedAt = Time.now();
    };
  };

  public shared ({ caller : Principal }) func add(keyId : Text, title : Text, deadline : Time.Time, amount : Int, donationAddress : Text) : async () {
    assert (Principal.isAnonymous(caller) != false);

    let task : Task = {
      keyId = keyId;
      userId = caller;
      title = title;
      status = "pending";
      deadlineTimestamp = deadline;
      completionTimestamp = 0;
      amount = amount;
      donationAddress = donationAddress;
      proofUrl = "";
      txHash = "";
      createdAt = Time.now();
      updatedAt = Time.now();
    };
    _tasks.put(keyId, task);
  };

  public shared (msg) func complete(keyId : Text, proofUrl : Text, txHash : Text) : async Result.Result<Bool, Text> {
    let task = switch (getSingleTask(keyId)) {
      case (#err(err)) return #err err;
      case (#ok(task)) task;
    };
    assert (onlyOwner(msg.caller)(task) == true);
    assert (task.status == "pending");

    _tasks.put(keyId, updateTask(task, "completed", proofUrl, txHash));
    #ok true;
  };

  public shared (msg) func forfeit(keyId : Text, txHash : Text) : async Result.Result<Bool, Text> {
    let task = switch (getSingleTask(keyId)) {
      case (#err(err)) return #err err;
      case (#ok(task)) task;
    };
    assert (onlyOwner(msg.caller)(task) == true);
    assert (task.status == "pending");

    _tasks.put(keyId, updateTask(task, "failed", "", txHash));
    #ok true;
  };

  public shared query (msg) func getTask(keyId: Text) : async Result.Result<Task, Text> {
    let task = switch (getSingleTask(keyId)) {
      case (#err(err)) return #err err;
      case (#ok(task)) task;
    };
    assert (onlyOwner(msg.caller)(task) == true);

    #ok task;
  };

  public shared query (msg) func tasks() : async [Task] {
    List.toArray(List.filter(Iter.toList(_tasks.vals()), onlyOwner(msg.caller)));
  };

  public shared (msg) func whoami() : async Principal {
      msg.caller
  };
  public shared (msg) func isAnonymous() : async Bool {
      Principal.isAnonymous(msg.caller)
  };
};
