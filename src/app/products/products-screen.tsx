"use client";

import { useState } from "react";
import { ProductGrid, ProductToolbar, type SortValue } from "@/features/products";

/**
 * All-products listing (/products). Same building blocks as the category
 * screens — toolbar + grid — but unfiltered by category, so it browses the
 * whole catalog with search and sort.
 */
export function ProductsScreen() {
  const [sort, setSort] = useState<SortValue>("newest");
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-4 md:space-y-6">
      <h1 className="text-lg font-bold uppercase text-brand-navy md:text-xl">
        All products
      </h1>

      <ProductToolbar
        sort={sort}
        onSortChange={setSort}
        search={search}
        onSearchChange={setSearch}
      />

      <ProductGrid filters={{ sort, search: search || undefined }} />
    </div>
  );
}
