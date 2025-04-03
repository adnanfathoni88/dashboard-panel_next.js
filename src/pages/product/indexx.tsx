"use client";

import React from "react";
import { ReactDOM } from "react";
import { useState } from "react";
import Layout from "~/components/Layout";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

// hooks
import { useProducts } from "~/hooks/useProducts";
import ModalAddProduct from "~/components/product/ModalAddProduct";
import ModalEditProduct from "~/components/product/ModalEditProduct";

// table
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const columns = [

  columnHelper.accessor('id', {
    cell: (info) => info.row.index + 1,
    footer: 'Total',
  }),

  columnHelper.accessor('name', {
    header: 'Name',
  }),

  columnHelper.accessor('stock', {
    header: 'Stock',
  }),
];


const Product = () => {
  const {
    data: products,
    isLoading: isProductsLoading,
    error: isProductsError,
  } = useProducts();
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");

  // table
  const [sorting, setSorting] = useState([]);


  const table = useReactTable({
    data: products || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting, // Tambahkan state sorting
    },
    onSortingChange: setSorting, // Atur sorting berdasarkan perubahan
  });

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

  const closeModal = () => {
    // setIsModalAddOpen(false);
    setIsModalEditOpen(false);
  };

  // modal edit
  const handleModalEdit = (productId: string) => {
    setIsModalEditOpen(true);
    setSelectedProductId(productId);
  };

  return (
    <>
      <Layout>

        <ModalEditProduct
          isModalEditOpen={isModalEditOpen}
          closeModal={closeModal}
          produkId={selectedProductId}
        />

        <div className="h-screen pt-10">
          <div className="flex items-center justify-between pb-8">
            <h1 className="text-3xl font-semibold">Product</h1>
          </div>

          <div className="rounded-md bg-white p-8 shadow-sm">
            <table className="mt-6 w-full rounded-xl">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-gray-100 hover:bg-gray-100">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()} // ✅ Tambahkan handler sorting
                        className="border-b border-gray-300 px-2 py-4 text-center">

                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === "asc" ? " 🔼" : header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-100">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="border-b border-gray-300 px-2 py-4 text-center">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


      </Layout>
    </>
  )

};

export default Product;
