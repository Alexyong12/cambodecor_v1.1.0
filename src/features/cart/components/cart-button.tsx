"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { selectCartCount, useCartStore } from "../store/cart.store";

/** Bottom-nav cart icon with a live badge. */
export function CartButton() {
  const count = useCartStore(selectCartCount);

  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-accent"
    >
      <ShoppingCart className="h-5 w-5" aria-hidden />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-orange px-1 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
