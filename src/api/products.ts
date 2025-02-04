// import { ProductsSchema, type Products } from "~/types/products";
import { z } from "zod";

const API_URL = "http://localhost:3000";

const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  stock: z.number(),
});

const ProductsSchema = z.array(ProductSchema);
type Product = z.infer<typeof ProductSchema>;

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_URL}/api/products`);

  const data = (await res.json()) as Product;

  const validatedData = ProductsSchema.parse(data);

  if (validatedData) {
    return validatedData;
  } else {
    throw new Error("Data is not valid");
  }
};
