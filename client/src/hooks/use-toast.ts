import { useState } from "react";

type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (props: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((currentToasts) => [...currentToasts, { ...props, id }]);
  };

  return {
    toasts,
    toast,
  };
}
