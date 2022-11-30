import dotenv from "dotenv";
import type { NextApiRequest, NextApiResponse } from "next";
import { alienAddress, CHAIN_ID } from "../../utils/constants";
dotenv.config();

if (!process.env.CKEY) throw "CKEY not found";
const CKEY = process.env.CKEY;

const txs = async (req: NextApiRequest, res: NextApiResponse) => {
  const baseURL = `https://api.covalenthq.com/v1/${CHAIN_ID}/`;
  const queryParams = `quote-currency=USD&format=JSON&key=${CKEY}`;
  const { tokenId } = req.query;

  // get token txs
  const url_txs = baseURL.concat(
    `tokens/${alienAddress}/nft_transactions/${tokenId}/?`,
    queryParams
  );

  // fetch
  const response = await fetch(url_txs)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.error(err));

  const txInfos: any = [];
  response.data.items.map((item: any) => {
    item.nft_transactions.map((tx: any) => {
      txInfos.push({
        block: tx.block_height,
        from: tx.from_address,
        to: tx.to_address,
        value: tx.value,
        fee: tx.fees_paid,
        time: tx.block_signed_at,
        hash: tx.tx_hash,
      });
    });
  });

  console.log(response);
  res.json({ data: txInfos });
};

export default txs;
