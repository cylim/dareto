import { sepolia, mainnet } from 'viem/chains'

import fulgensABI from './abis/fulgens'
import challengeABI from './abis/challenge'

type SupportedNetworks = 'sepolia'
type SupportedContracts = 'fulToken' | 'challenge'

interface IContract {
  address: string
  abi: any
  chainId: number
}

export const Contracts = {
  [sepolia.network]: {
    fulToken: {
      address: '0x765D0C57b993D3eD180001b817a6bCc13Ce7044e',
      abi: fulgensABI,
      chainId: sepolia.id,
    },
    challenge: {
      address: '0x0d36FfaA0711B805498675CDbF40607b48c85653',
      abi: challengeABI,
      chainId: sepolia.id,
    },
  }
} as const satisfies {[key in SupportedNetworks]: {[key in SupportedContracts]: IContract}}

export default Contracts


// "a","0xAbB840EF2f94925e957B6680541793565d63f228",1704379627
