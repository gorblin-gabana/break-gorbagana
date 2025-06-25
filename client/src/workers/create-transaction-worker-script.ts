import { Transaction, Keypair, PublicKey } from "@solana/web3.js";

// This worker now only creates Memo transactions for pixel changes

const self: any = globalThis;

self.onmessage = function (event: MessageEvent) {
  const { trackingId, blockhash, payerSecretKey, memo } = event.data;
  try {
    const payer = Keypair.fromSecretKey(new Uint8Array(payerSecretKey));
    const transaction = new Transaction();
    transaction.add({
      keys: [],
      programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
      data: Buffer.from(memo),
    });
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = payer.publicKey;
    transaction.sign(payer);
    self.postMessage({ trackingId, transaction: transaction.serialize() });
  } catch (error) {
    let message = (error instanceof Error) ? error.message : String(error);
    self.postMessage({ trackingId, error: message });
  }
};
