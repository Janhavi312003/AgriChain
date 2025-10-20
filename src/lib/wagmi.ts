import { createConfig, http } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { injected, coinbaseWallet } from 'wagmi/connectors'

export const config = createConfig({
  chains: [baseSepolia],
  connectors: [
    // MetaMask and other injected wallets
    injected({
      target: 'metaMask',
    }),
    // Coinbase Wallet
    coinbaseWallet({
      appName: 'AgriChain',
      appLogoUrl: 'https://agrichain.app/logo.png', // Optional: add your logo
      preference: 'smartWalletOnly', // Use smart wallet features
    }),
  ],
  transports: {
    [baseSepolia.id]: http('https://sepolia.base.org'),
  },
})
