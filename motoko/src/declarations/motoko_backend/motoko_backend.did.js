export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Result_1 = IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text });
  const Task = IDL.Record({
    'status' : IDL.Text,
    'title' : IDL.Text,
    'proofUrl' : IDL.Text,
    'deadlineTimestamp' : Time,
    'donationAddress' : IDL.Text,
    'userId' : IDL.Principal,
    'createdAt' : Time,
    'updatedAt' : Time,
    'txHash' : IDL.Text,
    'amount' : IDL.Text,
    'completionTimestamp' : Time,
    'keyId' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : Task, 'err' : IDL.Text });
  return IDL.Service({
    'add' : IDL.Func([IDL.Text, IDL.Text, Time, IDL.Text, IDL.Text], [], []),
    'complete' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Result_1], []),
    'forfeit' : IDL.Func([IDL.Text, IDL.Text], [Result_1], []),
    'getTask' : IDL.Func([IDL.Text], [Result], ['query']),
    'isAnonymous' : IDL.Func([], [IDL.Bool], []),
    'tasks' : IDL.Func([], [IDL.Vec(Task)], ['query']),
    'whoami' : IDL.Func([], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
