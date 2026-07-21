"use client";

import Link from "next/link";
import {
  Bell,
  ChevronRight,
  Heart,
  LogOut,
  MapPin,
  MessageCircle,
  Package,
  Settings,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { selectCartCount, useCartStore } from "@/features/cart";

/**
 * Profile / account screen (client-side UI). Static demo account with links
 * into the app's real pages (orders, cart, chat, notifications). Auth would
 * populate the header block and gate the actions later.
 */
const MENU = [
  { href: "/products", label: "My orders", icon: Package, hint: "Track & reorder" },
  { href: "/cart", label: "My cart", icon: ShoppingBag, hint: "Items you saved" },
  { href: "/products", label: "Wishlist", icon: Heart, hint: "Saved products" },
  { href: "/chat", label: "Messages", icon: MessageCircle, hint: "Chats with sellers" },
  { href: "/notification", label: "Notifications", icon: Bell, hint: "Offers & updates" },
  { href: "/profile", label: "Addresses", icon: MapPin, hint: "Delivery locations" },
  { href: "/profile", label: "Settings", icon: Settings, hint: "Account & privacy" },
] as const;

export default function ProfilePage() {
  const cartCount = useCartStore(selectCartCount);

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-bold uppercase text-brand-navy md:text-xl">
        Profile
      </h1>

      {/* Account header */}
      <Card>
        <CardContent className="flex items-center gap-4 p-5">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-brand-navy">
            <UserRound className="h-8 w-8" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="truncate text-base font-semibold">Guest User</p>
            <p className="truncate text-sm text-muted-foreground">
              Sign in to sync orders across devices
            </p>
            <Link
              href="/profile"
              className="mt-1 inline-block text-xs font-semibold text-brand-orange underline"
            >
              Sign in / Register
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Orders", value: 0 },
          { label: "In cart", value: cartCount },
          { label: "Wishlist", value: 0 },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <p className="text-xl font-bold text-brand-navy">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Menu */}
      <nav aria-label="Account menu">
        <ul className="divide-y overflow-hidden rounded-lg border bg-card">
          {MENU.map(({ href, label, icon: Icon, hint }) => (
            <li key={label}>
              <Link
                href={href}
                className="flex items-center gap-3 p-4 transition-colors hover:bg-accent"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-brand-navy">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-medium">{label}</span>
                  <span className="block text-xs text-muted-foreground">{hint}</span>
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
      >
        <LogOut className="h-4 w-4" aria-hidden />
        Sign out
      </button>
    </div>
  );
}
