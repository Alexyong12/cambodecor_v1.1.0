"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, MessageCircle } from "lucide-react";
import { brandService } from "@/features/brands";
import { ProductGrid, ProductToolbar, type SortValue } from "@/features/products";
import { Button } from "@/components/ui/button";

/**
 * Brand detail screen. Tapping a brand anywhere in the app lands here:
 *   1. ‹ back + brand identity (logo/initials, name)
 *   2. "Chat with this brand" → /chat?brand=<slug>  (brand-scoped chat)
 *   3. SORT ⇅ + search
 *   4. PRODUCT grid filtered to this brand's products
 *
 * Products reference their brand by NAME, and productService filters on that
 * case-insensitively — so we pass the brand's display name as the filter.
 */
export function BrandScreen({ slug }: { slug: string }) {
  const brand = brandService.getBySlugs([slug])[0];
  const [sort, setSort] = useState<SortValue>("newest");
  const [search, setSearch] = useState("");

  if (!brand) {
    return (
      <p className="text-sm text-muted-foreground">
        This brand doesn&apos;t exist.{" "}
        <Link href="/categories" className="underline">
          Back to categories
        </Link>
      </p>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* 1. Back + brand identity */}
      <div className="flex items-center gap-3">
        <Link
          href="/categories"
          aria-label="Back"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </Link>

        {brand.imageUrl ? (
          <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border bg-white">
            <Image
              src={brand.imageUrl}
              alt={brand.name}
              fill
              sizes="48px"
              className="object-cover"
            />
          </span>
        ) : (
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-white text-xs font-bold"
            style={{ borderColor: brand.color, color: brand.color }}
          >
            {brand.name.slice(0, 4).toUpperCase()}
          </span>
        )}

        <h1 className="text-lg font-bold uppercase text-brand-navy md:text-xl">
          {brand.name}
        </h1>
      </div>

      {/* 2. Chat with this brand (brand-context chat) */}
      <Link href={`/chat?brand=${brand.slug}`} className="inline-block">
        <Button variant="outline" size="sm" className="gap-2">
          <MessageCircle className="h-4 w-4" aria-hidden />
          Chat with {brand.name}
        </Button>
      </Link>

      {/* 3. SORT + search */}
      <ProductToolbar
        sort={sort}
        onSortChange={setSort}
        search={search}
        onSearchChange={setSearch}
      />

      {/* 4. Products for this brand */}
      <section aria-label="Products" className="space-y-3">
        <h2 className="text-sm font-bold uppercase text-brand-navy md:text-base">
          Products by {brand.name}
        </h2>
        <ProductGrid
          filters={{ brand: brand.name, sort, search: search || undefined }}
        />
      </section>
    </div>
  );
}
