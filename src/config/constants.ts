export type StatusType = 'pending' | 'completed' | 'failed'

export interface ITask  {
  title: string
  status: StatusType
  proofUrl: string
  userId: string
  userAddress: string
  keyId: string
  donationAddress: string,
  amount:string,
  completionTimestamp: BigInt
  deadlineTimestamp: BigInt
  txHash?: string
  createdAt: BigInt
  updatedAt: BigInt
} 

