"use client";

import React, { use } from "react";
import { useState, useEffect } from "react";
import Layout from "~/components/Layout";
import { LuEye, LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

// hooks
import { useProducts, useDeleteProduct } from "~/hooks/useProducts";
import ModalAddProduct from "~/components/product/ModalAddProduct";
import ModalEditProduct from "~/components/product/ModalEditProduct";
import ModalDeleteProduct from "~/components/product/ModalDeleteProduct";
import ModalViewProduct from "~/components/product/ModalViewProduct";
import ModalFormProduct from "~/components/product/ModalFormProduct";
import { set } from "zod";
import NotificationToast from "~/components/global/NotificationToast";

const Product = () => {
  const {
    data: products,
    isLoading: isProductsLoading,
    error: isProductsError,
  } = useProducts();

  // modal
  const [isModalForm, setIsModalForm] = useState('');
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");

  // notif
  const [notifDanger, setNotifDanger] = useState(false);
  const [notifEdit, setNotifEdit] = useState(false);
  const [notif, setNotif] = useState('');

  // bulk delete
  const [selectedBulkDelete, setSelectedBulkDelete] = useState<string[]>([]);

  // mutate 
  const { mutate: deleteProduct } = useDeleteProduct();

  // close modal
  const closeModal = () => {
    setIsModalForm('');
    setIsModalEditOpen(false);
    setIsModalDeleteOpen(false);
    setIsModalViewOpen(false);
    setSelectedProductId('');
  };

  // modal form
  const handleModalForm = (type: string, productId?: string) => {
    setSelectedProductId(productId || '');
    setIsModalForm(type);
  };

  // modal delete
  const handleModalDelete = (productId: string) => {
    setIsModalDeleteOpen(true);
    setSelectedProductId(productId);
  };

  // modal view
  const handleModalView = (productId: string) => {
    setIsModalViewOpen(true);
    setSelectedProductId(productId);
  };

  // handleBulkInput
  const handleBulkInput = (productId: string) => {
    setSelectedBulkDelete((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // handleBulkSelected
  const handleBulkSelected = (productIds: string[]) => {

    setIsModalDeleteOpen(true);


    // try {
    //   productIds.forEach(async (productId) => {
    //     const isFound = products?.find((product) => product.id === productId);
    //     if (isFound) {

    //       try {
    //         await deleteProduct(productId);
    //         setNotifDanger(true);
    //       } catch (error) {
    //         console.error("Failed to delete product:", error);
    //         alert("Failed to delete product. Please try again.");
    //         setNotifDanger(false);
    //       }
    //     } else {
    //       console.error("Product not found:", productId);
    //     }
    //     if (!isFound) {
    //       throw new Error("Product not found");
    //     }
    //   });
    // }
    // catch (error) {
    //   console.error(error);
    //   return;
    // }
    // finally {
    //   setSelectedBulkDelete([]); // Clear the selected IDs after deletion
    // }
  };

  // console.log(notifDanger, 'notif delete');
  console.log(notif, 'notif form');


  useEffect(() => {
    if (notifDanger || notif === 'add' || notif === 'edit') {
      const timer = setTimeout(() => {
        setNotifDanger(false); // reset supaya bisa muncul lagi nanti
        setNotif(''); // reset supaya bisa muncul lagi nanti
      }, 3000); // bisa lebih tinggi tergantung durasi animasi toast

      return () => clearTimeout(timer);
    }
  }, [notifDanger, notif]);



  // is error
  if (isProductsError instanceof Error)
    return <p className="text-red-500">{isProductsError.message}</p>;


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

  return (
    <>
      <Layout>

        {/* modal form */}
        <ModalFormProduct
          isModalForm={isModalForm}
          closeModal={closeModal}
          produkId={selectedProductId}
          setNotif={setNotif}
        />

        <ModalDeleteProduct
          isModalDeleteOpen={isModalDeleteOpen}
          closeModal={closeModal}
          productId={selectedProductId}
          setNotifDanger={setNotifDanger}
          selectedBulkDelete={selectedBulkDelete}
          setSelectedBulkDelete={setSelectedBulkDelete}

        />

        <ModalViewProduct
          isModalViewOpen={isModalViewOpen}
          closeModal={closeModal}
          productId={selectedProductId}
        />

        {/* notif delete */}
        {notifDanger && (
          <NotificationToast
            type="error"
            message="Product deleted successfully!"
          />
        )}

        {/* notif tambah */}
        {notif === 'add' && (
          <NotificationToast
            type="success"
            message="Product added successfully!"
          />
        )}

        {notif === 'edit' && (
          <NotificationToast
            type="success"
            message="Product edited successfully!"
          />
        )}


        <div className="h-screen pt-10">
          <div className="flex items-center justify-between pb-8">
            <h1 className="text-3xl font-semibold">Product</h1>

            <button onClick={() => handleModalForm('add')} className="rounded bg-blue-600 px-8 py-2 font-bold text-white hover:bg-blue-700">
              Add
            </button>

          </div>
          <div className="rounded-md bg-white px-6 py-3 pb-6 shadow-sm">

            {/* bulk action */}
            {selectedBulkDelete.length > 0 && (
              <div className="mt-2">
                <button
                  onClick={() => handleBulkSelected(selectedBulkDelete)}
                  className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  Delete Selected ({selectedBulkDelete.length})
                </button>

              </div>
            )}

            <table className="mt-6 w-full rounded-xl">
              <thead>
                <tr className="bg-gray-100 hover:bg-gray-100">
                  <th className="border-b border-gray-300 px-1 py-4 text-center">
                    <input
                      onChange={() => {
                        if (selectedBulkDelete.length === products?.length) {
                          setSelectedBulkDelete([]);
                        } else {
                          setSelectedBulkDelete(products?.map((product: { id: string; }) => product.id));
                        }
                      }}
                      checked={selectedBulkDelete.length === products?.length}
                      type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </th>
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

                    {/* bulk delete */}
                    <td className="border-b border-gray-300 px-1 py-4 text-center">
                      <input
                        onChange={() => handleBulkInput(String(product.id))}
                        checked={selectedBulkDelete.includes(String(product.id))}
                        type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    </td>

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

                      {/* view eye */}
                      <button onClick={() => handleModalView(String(product.id))} className="hover:bg-slate-2010 rounded px-4 py-2 font-bold text-slate-800 hover:bg-slate-200">
                        <LuEye size={18} />
                      </button>
                      <button onClick={() => handleModalForm("edit", String(product.id))} className="hover:bg-slate-2010 rounded px-4 py-2 font-bold text-slate-800 hover:bg-slate-200">
                        <LuPencil />
                      </button>
                      <button onClick={() => handleModalDelete(String(product.id))} className="hover:bg-slate-2010 rounded px-4 py-2 font-bold text-slate-800 hover:bg-slate-200">
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
