"use client";

import React from "react";

const ModalAddProduct = ({
  isModalAddOpen,
  closeModal,
}: {
  isModalAddOpen: boolean;
  closeModal: () => void;
}) => {
  if (!isModalAddOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-1/3 rounded-md bg-white p-10">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-semibold">Add Product</h4>
          <button
            onClick={closeModal}
            className="rounded-md px-2 py-1 text-xl font-semibold text-red-500 hover:bg-slate-100"
          >
            x
          </button>
        </div>
        <div>
          <form>
            <div className="mt-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
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
                type="number"
                name="stock"
                id="stock"
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            <div>
              <button
                type="submit"
                className="mt-6 w-full rounded-md bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAddProduct;
