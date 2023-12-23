import { getDefaultConfig } from 'connectkit'
import { configureChains, createConfig } from 'wagmi'
import { sepolia} from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'ad88a7fba1ca3be8bd78d6c719fc304a'

const { publicClient } = configureChains([sepolia], [publicProvider()])

export const config = createConfig({
  ...getDefaultConfig({
    chains: [sepolia],
    publicClient,
    autoConnect: true,
    appName: `${process.env.NEXT_PUBLIC_APP_NAME || 'JinOro'}`,
    appUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://jinoro.xyz'}`,
    walletConnectProjectId,
  }),
  logger: {
    warn: null,
  },
}
)

