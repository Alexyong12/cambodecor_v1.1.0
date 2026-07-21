"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { selectCartTotal, useCartStore } from "@/features/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Checkout (client-side). Reads the Zustand cart, collects shipping details,
 * and on submit "places" the order locally (clears the cart, shows a
 * confirmation). The real order POST would live in a service + mutation;
 * this screen already has the shape for it.
 */
export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore(selectCartTotal);
  const clear = useCartStore((state) => state.clear);

  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });

  const update =
    (field: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: event.target.value }));

  function placeOrder(event: FormEvent) {
    event.preventDefault();
    // In a real app: await orderService.create({ items, ...form })
    clear();
    setPlaced(true);
  }

  if (placed) {
    return (
      <div className="py-16 text-center md:py-24">
        <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" aria-hidden />
        <h1 className="mt-4 text-xl font-bold uppercase text-brand-navy">
          Order placed
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Thanks{form.name ? `, ${form.name}` : ""}! A seller will contact you to
          confirm delivery.
        </p>
        <Link href="/" className="mt-6 inline-block">
          <Button variant="brand" size="lg">
            Continue shopping
          </Button>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-16 text-center md:py-24">
        <h1 className="text-lg font-semibold md:text-xl">Nothing to check out</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your cart is empty.
        </p>
        <Link href="/products" className="mt-6 inline-block">
          <Button variant="brand">Browse products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold uppercase text-brand-navy md:text-xl">
        Checkout
      </h1>

      <form
        onSubmit={placeOrder}
        className="grid gap-4 lg:grid-cols-[1fr_340px] lg:items-start lg:gap-8"
      >
        {/* Shipping details */}
        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-4 p-5">
              <h2 className="text-base font-semibold">Shipping details</h2>

              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm font-medium">
                  Full name
                </label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="e.g. Sok Dara"
                  required
                  className="mr-0"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="e.g. 012 345 678"
                  required
                  className="mr-0"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="address" className="text-sm font-medium">
                  Delivery address
                </label>
                <Input
                  id="address"
                  value={form.address}
                  onChange={update("address")}
                  placeholder="Street, sangkat, khan, city"
                  required
                  className="mr-0"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="note" className="text-sm font-medium">
                  Note (optional)
                </label>
                <Input
                  id="note"
                  value={form.note}
                  onChange={update("note")}
                  placeholder="Delivery instructions..."
                  className="mr-0"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order summary */}
        <aside className="rounded-lg border bg-background p-5 lg:sticky lg:top-24">
          <h2 className="mb-4 text-base font-semibold">Order summary</h2>

          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.productId}
                className="flex justify-between gap-3 text-sm"
              >
                <span className="min-w-0 truncate text-muted-foreground">
                  {item.name}{" "}
                  <span className="whitespace-nowrap">× {item.quantity}</span>
                </span>
                <span className="shrink-0 font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between border-t pt-4">
            <span className="text-sm">Total</span>
            <span className="text-lg font-bold text-red-600">
              ${total.toFixed(2)}
            </span>
          </div>

          <Button type="submit" variant="brand" size="lg" className="mt-5 w-full">
            Place order
          </Button>
          <Link
            href="/cart"
            className="mt-2 block text-center text-xs text-muted-foreground underline"
          >
            Back to cart
          </Link>
        </aside>
      </form>
    </div>
  );
}
