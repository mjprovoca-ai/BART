import { useQuery } from "@tanstack/react-query";
import type { NetworkStats } from "@shared/schema";

async function fetchNetworkStats(): Promise<NetworkStats> {
  const response = await fetch("/api/stats");
  if (!response.ok) {
    throw new Error("Failed to fetch network stats");
  }
  return response.json();
}

export function useNetworkStats() {
  return useQuery({
    queryKey: ["networkStats"],
    queryFn: fetchNetworkStats,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 25000, // Consider data fresh for 25 seconds
  });
}
