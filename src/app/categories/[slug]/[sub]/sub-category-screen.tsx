"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useCategory } from "@/features/catalog";
import { ProductGrid, ProductToolbar, type SortValue } from "@/features/products";
import { brandService } from "@/features/brands";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryIcon } from "@/components/ui/category-icon";

/**
 * Sub Category #2 screen — follows the PDF layout exactly:
 *   1. ‹ back + screen title (e.g. "TABLEWARE", "METAL PAINT & SPRAY")
 *   2. header banner image
 *   3. filter chips: ALL + level-2 children (Plate/Spoon/Forks...) OR
 *      brand chips for paint screens (ALL/Nippon Paint/TOA/Dulux...)
 *   4. SORT ⇅ + search row
 *   5. PRODUCT grid
 */
export function SubCategoryScreen({
  categorySlug,
  subSlug,
}: {
  categorySlug: string;
  subSlug: string;
}) {
  const { data: category, isPending, isError } = useCategory(categorySlug);
  const [type, setType] = useState<string | undefined>(undefined);
  const [brand, setBrand] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<SortValue>("newest");
  const [search, setSearch] = useState("");

  if (isPending) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const subCategory = category?.subCategories.find((s) => s.slug === subSlug);

  if (isError || !category || !subCategory) {
    return (
      <p className="text-sm text-muted-foreground">
        This section doesn&apos;t exist.{" "}
        <Link href={`/categories/${categorySlug}`} className="underline">
          Back to {categorySlug}
        </Link>
      </p>
    );
  }

  const brandChips = brandService.getBySlugs(subCategory.brands);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* 1. Back + title (design: "‹ TABLEWARE") */}
      <div className="flex items-center gap-1">
        <Link
          href={`/categories/${categorySlug}`}
          aria-label={`Back to ${category.name}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </Link>
        <h1 className="text-lg font-bold uppercase text-brand-navy md:text-xl">
          {subCategory.name}
        </h1>
      </div>

      {/* 2. Header banner */}
      {subCategory.bannerUrl && (
        <div className="relative aspect-[8/3] w-full overflow-hidden rounded-lg md:aspect-[4/1]">
          <Image
            src={subCategory.bannerUrl}
            alt={`${subCategory.name} banner`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* 3a. Level-2 chips: ALL / Plate / Spoon / ... */}
      {subCategory.children.length > 0 && (
        <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={type === undefined ? "default" : "outline"}
            onClick={() => setType(undefined)}
            className="gap-1.5"
          >
            <CategoryIcon name={subCategory.icon} className="h-3.5 w-3.5" />
            All
          </Button>
          {subCategory.children.map((child) => (
            <Button
              key={child.id}
              size="sm"
              variant={type === child.slug ? "default" : "outline"}
              onClick={() => setType(type === child.slug ? undefined : child.slug)}
              className="gap-1.5"
            >
              <CategoryIcon name={child.icon} className="h-3.5 w-3.5" />
              {child.name}
            </Button>
          ))}
        </div>
      )}

      {/* 3b. Brand chips for paint screens: ALL / Nippon Paint / TOA / ... */}
      {brandChips.length > 0 && (
        <div role="group" aria-label="Filter by brand" className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={brand === undefined ? "default" : "outline"}
            onClick={() => setBrand(undefined)}
          >
            All
          </Button>
          {brandChips.map((b) => (
            <Button
              key={b.id}
              size="sm"
              variant={brand === b.name ? "default" : "outline"}
              onClick={() => setBrand(brand === b.name ? undefined : b.name)}
              style={brand === b.name ? undefined : { color: b.color, borderColor: b.color }}
            >
              {b.name}
            </Button>
          ))}
        </div>
      )}

      {/* 4. SORT + search */}
      <ProductToolbar
        sort={sort}
        onSortChange={setSort}
        search={search}
        onSearchChange={setSearch}
      />

      {/* 5. PRODUCT grid */}
      <section aria-label="Products" className="space-y-3">
        <h2 className="text-sm font-bold uppercase text-brand-navy md:text-base">
          Product
        </h2>
        <ProductGrid
          filters={{
            category: categorySlug,
            subCategory: subSlug,
            type,
            brand,
            sort,
            search: search || undefined,
          }}
        />
      </section>
    </div>
  );
}
