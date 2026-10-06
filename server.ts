import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import cors from "cors";
// @ts-ignore
import processHandler from "./api/process.js";
// @ts-ignore
import downloadHandler from "./api/download.js";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes: Delegate directly to shared serverless handlers
  app.post("/api/process", (req, res) => processHandler(req, res));
  app.get("/api/download", (req, res) => downloadHandler(req, res));

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SaveTok Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
