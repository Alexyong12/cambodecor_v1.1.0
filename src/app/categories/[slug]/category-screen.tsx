"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCategory } from "@/features/catalog";
import { ProductGrid, ProductToolbar, type SortValue } from "@/features/products";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryIcon } from "@/components/ui/category-icon";
/**
 * Sub Category #1 screen — follows the PDF layout exactly:
 *   1. sub-category icon buttons (grid, like the Kitchen screen)
 *   2. promo banner
 *   3. SORT ⇅ + search row
 *   4. PRODUCT grid
 * Tapping a sub-category icon navigates DEEPER to /categories/[slug]/[sub]
 * (Sub Category #2), exactly like the app flow in the file.
 */
export function CategoryScreen({ slug }: { slug: string }) {
  const { data: category, isPending, isError } = useCategory(slug);
  const [sort, setSort] = useState<SortValue>("newest");
  const [search, setSearch] = useState("");

  if (isPending) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError || !category) {
    return (
      <p className="text-sm text-muted-foreground">
        This category doesn&apos;t exist. Head back to the home page.
      </p>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <h1 className="text-lg font-bold uppercase text-brand-navy md:text-xl">
        {category.name}
      </h1>

      {/* 1. Sub-category icon grid (design: bordered icon buttons) */}
      {category.subCategories.length > 0 && (
        <nav aria-label="Sub-categories">
          <ul className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 md:gap-3 lg:grid-cols-8">
            {category.subCategories.map((sub) => (
              <li key={sub.id}>
                <Link
                  href={`/categories/${slug}/${sub.slug}`}
                  className="flex h-full flex-col items-center gap-1.5 rounded-lg border bg-card p-2.5 text-center transition-colors hover:border-brand-orange hover:bg-accent"
                >
                  <CategoryIcon name={sub.icon} className="h-6 w-6 text-brand-navy" />
                  <span className="text-[9px] font-semibold uppercase leading-tight md:text-[10px]">
                    {sub.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* 2. Category promo banner */}
      {category.bannerUrl && (
        <div className="relative aspect-[8/3] w-full overflow-hidden rounded-lg md:aspect-[4/1]">
          <Image
            src={category.bannerUrl}
            alt={`${category.name} promotion`}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* 3. SORT + search */}
      <ProductToolbar
        sort={sort}
        onSortChange={setSort}
        search={search}
        onSearchChange={setSearch}
      /> 

      {/* 4. PRODUCT grid */}
      <section aria-label="Products" className="space-y-3">
        <h2 className="text-sm font-bold uppercase text-brand-navy md:text-base">
          Product
        </h2>
        <ProductGrid filters={{ category: slug, sort, search: search || undefined }} />
      </section>
    </div>
  );
}
