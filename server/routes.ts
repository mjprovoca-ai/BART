import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import {
  insertMarketplaceItemSchema,
  insertDaoProposalSchema,
} from "../shared/schema";

// Only the fields a visitor may set. Vote counts and status always start at
// their defaults; endTime arrives as an ISO string over JSON.
const createProposalSchema = insertDaoProposalSchema
  .pick({ title: true, description: true, creator: true })
  .extend({ endTime: z.coerce.date() });

const voteSchema = z.object({ voteType: z.enum(["for", "against"]) });

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // GET /api/stats - Get current network statistics
  app.get("/api/stats", async (_req, res) => {
    try {
      const stats = await storage.getLatestNetworkStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch network stats" });
    }
  });

  // Marketplace
  app.get("/api/marketplace", async (_req, res) => {
    try {
      const items = await storage.getAllMarketplaceItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch marketplace items" });
    }
  });

  app.post("/api/marketplace", async (req, res) => {
    const parsed = insertMarketplaceItemSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid marketplace item" });
    }
    try {
      const item = await storage.createMarketplaceItem(parsed.data);
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to create marketplace item" });
    }
  });

  // DAO
  app.get("/api/dao/proposals", async (_req, res) => {
    try {
      const proposals = await storage.getAllProposals();
      res.json(proposals);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch proposals" });
    }
  });

  app.post("/api/dao/proposals", async (req, res) => {
    const parsed = createProposalSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid proposal" });
    }
    try {
      const proposal = await storage.createProposal(parsed.data);
      res.json(proposal);
    } catch (error) {
      res.status(500).json({ error: "Failed to create proposal" });
    }
  });

  app.post("/api/dao/proposals/:id/vote", async (req, res) => {
    const id = Number(req.params.id);
    const parsed = voteSchema.safeParse(req.body);
    if (!Number.isInteger(id) || !parsed.success) {
      return res.status(400).json({ error: "Invalid vote" });
    }
    try {
      const proposal = await storage.voteOnProposal(id, parsed.data.voteType);
      if (!proposal) {
        return res.status(404).json({ error: "Proposal not found" });
      }
      res.json(proposal);
    } catch (error) {
      res.status(500).json({ error: "Failed to vote on proposal" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "operational", timestamp: new Date().toISOString() });
  });

  return httpServer;
}
