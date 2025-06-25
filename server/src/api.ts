import express from "express";
import http from "http";
import pixelArtLibrary from "./pixelArtLibrary";

export default class ApiServer {
  static async start(app: express.Application, httpServer: http.Server): Promise<void> {
    // Add pixel art library endpoint
    app.use(pixelArtLibrary);

    app.use(express.json()); // Ensure JSON body parsing

    app.post("/init", async (req, res) => {
      res
        .send(
          JSON.stringify({
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
