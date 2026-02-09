import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, arbitrum, base, sepolia } from 'wagmi/chains';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '';

export const hasValidProjectId = !!projectId && projectId.length > 5;

const fallbackProjectId = 'bartbank_placeholder_id';

export const config = getDefaultConfig({
  appName: 'BART Protocol',
  projectId: hasValidProjectId ? projectId : fallbackProjectId,
  chains: [mainnet, polygon, arbitrum, base, sepolia],
});
