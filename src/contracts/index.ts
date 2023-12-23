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
      address: '0x2c581a5bb2157C58154a42e19e8E4329722AC824',
      abi: challengeABI,
      chainId: sepolia.id,
    },
  }
}

export default Contracts