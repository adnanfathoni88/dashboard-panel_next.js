import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "~/lib/prisma";
import { Prisma } from "@prisma/client";
import { type Product, ProductsSchema } from "~/types/products";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // get products
  if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany();
      res.status(200).json(products);
    } catch (e) {
      res.status(500).json({ error: "API - Error fetching products" });
    }
  }

  // post product
  if (req.method === "POST") {
    const { name, description, stock } = req.body as Product;

    try {
      const product = await prisma.product.create({
        data: {
          name,
          description,
          stock,
        },
      });

      res.status(201).json(product);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // P2002
        if (e.code === "P2002") {
          res.status(400).json({ error: "Product name already exists" });
        }
      } else {
        res.status(500).json({ error: "PRISMA - Error adding product" });
      }
    }
  }
}
