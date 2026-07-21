"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Cart is CLIENT state (the user's in-progress selection), so it lives in
 * Zustand, not TanStack Query. Persisted so a refresh doesn't empty the cart.
 * When checkout syncs with the server, that call belongs in a service +
 * mutation — this store stays the local source of truth for the UI.
 */
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity }] };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      setQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.productId !== productId)
              : state.items.map((i) =>
                  i.productId === productId ? { ...i, quantity } : i,
                ),
        })),

      clear: () => set({ items: [] }),
    }),
    { name: "cambodecor-cart" },
  ),
);

/** Derived selectors — subscribe narrowly to avoid needless re-renders. */
export const selectCartCount = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
