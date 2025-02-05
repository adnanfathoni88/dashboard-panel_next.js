// import { ProductsSchema, type Products } from "~/types/products";
import { z } from "zod";
import axios from "axios";
import { type Product, ProductsSchema, ProductSchema } from "~/types/products";

const API_URL = "http://localhost:3000";

// get products
export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/api/products`);
  return ProductsSchema.parse(response.data);
};

// add product

export const addProduct = async (
  product: Product,
): Promise<Product | undefined> => {
  try {
    const response = await axios.post(`${API_URL}/api/products`, product);
    return ProductSchema.parse(response.data as Product); // Assert the type here
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.error ?? "Error adding product");
    }
  }
};
