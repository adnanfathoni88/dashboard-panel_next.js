import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, getProductById, addProduct, updateProduct } from "~/api/products";
import { type Product } from "~/types/products";

// get products
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

// get product by id
export const useProductById = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
  });
}

// add product
export const useAddProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};

// update product
export const useUpdateProduct = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Product) => updateProduct({ productId: id, product }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      alert(error.message);
    },
  })
}