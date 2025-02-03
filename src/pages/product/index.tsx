import React from "react";
import Layout from "~/components/Layout";

const tes = () => {
  return (
    <>
      <Layout>
        <div className="h-screen py-20">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Products</h1>
            <button className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700">
              Add
            </button>
          </div>
          <div>
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
                    Price
                  </th>
                  <th className="border-b border-gray-300 px-2 py-4 text-start">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="border-b border-gray-300 px-2 py-4 text-center">
                    1
                  </td>
                  <td className="border-b border-gray-300 px-2 py-4">
                    Product 1
                  </td>
                  <td className="border-b border-gray-300 px-2 py-4">
                    Rp. 100.000
                  </td>
                  <td className="flex gap-2 border-b border-gray-300 px-2 py-4">
                    <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                      Edit
                    </button>
                    <button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default tes;
