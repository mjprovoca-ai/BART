import { pgTable, text, integer, timestamp, serial, jsonb } from "drizzle-orm/pg-core";
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

export const marketplaceItems = pgTable("marketplace_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  image: text("image").notNull(),
  seller: text("seller").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const daoProposals = pgTable("dao_proposals", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  creator: text("creator").notNull(),
  votesFor: integer("votes_for").notNull().default(0),
  votesAgainst: integer("votes_against").notNull().default(0),
  status: text("status").notNull().default("active"),
  endTime: timestamp("end_time").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertNetworkStatsSchema = createInsertSchema(networkStats).omit({
  id: true,
  updatedAt: true,
});

export const insertMarketplaceItemSchema = createInsertSchema(marketplaceItems).omit({
  id: true,
  createdAt: true,
});

export const insertDaoProposalSchema = createInsertSchema(daoProposals).omit({
  id: true,
  createdAt: true,
});

export type NetworkStats = typeof networkStats.$inferSelect;
export type InsertNetworkStats = z.infer<typeof insertNetworkStatsSchema>;

export type MarketplaceItem = typeof marketplaceItems.$inferSelect;
export type InsertMarketplaceItem = z.infer<typeof insertMarketplaceItemSchema>;

export type DaoProposal = typeof daoProposals.$inferSelect;
export type InsertDaoProposal = z.infer<typeof insertDaoProposalSchema>;
