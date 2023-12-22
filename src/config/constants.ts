type StatusType = 'completed' | 'pending' | 'failed' | 'abandoned'

interface ITask  {
  title: string
  status: StatusType
  proof: string
  userId: string
  keyId: string
  completionTimestamp: string
  deadlineTimestamp: string
} 

