"use client";

import * as React from "react";

// Toast 类型定义
type ToastType = {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
};

// Toast 状态管理 Hook
export function useToast() {
  const [toasts, setToasts] = React.useState<ToastType[]>([]);

  // 添加 Toast
  const toast = React.useCallback(
    (props: Omit<ToastType, "id">) => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts((prev) => [...prev, { ...props, id }]);

      // 3秒后自动消失
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);

      return id;
    },
    []
  );

  // 移除 Toast
  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, toast, dismiss };
}

// 全局 Toast 上下文
const ToastContext = React.createContext<ReturnType<typeof useToast> | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toast = useToast();
  return (
    <ToastContext.Provider value={toast}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within ToastProvider");
  }
  return context;
}
