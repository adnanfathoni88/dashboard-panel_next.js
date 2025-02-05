import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  stock: z.number().min(1, "Stock is required"),
});

const ProductsSchema = z.array(ProductSchema);
type Product = z.infer<typeof ProductSchema>;

export { ProductSchema, ProductsSchema, type Product };
