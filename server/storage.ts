import { type NetworkStats, type InsertNetworkStats } from "@shared/schema";

export interface IStorage {
  getLatestNetworkStats(): Promise<NetworkStats>;
  updateNetworkStats(stats: InsertNetworkStats): Promise<NetworkStats>;
}

export class MemStorage implements IStorage {
  private stats: NetworkStats;

  constructor() {
    // Initialize with default stats
    this.stats = {
      id: 1,
      uptimePercentage: 98,
      activeNodes: 1240,
      blockHeight: 8992102,
      totalTransactions: "45.2M+",
      averageFee: "< 0.001 BAR",
      updatedAt: new Date(),
    };
  }

  async getLatestNetworkStats(): Promise<NetworkStats> {
    return this.stats;
  }

  async updateNetworkStats(insertStats: InsertNetworkStats): Promise<NetworkStats> {
    this.stats = {
      ...this.stats,
      ...insertStats,
      updatedAt: new Date(),
    };
    return this.stats;
  }
}

export const storage = new MemStorage();
