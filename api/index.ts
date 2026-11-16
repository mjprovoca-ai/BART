import type { IncomingMessage, ServerResponse } from "http";
import { createApiApp } from "../server/app";

// Vercel serverless entry: every /api/* request is rewritten here (see
// vercel.json). The Express app is built once per function instance.
const appPromise = createApiApp();

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const app = await appPromise;
  return app(req as any, res as any);
}
