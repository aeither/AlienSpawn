import dotenv from "dotenv";
import type { NextApiRequest, NextApiResponse } from "next";
import { alienAddress, CHAIN_ID } from "../../utils/constants";
dotenv.config();

if (!process.env.CKEY) throw "CKEY not found";
const CKEY = process.env.CKEY;

const nfts = async (req: NextApiRequest, res: NextApiResponse) => {
  const baseURL = `https://api.covalenthq.com/v1/${CHAIN_ID}/`;
  const queryParams = `quote-currency=USD&format=JSON&key=${CKEY}`;
  const aliens: { owner: any; metadata: any; tokenId: any }[] = [];

  // get token ids
  const url_ids = baseURL.concat(
    `tokens/${alienAddress}/nft_token_ids/?`,
    queryParams
  );

  const response_ids = await fetch(url_ids)
    .then((response) => response.json())
    .catch((err) => console.error(err));

  await Promise.all(
    response_ids.data.items.map(async (item: any) => {
      // tokenId Metadata
      const url_metadata = baseURL.concat(
        `tokens/${alienAddress}/nft_metadata/${item.token_id}/?`,
        queryParams
      );

      // fetch metadata
      const response_metadata = await fetch(url_metadata)
        .then((response) => {
          return response.json();
        })
        .catch((err) => console.error(err));

      if (!response_metadata.error && response_metadata.data.items.length > 0) {
        response_metadata.data.items.forEach(async (metadata_item: any) => {
          aliens.push({
            tokenId: item.token_id,
            owner: metadata_item.nft_data[0].owner,
            metadata: metadata_item.nft_data[0].token_url,
          });
        });
      }
    })
  );

  console.log(aliens);
  res.json({ data: aliens });
};

export default nfts;
