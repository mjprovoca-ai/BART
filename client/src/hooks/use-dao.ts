import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface Proposal {
  id: number;
  title: string;
  description: string;
  creator: string;
  votesFor: number;
  votesAgainst: number;
  status: string;
  endTime: string;
  createdAt: string;
}

export function useProposals() {
  return useQuery<Proposal[]>({
    queryKey: ["proposals"],
    queryFn: async () => {
      const res = await fetch("/api/dao/proposals");
      if (!res.ok) throw new Error("Failed to fetch proposals");
      return res.json();
    },
    refetchInterval: 15000,
  });
}

export function useCreateProposalApi() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { title: string; description: string; creator: string; endTime: string }) => {
      const res = await apiRequest("POST", "/api/dao/proposals", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
    },
  });
}

export function useVoteApi() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, voteType }: { id: number; voteType: "for" | "against" }) => {
      const res = await apiRequest("POST", `/api/dao/proposals/${id}/vote`, { voteType });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
    },
  });
}
