import dotenv from "dotenv";
import type { NextApiRequest, NextApiResponse } from "next";
import { alienAddress, CHAIN_ID } from "../../utils/constants";
dotenv.config();

if (!process.env.CKEY) throw "CKEY not found";
const CKEY = process.env.CKEY;

const nft = async (req: NextApiRequest, res: NextApiResponse) => {
  const baseURL = `https://api.covalenthq.com/v1/${CHAIN_ID}/`;
  const queryParams = `quote-currency=USD&format=JSON&key=${CKEY}`;
  const { tokenId } = req.query;

  // tokenId Metadata
  const url_metadata = baseURL.concat(
    `tokens/${alienAddress}/nft_metadata/${tokenId}/?`,
    queryParams
  );

  // fetch metadata
  const response_metadata = await fetch(url_metadata)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.error(err));

  let data;
  if (!response_metadata.error && response_metadata.data.items.length > 0) {
    data = response_metadata.data.items[0].nft_data[0].token_url;
  }

  console.log(data);
  res.json({ data: data });
};

export default nft;
