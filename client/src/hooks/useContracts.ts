import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { BAR_TOKEN_ABI, BAR_SALE_ABI, BAR_DAO_ABI } from '../contracts/abis';
import { getContractAddress, isContractDeployed, SALE_PHASES, PROPOSAL_STATES } from '../contracts/config';
import { useChainId, useAccount } from 'wagmi';

export function useTokenBalance(address?: `0x${string}`) {
  const chainId = useChainId();
  const deployed = isContractDeployed(chainId);
  
  return useReadContract({
    address: deployed ? getContractAddress(chainId, 'barToken') : undefined,
    abi: BAR_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && deployed,
    },
  });
}

export function useTokenTotalSupply() {
  const chainId = useChainId();
  const deployed = isContractDeployed(chainId);
  
  return useReadContract({
    address: deployed ? getContractAddress(chainId, 'barToken') : undefined,
    abi: BAR_TOKEN_ABI,
    functionName: 'totalSupply',
    query: {
      enabled: deployed,
    },
  });
}

export function useSaleStats() {
  const chainId = useChainId();
  const deployed = isContractDeployed(chainId);
  
  return useReadContract({
    address: deployed ? getContractAddress(chainId, 'barSale') : undefined,
    abi: BAR_SALE_ABI,
    functionName: 'getSaleStats',
    query: {
      enabled: deployed,
    },
  });
}

export function useCurrentSalePhase() {
  const chainId = useChainId();
  const deployed = isContractDeployed(chainId);
  
  const { data: phase } = useReadContract({
    address: deployed ? getContractAddress(chainId, 'barSale') : undefined,
    abi: BAR_SALE_ABI,
    functionName: 'currentPhase',
    query: {
      enabled: deployed,
    },
  });
  
  return {
    phase: phase as number | undefined,
    phaseName: phase !== undefined ? SALE_PHASES[phase as keyof typeof SALE_PHASES] : undefined,
  };
}

export function useCurrentPrice() {
  const chainId = useChainId();
  const deployed = isContractDeployed(chainId);
  
  return useReadContract({
    address: deployed ? getContractAddress(chainId, 'barSale') : undefined,
    abi: BAR_SALE_ABI,
    functionName: 'getCurrentPrice',
    query: {
      enabled: deployed,
    },
  });
}

export function useAvailableTokens() {
  const chainId = useChainId();
  const deployed = isContractDeployed(chainId);
  
  return useReadContract({
    address: deployed ? getContractAddress(chainId, 'barSale') : undefined,
    abi: BAR_SALE_ABI,
    functionName: 'getAvailableTokens',
    query: {
      enabled: deployed,
    },
  });
}

export function useBuyTokens() {
  const chainId = useChainId();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  
  const buyTokens = (ethAmount: string) => {
    const saleAddress = getContractAddress(chainId, 'barSale');
    writeContract({
      address: saleAddress,
      abi: BAR_SALE_ABI,
      functionName: 'buyTokens',
      value: parseEther(ethAmount),
    });
  };
  
  return {
    buyTokens,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

export function useProposalCount() {
  const chainId = useChainId();
  const deployed = isContractDeployed(chainId);
  
  return useReadContract({
    address: deployed ? getContractAddress(chainId, 'barDAO') : undefined,
    abi: BAR_DAO_ABI,
    functionName: 'proposalCount',
    query: {
      enabled: deployed,
    },
  });
}

export function useProposal(proposalId: number) {
  const chainId = useChainId();
  const deployed = isContractDeployed(chainId);
  
  const { data, isLoading, error } = useReadContract({
    address: deployed ? getContractAddress(chainId, 'barDAO') : undefined,
    abi: BAR_DAO_ABI,
    functionName: 'getProposal',
    args: [BigInt(proposalId)],
    query: {
      enabled: deployed && proposalId > 0,
    },
  });
  
  if (!data) return { data: undefined, isLoading, error };
  
  const [id, proposer, proposalType, title, description, forVotes, againstVotes, abstainVotes, startTime, endTime, state] = data as any;
  
  return {
    data: {
      id: Number(id),
      proposer,
      proposalType: Number(proposalType),
      title,
      description,
      forVotes: formatEther(forVotes),
      againstVotes: formatEther(againstVotes),
      abstainVotes: formatEther(abstainVotes),
      startTime: Number(startTime),
      endTime: Number(endTime),
      state: Number(state),
      stateName: PROPOSAL_STATES[Number(state) as keyof typeof PROPOSAL_STATES],
    },
    isLoading,
    error,
  };
}

export function useVotingPower(address?: `0x${string}`) {
  const chainId = useChainId();
  const deployed = isContractDeployed(chainId);
  
  return useReadContract({
    address: deployed ? getContractAddress(chainId, 'barDAO') : undefined,
    abi: BAR_DAO_ABI,
    functionName: 'getVotingPower',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && deployed,
    },
  });
}

export function useHasVoted(proposalId: number, voterAddress?: `0x${string}`) {
  const chainId = useChainId();
  const deployed = isContractDeployed(chainId);
  
  return useReadContract({
    address: deployed ? getContractAddress(chainId, 'barDAO') : undefined,
    abi: BAR_DAO_ABI,
    functionName: 'hasUserVoted',
    args: voterAddress ? [BigInt(proposalId), voterAddress] : undefined,
    query: {
      enabled: !!voterAddress && deployed && proposalId > 0,
    },
  });
}

export function useVote() {
  const chainId = useChainId();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  
  const vote = (proposalId: number, support: 0 | 1 | 2) => {
    const daoAddress = getContractAddress(chainId, 'barDAO');
    writeContract({
      address: daoAddress,
      abi: BAR_DAO_ABI,
      functionName: 'vote',
      args: [BigInt(proposalId), support],
    });
  };
  
  return {
    vote,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

export function useCreateProposal() {
  const chainId = useChainId();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  
  const createProposal = (
    type: number,
    title: string,
    description: string,
    targetContract: `0x${string}` = '0x0000000000000000000000000000000000000000',
    callData: `0x${string}` = '0x',
    value: bigint = BigInt(0)
  ) => {
    const daoAddress = getContractAddress(chainId, 'barDAO');
    writeContract({
      address: daoAddress,
      abi: BAR_DAO_ABI,
      functionName: 'createProposal',
      args: [type, title, description, targetContract, callData, value],
    });
  };
  
  return {
    createProposal,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

export function useTreasuryBalance() {
  const chainId = useChainId();
  const deployed = isContractDeployed(chainId);
  
  return useReadContract({
    address: deployed ? getContractAddress(chainId, 'barDAO') : undefined,
    abi: BAR_DAO_ABI,
    functionName: 'treasuryBalance',
    query: {
      enabled: deployed,
    },
  });
}

export function useActiveProposals() {
  const chainId = useChainId();
  const deployed = isContractDeployed(chainId);
  
  return useReadContract({
    address: deployed ? getContractAddress(chainId, 'barDAO') : undefined,
    abi: BAR_DAO_ABI,
    functionName: 'getActiveProposals',
    query: {
      enabled: deployed,
    },
  });
}
