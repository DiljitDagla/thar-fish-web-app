"use client";

import * as React from "react";
import { CartItem, FishProduct } from "./types";

const STORAGE_KEY = "tharfish_cart";

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  add: (product: FishProduct, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
}

const CartContext = React.createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const persist = (next: CartItem[]) => {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const add = React.useCallback(
    (product: FishProduct, qty = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.product.id === product.id);
        const next = existing
          ? prev.map((i) =>
              i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
            )
          : [...prev, { product, qty }];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const remove = React.useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.product.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const setQty = React.useCallback((id: string, qty: number) => {
    setItems((prev) => {
      const next = prev
        .map((i) => (i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clear = React.useCallback(() => persist([]), []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.product.price, 0);

  return (
    <CartContext.Provider
      value={{ items, count, total, add, remove, setQty, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
