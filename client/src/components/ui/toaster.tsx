import React from "react";
import { Toast, ToastProvider } from "@radix-ui/react-toast";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            {title && <div className="font-semibold">{title}</div>}
            {description && <div className="mt-1">{description}</div>}
            {action}
          </Toast>
        );
      })}
    </ToastProvider>
  );
}