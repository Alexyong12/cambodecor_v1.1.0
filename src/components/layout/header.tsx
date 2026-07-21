import Link from "next/link";
import { Bell, Search, SlidersHorizontal, UserRound } from "lucide-react";
import { Input } from "@/components/ui/input";
/**
 * App header. Mobile-first:
 * - base: brand + bell, search on its own row (thumb-reachable)
 * - lg:   single row — brand, inline nav (replaces the bottom tab bar),
 *         centered search, bell
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:gap-6">
        <div className="flex items-center justify-between lg:justify-start lg:gap-8">
          <div className="text-sm font-semibold lg:text-base flex flex-row items-center">
            <Link href={'/'} className={"sm:block md:block lg:block hidden"}>
              Cambo<span className="text-brand-orange">Decor</span>
            </Link>
            <div className={"sm:hidden md:hidden lg:hidden flex flex-row"}>
              <div className={"w-10 h-10 border rounded-full object-cover bg-amber-100 flex justify-center items-center"}>
                <UserRound size={30} fontSize={20} className={"object-cover text-white"} />
              </div>
              <h1 className={"mx-2 mt-5 font-extralight"}>Hello</h1>
            </div>
          </div>
          {/* Desktop nav: bottom tab bar is hidden from md up */}
          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-sm hover:text-brand-orange">
              Home
            </Link>
            <Link href="/products" className="text-sm hover:text-brand-orange">
              Products
            </Link>
            <Link href="/categories" className="text-sm hover:text-brand-orange">
              Categories
            </Link>
            <Link href="/chat" className="text-sm hover:text-brand-orange">
              Chat
            </Link>
            <Link href="/cart" className="text-sm hover:text-brand-orange">
              Cart
            </Link>
            <Link href="/profile" className="text-sm hover:text-brand-orange">
              Profile
            </Link>
          </nav>

          <Link
            href="/notification"
            aria-label="Notifications"
            className="inline-flex h-9 w-9 border border-gray-950 items-center justify-center rounded-full hover:bg-accent lg:hidden"
          >
            <Bell className="h-5 w-5" aria-hidden />
          </Link>
        </div>

        <div className="relative lg:ml-auto lg:w-80 xl:w-96">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <div className={"flex flex-row"}>
            <Input
              placeholder="Search here..."
              className="pl-9"
              aria-label="Search products"
            />
            <div className={"lg:hidden flex border h-10 w-10 rounded-lg justify-center items-center"}>
              <SlidersHorizontal />
            </div>
          </div>
        </div>

        <Link
          href="/notification"
          aria-label="Notifications"
          className="hidden h-9 w-9 items-center justify-center rounded-full hover:bg-accent lg:inline-flex"
        >
          <Bell className="h-5 w-5" aria-hidden />
        </Link>
      </div>
    </header>
  );
}
