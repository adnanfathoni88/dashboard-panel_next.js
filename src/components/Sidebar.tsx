import React from "react";
import { FiGrid } from "react-icons/fi";
import { MdOutlineCameraAlt } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="bg-dark-50 h-screen w-1/5 px-4 py-10 text-center text-white">
      <div>
        <h3 className="text-2xl font-semibold text-neutral-200">AdnanDev</h3>
      </div>
      <div className="flex flex-col gap-1 py-8">
        <button className="hover:bg-dark-100 text-md flex w-full items-center rounded-lg px-8 py-4 text-start text-white/75">
          <FiGrid className="mr-4 inline-block" />
          Dashboard
        </button>
        <button className="hover:bg-dark-100 text-md w-full rounded-lg px-8 py-4 text-start text-white/75">
          <MdOutlineCameraAlt className="mr-4 inline-block" />
          Products
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
