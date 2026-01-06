import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, arbitrum, base, sepolia } from 'wagmi/chains';
import { createConfig, http } from 'wagmi';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

export const hasValidProjectId = !!projectId && projectId.length > 10;

if (!hasValidProjectId) {
  console.warn('[BART] WalletConnect Project ID not configured. Wallet features will be disabled.');
}

export const config = hasValidProjectId 
  ? getDefaultConfig({
      appName: 'BART Protocol',
      projectId: projectId,
      chains: [mainnet, polygon, arbitrum, base, sepolia],
    })
  : createConfig({
      chains: [mainnet, base],
      transports: {
        [mainnet.id]: http(),
        [base.id]: http(),
      },
    });
