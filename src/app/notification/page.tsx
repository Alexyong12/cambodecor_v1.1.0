"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BadgePercent, Bell, MessageCircle, Package, Truck } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * Notifications screen (client-side UI). Seeded list with read/unread state
 * held locally; a real app would hydrate these from a notifications endpoint
 * and mark-as-read via a mutation. Each row links to the relevant screen.
 */
type Notification = {
  id: string;
  kind: "order" | "promo" | "chat" | "delivery";
  title: string;
  body: string;
  href: string;
  minutesAgo: number;
  read: boolean;
};

const SEED: Notification[] = [
  {
    id: "n1",
    kind: "promo",
    title: "Paint week — 25% off",
    body: "Jotun, Dulux, TOA and Nippon Paint on sale this week only.",
    href: "/categories/paint-construction",
    minutesAgo: 12,
    read: false,
  },
  {
    id: "n2",
    kind: "chat",
    title: "New message from COTTO",
    body: "Yes, that item is in stock — want delivery?",
    href: "/chat?brand=cotto",
    minutesAgo: 40,
    read: false,
  },
  {
    id: "n3",
    kind: "order",
    title: "Order confirmed",
    body: "Your recent order has been confirmed by the seller.",
    href: "/products",
    minutesAgo: 180,
    read: true,
  },
  {
    id: "n4",
    kind: "delivery",
    title: "Out for delivery",
    body: "Your Fabric Sofa 3 Seats is on the way today.",
    href: "/products",
    minutesAgo: 300,
    read: true,
  },
  {
    id: "n5",
    kind: "promo",
    title: "Up to 30% off office chairs",
    body: "Comfort you deserve — limited-time furniture deals.",
    href: "/categories/furniture-home-decor",
    minutesAgo: 1440,
    read: true,
  },
];

const ICONS = {
  order: Package,
  promo: BadgePercent,
  chat: MessageCircle,
  delivery: Truck,
} as const;

function timeAgo(min: number): string {
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  return `${Math.round(hr / 24)}d ago`;
}

export default function NotificationPage() {
  const [items, setItems] = useState<Notification[]>(SEED);
  const unread = useMemo(() => items.filter((n) => !n.read).length, [items]);

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 text-lg font-bold uppercase text-brand-navy md:text-xl">
          <Bell className="h-5 w-5" aria-hidden />
          Notifications
          {unread > 0 && (
            <span className="rounded-full bg-brand-orange px-2 py-0.5 text-[11px] font-bold text-white">
              {unread} new
            </span>
          )}
        </h1>
        {unread > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className="text-xs font-semibold text-brand-orange underline"
          >
            Mark all read
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {items.map((item) => {
          const Icon = ICONS[item.kind];
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={() => markRead(item.id)}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-accent",
                  item.read ? "bg-card" : "border-brand-orange/40 bg-accent/60",
                )}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-brand-navy">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-sm font-semibold">{item.title}</p>
                    <span className="shrink-0 text-[10px] text-muted-foreground">
                      {timeAgo(item.minutesAgo)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.body}</p>
                </div>
                {!item.read && (
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-orange"
                    aria-label="Unread"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
