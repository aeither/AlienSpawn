import dotenv from "dotenv";
import type { NextApiRequest, NextApiResponse } from "next";
import { CHAIN_ID } from "../../utils/constants";
dotenv.config();

if (!process.env.CKEY) throw "CKEY not found";
const CKEY = process.env.CKEY;

const balance = async (req: NextApiRequest, res: NextApiResponse) => {
  const baseURL = `https://api.covalenthq.com/v1/${CHAIN_ID}/`;
  const queryParams = `quote-currency=USD&format=JSON&key=${CKEY}`;
  const { address } = req.query;

  // tevmos balance
  const url = baseURL.concat(`address/${address}/balances_v2/?`, queryParams);

  const response = await fetch(url)
    .then((response) => response.json())
    .catch((err) => console.error(err));

  res.json({ data: response.data });
};

export default balance;
