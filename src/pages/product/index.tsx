"use client";

import React from "react";
import { useState } from "react";
import Layout from "~/components/Layout";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

// hooks
import { useProducts } from "~/hooks/useProducts";
import ModalAddProduct from "~/components/product/ModalAddProduct";

const Product = () => {
  const {
    data: products,
    isLoading: isProductsLoading,
    error: isProductsError,
  } = useProducts();
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  // is loading
  if (isProductsLoading) {
    return (
      <Layout>
        <div className="h-screen pt-10">
          <h1 className="text-3xl font-semibold">Loading...</h1>
        </div>
      </Layout>
    );
  }

  // is error
  if (isProductsError instanceof Error)
    return <p className="text-red-500">{isProductsError.message}</p>;

  // open modal
  const openModal = () => {
    setIsModalAddOpen(true);
  };

  // close modal
  const closeModal = () => {
    setIsModalAddOpen(false);
  };

  return (
    <>
      <Layout>
        <ModalAddProduct
          isModalAddOpen={isModalAddOpen}
          closeModal={closeModal}
        />
        <div className="h-screen pt-10">
          <div className="flex items-center justify-between">
            <h1 className="py-8 text-3xl font-semibold">Product</h1>
            <button
              onClick={openModal}
              className="rounded bg-blue-600 px-8 py-2 font-bold text-white hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="rounded-md bg-white p-8 shadow-sm">
            <table className="mt-6 w-full rounded-xl">
              <thead>
                <tr className="bg-gray-100 hover:bg-gray-100">
                  <th className="border-b border-gray-300 px-2 py-4 text-center">
                    No
                  </th>
                  <th className="border-b border-gray-300 px-2 py-4 text-start">
                    Name
                  </th>
                  <th className="border-b border-gray-300 px-2 py-4 text-start">
                    Stock
                  </th>
                  <th className="border-b border-gray-300 px-2 py-4 text-start">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border-b border-gray-300 px-2 py-4 text-center">
                      {index + 1}
                    </td>
                    <td className="border-b border-gray-300 px-2 py-4">
                      {product.name}
                    </td>
                    <td className="border-b border-gray-300 px-2 py-4">
                      {product.stock}
                    </td>
                    <td className="flex gap-2 border-b border-gray-300 px-2 py-4">
                      <button className="hover:bg-slate-2010 rounded px-4 py-2 font-bold text-slate-800 hover:bg-slate-200">
                        <LuPencil />
                      </button>
                      <button className="hover:bg-slate-2010 rounded px-4 py-2 font-bold text-slate-800 hover:bg-slate-200">
                        <FaRegTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Product;
