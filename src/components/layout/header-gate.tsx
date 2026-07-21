"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { Header } from "./header";
import { isImmersiveRoute } from "./header-visibility";

/**
 * Wraps the global Header with route awareness.
 *
 * - Immersive routes (Sub Category #2, product detail): header is HIDDEN on
 *   mobile — the screen's own "‹ back + title" bar takes over, matching the
 *   design file. From md: the header stays, because it carries the primary
 *   nav on desktop (the bottom tab bar is gone there).
 * - Everywhere else: header renders normally at all widths.
 *
 * Kept as a thin client wrapper so layout.tsx stays a Server Component.
 */
export function HeaderGate() {
      // usePathname can momentarily be null on the first client render, and
      // (with trailingSlash: true) may include a trailing "/". Coalesce to a
      // string; the regexes in isImmersiveRoute already tolerate the slash.
      const pathname = usePathname() ?? "";
      const immersive = isImmersiveRoute(pathname);
      return (
            <div className={cn(immersive && "hidden md:block")}>
                  <Header />
            </div>
      );
}
