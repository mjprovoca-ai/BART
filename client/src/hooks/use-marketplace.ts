import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface MarketplaceItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  seller: string;
  category: string;
  createdAt: string;
}

export function useMarketplaceItems() {
  return useQuery<MarketplaceItem[]>({
    queryKey: ["marketplace"],
    queryFn: async () => {
      const res = await fetch("/api/marketplace");
      if (!res.ok) throw new Error("Failed to fetch marketplace items");
      return res.json();
    },
    refetchInterval: 30000,
  });
}

export function useCreateMarketplaceItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; description: string; price: string; image: string; seller: string; category: string }) => {
      const res = await apiRequest("POST", "/api/marketplace", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marketplace"] });
    },
  });
}
