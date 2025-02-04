import { type NextApiRequest, type NextApiResponse } from "next";
import prisma from "~/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany();
      res.status(200).json(products);
    } catch (e) {
      res.status(500).json({ error: "Error fetching products" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
