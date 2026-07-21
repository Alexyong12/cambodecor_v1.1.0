"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { selectCartTotal, useCartStore } from "@/features/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Cart screen (Zustand-backed, no server round-trips yet).
 * Mobile: single column, total pinned under the list.
 * lg+: items left, sticky order summary right.
 */
export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const total = useCartStore(selectCartTotal);

  if (items.length === 0) {
    return (
      <div className="py-16 text-center md:py-24">
        <h1 className="text-lg font-semibold md:text-xl">Your cart is empty</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse the categories on the home page to add products.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <h1 className="text-lg font-bold uppercase text-brand-navy md:text-xl">Cart</h1>
      <div className="w-full grid gap-4 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-8">
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.productId}>
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-3 sm:gap-4">

                    {/* Image */}
                    <div className="relative h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                      {item.imageUrl && (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-contain"
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between">

                      {/* Name + Price */}
                      <div>
                        <h2 className="truncate text-sm font-semibold uppercase lg:text-base">
                          {item.name}
                        </h2>

                        <p className="mt-1 text-base font-bold text-red-600">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Bottom */}
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">

                        {/* Quantity */}
                        <div className="flex items-center rounded-md border">

                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              setQuantity(item.productId, item.quantity - 1)
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>

                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>

                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              setQuantity(item.productId, item.quantity + 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>

                        </div>

                        {/* Remove */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.productId)}
                        >
                          <Trash2 className="mr-1 h-4 w-4" />
                          Remove
                        </Button>

                      </div>

                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>

        <aside className="rounded-lg border bg-background p-5 lg:sticky lg:top-24 h-fit">
          <h2 className="mb-4 text-lg font-semibold">
            Order Summary
          </h2>

          <div className="flex justify-between text-sm">
            <span>Total</span>
            <span className="text-lg font-bold">
              ${total.toFixed(2)}
            </span>
          </div>

          <Link href="/checkout" className="mt-6 block">
            <Button className="w-full" variant="brand" size="lg">
              Checkout
            </Button>
          </Link>
        </aside>
      </div>
    </div>
  );
}
