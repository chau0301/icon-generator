import type { NextApiRequest, NextApiResponse } from "next";
const dotenv = require("dotenv");
dotenv.config();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      console.log(111);
      const result = {};
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error handling request:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}