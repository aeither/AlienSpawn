import axios from "axios";
import dotenv from "dotenv";
import type { NextApiRequest, NextApiResponse } from "next";
dotenv.config();

if (!process.env.API_URL) throw "API_URL not found";
const API_KEY = process.env.API_KEY;

const server = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;

  const options = {
    url: `convalent-${address}`,
  };

  const response: any = await axios.request(options).catch(function (error) {
    console.error(error);
  });

  res.json({ data: response.data });
};

export default server;
