type StatusType = 'completed' | 'pending' | 'failed' | 'abandoned'

export interface ITask  {
  title: string
  status: StatusType
  proofUrl: string
  userId: string
  userAddress: string
  keyId: string
  donationAddress: string,
  amount:string,
  completionTimestamp: number
  deadlineTimestamp: number
  txHash?: string
} 

