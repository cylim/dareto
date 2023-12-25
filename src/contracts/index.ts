import { sepolia, polygonMumbai } from 'viem/chains'

import fulgensABI from './abis/fulgens'
import challengeABI from './abis/challenge'

export type SupportedNetworks = 'typeDef' | 'sepolia' | 'maticmum'
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
  },
  // [optimismSepolia.network]: {
  //   fulToken: {
  //     address: '0x77981d5Bc089192612Cf3DFC0E6e0Bfb5D70031D',
  //     abi: fulgensABI,
  //     chainId: optimismSepolia.id,
  //   },
  //   challenge: {
  //     address: '0x7e3c1F73F267Ec0789df187915f5E473ECc4aB80',
  //     abi: challengeABI,
  //     chainId: optimismSepolia.id,
  //   },
  // },
  // [baseSepolia.network]: {
  //   fulToken: {
  //     address: '0x7e3c1F73F267Ec0789df187915f5E473ECc4aB80',
  //     abi: fulgensABI,
  //     chainId: baseSepolia.id,
  //   },
  //   challenge: {
  //     address: '0x1E0436DDe892910827a5491e2691656Bc3D4E011',
  //     abi: challengeABI,
  //     chainId: baseSepolia.id,
  //   },
  // },
  [polygonMumbai.network]: {
    fulToken: {
      address: '0x2c581a5bb2157C58154a42e19e8E4329722AC824',
      abi: fulgensABI,
      chainId: polygonMumbai.id,
    },
    challenge: {
      address: '0xDdbBF6385f8c0876e5C02aE426bA32E5F7A44AEf',
      abi: challengeABI,
      chainId: polygonMumbai.id,
    },
  },
  'typeDef': {
    fulToken: {
      address: '0xAbc' as `0x${string}`,
      abi: fulgensABI,
      chainId: 0 as number,
    },
    challenge: {
      address: '0xAbc' as `0x${string}`,
      abi: challengeABI,
      chainId: 0 as number,
    },
  },
} as const satisfies {[key in SupportedNetworks]: {[key in SupportedContracts]: IContract}}

export default Contracts


// "a","0xAbB840EF2f94925e957B6680541793565d63f228",1704379627
