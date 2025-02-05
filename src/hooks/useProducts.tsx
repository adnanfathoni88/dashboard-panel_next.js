import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, addProduct } from "~/api/products";

// get products
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

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
