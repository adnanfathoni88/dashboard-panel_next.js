import React, { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface NotificationToastProps {
    type?: "success" | "error" | "info";
    message: string;
    duration?: number; // dalam ms
}

const icons = {
    success: <CheckCircle className="text-green-500 w-5 h-5" />,
    error: <AlertCircle className="text-red-500 w-5 h-5" />,
    info: <Info className="text-blue-500 w-5 h-5" />,
};

const NotificationToast = ({
    type = "success",
    message,
    duration = 3000,
}: NotificationToastProps) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShow(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if (!show) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className={clsx(
                "fixed bottom-10 right-10 z-50 flex items-center gap-3 rounded-xl p-6 shadow-md transition-all duration-300",
                {
                    "bg-green-100 text-green-700": type === "success",
                    "bg-red-100 text-red-700": type === "error",
                    "bg-blue-100 text-blue-700": type === "info",
                }
            )}
        >
            {icons[type]}
            <span className="text-md font-medium">{message}</span>
        </motion.div>
    );
};

export default NotificationToast;
