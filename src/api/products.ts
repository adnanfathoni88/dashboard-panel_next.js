// import { ProductsSchema, type Products } from "~/types/products";
import axios from "axios";
import { type Product, ProductsSchema, ProductSchema } from "~/types/products";
import { actionAsyncStorage } from "next/dist/server/app-render/action-async-storage.external";

const API_URL = "http://localhost:3000";

// get products
export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/api/products`);
  return ProductsSchema.parse(response.data);
};

// get product by id
export const getProductById = async (id: string): Promise<Product> => {
  const response = await axios.get(`${API_URL}/api/products/${id}`);
  return ProductSchema.parse(response.data);
};

// add product
export const addProduct = async (
  product: Product,
): Promise<Product | undefined> => {
  try {
    const response = await axios.post<Product>(
      `${API_URL}/api/products`,
      product,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errors: string =
        (error.response?.data as { error?: string })?.error ??
        "Error adding product";
      throw new Error(errors);
    }
  }
};

// update product
export const updateProduct = async ({
  productId,
  product,
}: {
  productId: string;
  product: Product;
}): Promise<Product | undefined> => {
  try {
    const response = await axios.put<Product>(
      `${API_URL}/api/products/${productId}`,
      product,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errors: string =
        (error.response?.data as { error?: string })?.error ??
        "Error updating product";
      throw new Error(errors);
    }
  }
};

// delete
export const deleteProduct = async (id: string): Promise<string> => {
  const response = await axios.delete(`${API_URL}/api/products/${id}`);
  return response.data as string;
};

