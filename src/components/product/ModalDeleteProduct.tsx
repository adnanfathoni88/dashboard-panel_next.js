"use client"

import React from "react";
import { useState } from "react";
import { useDeleteProduct, useProductById, useProducts } from "~/hooks/useProducts";

const ModalDeleteProduct = ({
    isModalDeleteOpen,
    closeModal,
    productId,
    setNotifDanger,
    selectedBulkDelete,
    setSelectedBulkDelete,
}: {
    isModalDeleteOpen: boolean;
    closeModal: () => void;
    productId: string;
    setNotifDanger: (value: boolean) => void;
    selectedBulkDelete?: string[];
    setSelectedBulkDelete: (value: string[]) => void;
}) => {
    const {
        data: products,
        isLoading: isProductsLoading,
        error: isProductsError,
    } = useProducts();
    const { data: productById, isLoading } = useProductById(productId);
    const { mutate: deleteProduct } = useDeleteProduct();

    // handle single delete
    const handleDeleteProduct = (productId: string) => {
        try {
            deleteProduct(productId);
            closeModal();
            setNotifDanger(true);
        } catch (error) {
            console.error("Failed to delete product:", error);
            alert("Failed to delete product. Please try again.");
            setNotifDanger(false);
        }
    };

    // handle bulk delete
    const handleBulkDelete = () => {
        try {
            (selectedBulkDelete ?? []).forEach(async (productId) => {
                const isFound = products?.find((product: { id: string; }) => product.id === productId);
                if (isFound) {

                    try {
                        await deleteProduct(productId);
                        setNotifDanger(true);
                    } catch (error) {
                        console.error("Failed to delete product:", error);
                        alert("Failed to delete product. Please try again.");
                        setNotifDanger(false);
                    }
                } else {
                    console.error("Product not found:", productId);
                }
                if (!isFound) {
                    throw new Error("Product not found");
                }
            });
        }
        catch (error) {
            console.error(error);
            return;
        }
        finally {
            setSelectedBulkDelete([]); // Clear the selected IDs after deletion
        }
    }


    if (!isModalDeleteOpen) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                <div className="w-1/3 rounded-md bg-white p-8">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xl font-semibold">Do you really want to delete {productById?.name} ?</h4>
                        {/* <button
                            onClick={closeModal}
                            className="rounded-md px-2 py-1 text-xl font-semibold text-red-500 hover:bg-slate-100"
                        >
                            x
                        </button> */}
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">This action cannot be undone.</p>
                        <div className="flex gap-2">
                            <button
                                onClick=
                                {() => {
                                    if (selectedBulkDelete && selectedBulkDelete.length > 0) {
                                        handleBulkDelete();
                                    } else {
                                        handleDeleteProduct(productId);
                                    }
                                    closeModal();
                                }}
                                className="mt-4 rounded-md bg-red-500 px-6 py-2 text-white hover:bg-red-600"
                            >Yes</button>
                            <button
                                onClick={closeModal}
                                className="mt-4 rounded-md bg-gray-700 px-6 py-2 text-white hover:bg-gray-900"
                            >No</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
};

export default ModalDeleteProduct;