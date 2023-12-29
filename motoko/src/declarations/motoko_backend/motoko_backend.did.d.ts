import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Result = { 'ok' : Task } |
  { 'err' : string };
export type Result_1 = { 'ok' : boolean } |
  { 'err' : string };
export interface Task {
  'status' : string,
  'title' : string,
  'proofUrl' : string,
  'deadlineTimestamp' : Time,
  'donationAddress' : string,
  'userId' : Principal,
  'createdAt' : Time,
  'updatedAt' : Time,
  'txHash' : string,
  'amount' : string,
  'completionTimestamp' : Time,
  'keyId' : string,
}
export type Time = bigint;
export interface _SERVICE {
  'add' : ActorMethod<[string, string, Time, string, string], undefined>,
  'complete' : ActorMethod<[string, string, string], Result_1>,
  'forfeit' : ActorMethod<[string, string], Result_1>,
  'getTask' : ActorMethod<[string], Result>,
  'isAnonymous' : ActorMethod<[], boolean>,
  'tasks' : ActorMethod<[], Array<Task>>,
  'whoami' : ActorMethod<[], Principal>,
}
