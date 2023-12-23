import { sepolia } from 'viem/chains'

import fulgensABI from './abis/fulgens'
import challengeABI from './abis/challenge'

export const Contracts: { [key in string]: any } = {
  [sepolia.network]: {
    fulToken: {
      address: '0x765D0C57b993D3eD180001b817a6bCc13Ce7044e',
      abi: fulgensABI,
      chainId: sepolia.id,
    },
    challenge: {
      address: '0x685bCC921514b9809e06BB051e627c4EBe063e0b',
      abi: challengeABI,
      chainId: sepolia.id,
    },
  }
}

export default Contracts