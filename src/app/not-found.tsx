import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Custom 404. Rendered for any unmatched route (and, in a static export,
 * for URLs that weren't pre-generated). Keeps the user one tap from the
 * catalog instead of a dead end.
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-20 text-center md:py-28">
      <p className="text-6xl font-black text-brand-orange md:text-7xl">404</p>
      <h1 className="mt-4 text-xl font-bold uppercase text-brand-navy md:text-2xl">
        Page not found
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
        Let&apos;s get you back to shopping.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/">
          <Button variant="brand" size="lg">
            <Home className="h-4 w-4" aria-hidden />
            Home
          </Button>
        </Link>
        <Link href="/products">
          <Button variant="outline" size="lg">
            <Search className="h-4 w-4" aria-hidden />
            Browse products
          </Button>
        </Link>
      </div>
    </div>
  );
}
