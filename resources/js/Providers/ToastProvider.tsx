import { Toaster } from "@/Components/ui/sonner";
import {
    Ban,
    CircleAlert,
    CircleCheckBig,
    Info,
    LoaderCircle,
} from "lucide-react";
import React from "react";
const toastOptions = {
    classNames: {
        title: "text-sm font-bold text-white",
        description: "text-xs text-white",
        icon: "text-white mr-2",
        success: "bg-teal-500 ",
        error: "bg-red-500",
        warning: "bg-yellow-500",
        info: "bg-blue-600",
    },
};
const icon = {
    success: <CircleCheckBig className="size-6" />,
    info: <Info className="size-6" />,
    warning: <CircleAlert className="size-6" />,
    error: <Ban className="size-6" />,
    loading: <LoaderCircle className="size-6" />,
};
const ToastProvider = () => {
    return (
        <Toaster
            position="top-right"
            toastOptions={toastOptions}
            icons={icon}
        />
    );
};

export default ToastProvider;
