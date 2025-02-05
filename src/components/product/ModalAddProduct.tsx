"use client";

import React from "react";
import { useState } from "react";

// hooks
import { useAddProducts } from "~/hooks/useProducts";
import { ProductSchema } from "~/types/products";

// components
import Toast from "../global/Toast";

const ModalAddProduct = ({
  isModalAddOpen,
  closeModal,
}: {
  isModalAddOpen: boolean;
  closeModal: () => void;
}) => {
  const [product, setProduct] = React.useState({
    name: "",
    description: "",
    stock: 0,
  });
  const { mutate: addProductMutate } = useAddProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [errors, setError] = useState({});

  // handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newValue = name === "stock" ? parseInt(value) : value;

    setProduct({
      ...product,
      [name]: newValue,
    });
  };

  // handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validateData = ProductSchema.safeParse(product);

      if (!validateData.success) {
        const errorMessageString = validateData.error.errors;
        console.log(errorMessageString);
        setError(errorMessageString);
        return;
      }

      setIsSubmitting(true);

      addProductMutate(product);

      setIsSubmitting(false);

      closeModal();
      setProduct({
        name: "",
        description: "",
        stock: 0,
      });
    } catch (error) {
      console.error("error", error);
      alert(error instanceof Error ? error.message : "Error adding product");
    }
  };

  if (!isModalAddOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-1/3 rounded-md bg-white p-10">
        {/* {error && (
          <pre className="whitespace-pre-wrap text-red-500">{error}</pre>
        )} */}
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-semibold">Add Product</h4>
          <button
            onClick={closeModal}
            className="rounded-md px-2 py-1 text-xl font-semibold text-red-500 hover:bg-slate-100"
          >
            x
          </button>
        </div>

        {/* error massge */}
        {Array.isArray(errors) && errors.length > 0 && (
          <div className="mt-4 flex flex-col gap-1 rounded-md bg-red-100 p-4 px-4 py-2 text-red-500">
            {errors.map((e, index) => (
              <p className="text-sm" key={index}>
                {e.message}
              </p>
            ))}
          </div>
        )}

        <div>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                id="name"
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="description"
                id="description"
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700"
              >
                Stock
              </label>
              <input
                onChange={handleChange}
                type="number"
                name="stock"
                id="stock"
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            <div>
              <button
                type="submit"
                className="disabled mt-6 w-full rounded-md bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAddProduct;
