"use client";

import { ArrowDownUp } from "lucide-react";
import { Input } from "@/components/ui/input";

export type SortValue = "newest" | "price_asc" | "price_desc" | "popular";

/**
 * The "SORT ⇅ [ search ]" row that appears above every PRODUCT grid in the
 * design. Controlled component: state lives in the screen that owns filters.
 */
export function ProductToolbar({
  // sort,
  // onSortChange,
  search,
  onSearchChange,
}: {
  sort: SortValue;
  onSortChange: (value: SortValue) => void;
  search: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <label className="flex shrink-0 items-center gap-1.5 text-sm font-semibold uppercase">
        Sort
        <ArrowDownUp className="h-4 w-4" aria-hidden />
        {/* <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortValue)}
          aria-label="Sort products"
          className="rounded-md border border-input bg-background px-2 py-1.5 text-sm font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="newest">Newest</option>
          <option value="popular">Popular</option>
          <option value="price_asc">Price: low → high</option>
          <option value="price_desc">Price: high → low</option>
        </select> */}
      </label>
      <Input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search in this list..."
        aria-label="Search products in this list"
        className="h-9"
      />
    </div>
  );
}
