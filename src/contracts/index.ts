import { sepolia } from 'wagmi/chains'

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
      address: '0x831DbbAE0E244c587057863F0090f9F03f6d6BC8',
      abi: challengeABI,
      chainId: sepolia.id,
    },
  }
}

export default Contracts