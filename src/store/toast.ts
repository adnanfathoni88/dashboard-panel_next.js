import { create } from "zustand";

type ToastState = {
  showToast(type: "success" | "error", message: string): void;
  isToastVisible: boolean;
  setIsToastVisible: (value: boolean) => void;
  type: "success" | "error";
  message: string;
};

export const useToastStore = create<ToastState>((set) => ({
  isToastVisible: false,
  setIsToastVisible: (value) => set({ isToastVisible: value }),
  message: "",
  showToast: (type, message) => {
    set({ type, message, isToastVisible: true });
    setTimeout(() => {
      set({ isToastVisible: false });
    }, 3500); // Auto hide after 3.5s
  },
  type: "success",
}));
