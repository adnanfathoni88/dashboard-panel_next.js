import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "~/lib/prisma";
import { Prisma } from "@prisma/client";
import { type Product, ProductsSchema } from "~/types/products";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // get product by id
  if (req.method === "GET") {
    try {
      const { id } = req.query;

      const product = await prisma.product.findUnique({
        where: {
          id: id as string,
        },
      });

      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      res.status(200).json(product);
    } catch (e) {
      res.status(500).json({ error: "API - Error fetching products" });
    }
  }

  // update
  if (req.method === "PUT") {
    const { id } = req.query;
    const { name, description, stock } = req.body as Product;

    try {
      // cek duplikasi
      const isFound = await prisma.product.findFirst({
        where: {
          name: name,
          NOT: {
            id: id as string,
          },
        },
      });

      if (isFound) {
        res.status(400).json({ error: "Product name already exists" });
        return;
      } else {
        const updateUser = await prisma.product.update({
          where: {
            id: id as string,
          },
          data: {
            name,
            description,
            stock,
          },
        });

        res.status(200).json(updateUser);
      }
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan di server",
        error: (error as Error).message,
      });
    }
  }

  // delete
  if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      // isFound
      const isFound = await prisma.product.findUnique({
        where: {
          id: id as string,
        },
      });

      if (!isFound) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      const deleteProduct = await prisma.product.delete({
        where: {
          id: id as string,
        },
      });

      res.status(200).json(`Product with id: ${id as string} deleted`);
    } catch (error) {
      res.status(500).json({ error: "API - Error deleting product" });
    }
  }
}
