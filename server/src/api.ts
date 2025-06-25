import express from "express";
import { Connection } from "@solana/web3.js";
import { cluster, url, urlTls } from "./urls";
import { PROGRAM_ID } from "./program";
import TpuProxy from "./tpu_proxy";
import WebSocketServer from "./websocket";
import http from "http";

export default class ApiServer {
  static async start(app: express.Application, httpServer: http.Server): Promise<void> {
    const connection = new Connection(url, "confirmed");
    const tpuProxy = await TpuProxy.create(connection);
    WebSocketServer.start(httpServer, tpuProxy);

    await tpuProxy.connect();

    const programId = PROGRAM_ID?.toBase58();
    if (!programId) {
      throw new Error("Internal error: program id is missing");
    }

    app.use(express.json()); // Ensure JSON body parsing

    app.post("/init", async (req, res) => {
      res
        .send(
          JSON.stringify({
            programId,
            clusterUrl: urlTls,
            cluster,
            paymentRequired: process.env.REQUIRE_PAYMENT === "true",
          })
        )
        .end();
    });

    app.post("/mint-nft", async (req, res) => {
      // Expect { pixels: number[][] }
      const { pixels } = req.body;
      if (!pixels || !Array.isArray(pixels)) {
        res.status(400).json({ error: "Missing or invalid pixel grid data" });
        return;
      }
      // TODO: Convert pixel grid to image, build NFT minting instruction, and submit to Gorbagana blockchain
      // For now, return a mock response
      res.json({
        success: true,
        message: "NFT minting instruction created (mock)",
        // imageData: <base64 image>,
        // txSignature: <signature>,
      });
    });
  }
}
