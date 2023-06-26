import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const dotenv = require("dotenv");
dotenv.config();

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeKey, { apiVersion: "2022-11-15" });

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { priceId, value } = req.body;      
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: priceId,
            quantity: (value/10000),
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.status(200).json({ url: session.url });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
