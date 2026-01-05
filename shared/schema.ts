import { pgTable, text, integer, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Network statistics - can be updated dynamically
export const networkStats = pgTable("network_stats", {
  id: serial("id").primaryKey(),
  uptimePercentage: integer("uptime_percentage").notNull().default(98),
  activeNodes: integer("active_nodes").notNull().default(1240),
  blockHeight: integer("block_height").notNull().default(8992102),
  totalTransactions: text("total_transactions").notNull().default("45.2M+"),
  averageFee: text("average_fee").notNull().default("< 0.001 BAR"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertNetworkStatsSchema = createInsertSchema(networkStats).omit({
  id: true,
  updatedAt: true,
});

export type NetworkStats = typeof networkStats.$inferSelect;
export type InsertNetworkStats = z.infer<typeof insertNetworkStatsSchema>;
