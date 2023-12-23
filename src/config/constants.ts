type StatusType = 'completed' | 'pending' | 'failed' | 'abandoned'

export interface ITask  {
  title: string
  status: StatusType
  proofUrl: string
  userId: string
  keyId: string
  completionTimestamp: number
  deadlineTimestamp: number
} 

