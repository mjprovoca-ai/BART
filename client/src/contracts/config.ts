import { base, baseSepolia } from 'wagmi/chains';

export const SUPPORTED_CHAIN = baseSepolia;

export const CONTRACT_ADDRESSES = {
  [baseSepolia.id]: {
    barToken: '0x0000000000000000000000000000000000000000' as `0x${string}`,
    barSale: '0x0000000000000000000000000000000000000000' as `0x${string}`,
    barDAO: '0x0000000000000000000000000000000000000000' as `0x${string}`,
  },
  [base.id]: {
    barToken: '0x0000000000000000000000000000000000000000' as `0x${string}`,
    barSale: '0x0000000000000000000000000000000000000000' as `0x${string}`,
    barDAO: '0x0000000000000000000000000000000000000000' as `0x${string}`,
  },
} as const;

export const SALE_PHASES = {
  0: 'NotStarted',
  1: 'Seed',
  2: 'Private',
  3: 'Public',
  4: 'Ended',
} as const;

export const PROPOSAL_STATES = {
  0: 'Pending',
  1: 'Active',
  2: 'Defeated',
  3: 'Succeeded',
  4: 'Executed',
  5: 'Cancelled',
} as const;

export const PROPOSAL_TYPES = {
  0: 'FundAllocation',
  1: 'Partnership',
  2: 'ProtocolChange',
  3: 'Other',
} as const;

export const TOKENOMICS = {
  totalSupply: 100_000_000,
  publicSale: 40_000_000,
  daoTreasury: 30_000_000,
  team: 15_000_000,
  marketing: 10_000_000,
  liquidity: 5_000_000,
  
  seedAllocation: 10_000_000,
  privateAllocation: 15_000_000,
  publicAllocation: 15_000_000,
  
  seedPrice: 0.01,
  privatePrice: 0.025,
  publicPrice: 0.05,
  
  seedTarget: 100_000,
  privateTarget: 375_000,
  publicTarget: 750_000,
} as const;

export function getContractAddress(chainId: number, contract: 'barToken' | 'barSale' | 'barDAO') {
  const addresses = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES];
  if (!addresses) {
    throw new Error(`Unsupported chain ID: ${chainId}`);
  }
  return addresses[contract];
}

export function isContractDeployed(chainId: number): boolean {
  const addresses = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES];
  if (!addresses) return false;
  return addresses.barToken !== '0x0000000000000000000000000000000000000000';
}
