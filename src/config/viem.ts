import { chain } from '@/components/auth/Auth'
import { createPublicClient, http } from 'viem'

export const publicClient = createPublicClient({
  chain: chain,
  transport: http()
})