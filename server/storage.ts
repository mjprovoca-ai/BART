import { 
  type NetworkStats, type InsertNetworkStats,
  type MarketplaceItem, type InsertMarketplaceItem,
  type DaoProposal, type InsertDaoProposal,
  networkStats, marketplaceItems, daoProposals
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getLatestNetworkStats(): Promise<NetworkStats>;
  updateNetworkStats(stats: InsertNetworkStats): Promise<NetworkStats>;
  
  // Marketplace
  getAllMarketplaceItems(): Promise<MarketplaceItem[]>;
  createMarketplaceItem(item: InsertMarketplaceItem): Promise<MarketplaceItem>;
  
  // DAO
  getAllProposals(): Promise<DaoProposal[]>;
  createProposal(proposal: InsertDaoProposal): Promise<DaoProposal>;
  voteOnProposal(id: number, voteType: "for" | "against"): Promise<DaoProposal>;
}

export class DatabaseStorage implements IStorage {
  async getLatestNetworkStats(): Promise<NetworkStats> {
    const [stats] = await db.select().from(networkStats).orderBy(desc(networkStats.updatedAt)).limit(1);
    if (!stats) {
      const defaultStats: InsertNetworkStats = {
        uptimePercentage: 98,
        activeNodes: 1240,
        blockHeight: 8992102,
        totalTransactions: "45.2M+",
        averageFee: "< 0.001 BAR",
      };
      return await this.updateNetworkStats(defaultStats);
    }
    return stats;
  }

  async updateNetworkStats(insertStats: InsertNetworkStats): Promise<NetworkStats> {
    const [stats] = await db.insert(networkStats).values(insertStats).returning();
    return stats;
  }

  async getAllMarketplaceItems(): Promise<MarketplaceItem[]> {
    return await db.select().from(marketplaceItems).orderBy(desc(marketplaceItems.createdAt));
  }

  async createMarketplaceItem(item: InsertMarketplaceItem): Promise<MarketplaceItem> {
    const [newItem] = await db.insert(marketplaceItems).values(item).returning();
    return newItem;
  }

  async getAllProposals(): Promise<DaoProposal[]> {
    return await db.select().from(daoProposals).orderBy(desc(daoProposals.createdAt));
  }

  async createProposal(proposal: InsertDaoProposal): Promise<DaoProposal> {
    const [newProposal] = await db.insert(daoProposals).values(proposal).returning();
    return newProposal;
  }

  async voteOnProposal(id: number, voteType: "for" | "against"): Promise<DaoProposal> {
    const [proposal] = await db.select().from(daoProposals).where(eq(daoProposals.id, id));
    if (!proposal) throw new Error("Proposal not found");

    const update = voteType === "for" 
      ? { votesFor: proposal.votesFor + 1 }
      : { votesAgainst: proposal.votesAgainst + 1 };

    const [updated] = await db.update(daoProposals)
      .set(update)
      .where(eq(daoProposals.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
