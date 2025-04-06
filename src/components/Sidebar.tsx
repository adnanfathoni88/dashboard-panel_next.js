import Link from "next/link";
import React, { useState } from "react";
import { FiGrid } from "react-icons/fi";
import { MdOutlineCameraAlt } from "react-icons/md";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const menuItems = [
    { id: "category", icon: <FiGrid size={18} className="mr-4" />, label: "Category", link: "/category" },
    { id: "product", icon: <MdOutlineCameraAlt size={18} className="mr-4" />, label: "Product", link: "/product" },
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
          <Link
            key={item.id}
            href={item.link}
            className={`flex items-center rounded-md px-6 py-4 text-sm font-semibold hover:bg-dark-100 ${activeMenu === item.id ? "bg-dark-100" : ""}`}
            onClick={() => setActiveMenu(item.id)}
          >
            {item.icon}
            <span className="text-start font-normal text-lg opacity-75">{item.label}</span>
          </Link>

        ))}
      </div>
    </div>
  );
};

export default Sidebar;
