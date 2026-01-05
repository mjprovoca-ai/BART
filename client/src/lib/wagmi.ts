import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, arbitrum, base, sepolia } from 'wagmi/chains';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  console.error('[BART] WalletConnect Project ID not configured. Set VITE_WALLETCONNECT_PROJECT_ID in environment.');
}

export const config = getDefaultConfig({
  appName: 'BART Protocol',
  projectId: projectId || '',
  chains: [mainnet, polygon, arbitrum, base, sepolia],
});
