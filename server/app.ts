import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { registerRoutes } from "./routes";

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

/**
 * Builds the Express app with body parsing and the API routes, without
 * starting a listener. Shared by the long-running server (server/index.ts)
 * and the Vercel function (api/index.ts).
 */
export function createApp(): { app: Express; httpServer: Server } {
  const app = express();
  const httpServer = createServer(app);

  app.use(
    express.json({
      verify: (req, _res, buf) => {
        req.rawBody = buf;
      },
    }),
  );
  app.use(express.urlencoded({ extended: false }));

  return { app, httpServer };
}

export async function createApiApp(): Promise<Express> {
  const { app, httpServer } = createApp();
  await registerRoutes(httpServer, app);
  return app;
}
