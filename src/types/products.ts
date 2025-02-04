import { z } from "zod";

const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

const CheapVariantSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
});

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  stock: z.number(),
  category: CategorySchema,
  cheapVariant: CheapVariantSchema,
  isFeatured: z.number(),
  sold: z.number(),
  image: z.string(),
  imageList: z.array(z.string()),
});

const ProductsSchema = z.array(ProductSchema); // schmea list produk
type Products = z.infer<typeof ProductsSchema>; // tipe data produk

export { ProductsSchema, type Products };
