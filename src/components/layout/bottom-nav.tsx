"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { CartButton } from "@/features/cart";

const LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/chat", label: "Chat", icon: MessageCircle },
] as const;

/**
 * Mobile bottom navigation (base + sm). Hidden from md: up, where the
 * header's inline nav takes over — one nav per breakpoint, never both.
 */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-background md:hidden"
    >
      <div className="container flex h-14 items-center justify-around">
        {LINKS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-label={label}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-accent",
              pathname === href && "text-brand-orange",
            )}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </Link>
        ))}
        <CartButton />
        <Link
          href="/profile"
          aria-label="Profile"
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-accent",
            pathname === "/profile" && "text-brand-orange",
          )}
        >
          <User className="h-5 w-5" aria-hidden />
        </Link>
      </div>
    </nav>
  );
}
