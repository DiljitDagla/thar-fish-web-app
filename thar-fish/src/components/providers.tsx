"use client";

import { AuthProvider } from "@/lib/auth";
import { CartProvider } from "@/lib/cart";
import { ToastProvider } from "@/components/ui/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>{children}</ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}
