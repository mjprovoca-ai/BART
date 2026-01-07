import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

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
    try {
      const item = await storage.createMarketplaceItem(req.body);
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
    try {
      const proposal = await storage.createProposal(req.body);
      res.json(proposal);
    } catch (error) {
      res.status(500).json({ error: "Failed to create proposal" });
    }
  });

  app.post("/api/dao/proposals/:id/vote", async (req, res) => {
    try {
      const { voteType } = req.body;
      const proposal = await storage.voteOnProposal(Number(req.params.id), voteType);
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
