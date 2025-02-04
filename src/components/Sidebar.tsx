import React from "react";
import { FiGrid } from "react-icons/fi";
import { MdOutlineCameraAlt } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="h-screen w-72 bg-dark-50 px-4 py-10 text-center text-white">
      <div>
        <h3 className="px-8 text-start text-2xl font-semibold text-neutral-200">
          AdnanDev
        </h3>
      </div>
      <div className="flex flex-col gap-1 py-8">
        <button className="text-md flex w-full items-center rounded-lg px-8 py-4 text-start text-white/75 hover:bg-dark-100">
          <FiGrid className="mr-4 inline-block" />
          Dashboard
        </button>
        <button className="text-md w-full rounded-lg px-8 py-4 text-start text-white/75 hover:bg-dark-100">
          <MdOutlineCameraAlt className="mr-4 inline-block" />
          Product
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
