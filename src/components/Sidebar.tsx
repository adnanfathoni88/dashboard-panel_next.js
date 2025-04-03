import React, { useState } from "react";
import { FiGrid } from "react-icons/fi";
import { MdOutlineCameraAlt } from "react-icons/md";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", icon: <FiGrid className="mr-4" />, label: "Dashboard" },
    { id: "product", icon: <MdOutlineCameraAlt className="mr-4" />, label: "Product" },
  ];

  return (
    <div className="h-screen  w-72 bg-dark-50 px-4 py-10 text-center text-white">
      <div>
        <h3 className="px-8 text-start text-2xl font-semibold text-neutral-200">
          Kapita Rental
        </h3>
      </div>
      <div className="flex flex-col gap-1 py-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`text-md flex w-full items-center rounded-lg px-8 py-4 text-start transition ${activeMenu === item.id ? "bg-blue-800/25 text-white" : "text-white/75 hover:bg-dark-100"
              }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
