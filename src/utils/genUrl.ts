import { Reference } from "@solana/pay";
import axios from "axios";

const genUrl = async (
  merchant: string,
  amount: number,
  input_token: string,
  reference: Reference,
  network: "devnet" | "mainnet"
) => {
  const res = await axios.post(
    `https://pay.candypay.fun/api/v1/atomic/generate`,
    {
      merchant,
      amount,
      input_token,
      reference,
      network,
    }
  );

  return res.data.metadata.solana_url;
};

export { genUrl };
