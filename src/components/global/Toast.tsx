import React from "react";
import { useEffect, useState } from "react";

import { FaRegCheckCircle } from "react-icons/fa";
import { BsExclamationCircle } from "react-icons/bs";

const Toast = ({
  isToastVisible,
  setIsToastVisible,
  type,
  message,
}: {
  isToastVisible: boolean;
  setIsToastVisible: (value: boolean) => void;
  type: "success" | "error";
  message: string;
}) => {
  const [isSlideOut, setIsSlideOut] = useState(false);
  useEffect(() => {
    if (isToastVisible) {
      setTimeout(() => {
        setIsSlideOut(true);
      }, 3000);

      setTimeout(() => {
        setIsToastVisible(false);
        setIsSlideOut(false);
      }, 3500);
    }
  }, [isToastVisible]);

  if (!isToastVisible) return null;

  return (
    <>
      <div
        className={`animate-slideIn fixed right-0 top-0 mx-8 my-8 flex min-w-[300px] items-center justify-start rounded-lg bg-white py-5 pl-8 pr-12 shadow-lg ${isSlideOut ? "animate-slideOut" : ""}`} // Menggunakan animasi Tailwind
      >
        <div className="flex items-center gap-4">
          {type === "success" ? (
            <FaRegCheckCircle className="text-3xl text-green-500" />
          ) : (
            <BsExclamationCircle className="text-3xl text-rose-500" />
          )}
          <div>
            <h4 className="text-md font-semibold">
              {type === "success" ? "Success" : "Failed"}
            </h4>
            <span className="text-sm text-slate-400">{message}</span>
          </div>
        </div>
      </div>
    </>

    //  <div className="absolute right-0 top-24 mx-12 my-8 flex min-w-[300px] items-center justify-start rounded-lg bg-white py-5 pl-8 pr-12 shadow-lg">
    //       <div className="flex items-center gap-4">
    //         <BsExclamationCircle className="text-3xl text-red-500" />
    //         <div>
    //           <h4 className="text-md font-semibold">Failed!</h4>
    //           <span className="text-sm text-slate-400">
    //             Data tidak dapat diupdate
    //           </span>
    //         </div>
    //       </div>
    //     </div>
  );
};

export default Toast;
