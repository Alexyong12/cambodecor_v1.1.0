"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useInfiniteProducts } from "../hooks/use-products";
import type { ProductFilters } from "../schemas/product.schema";
import { ProductCard } from "./product-card";

/**
 * Responsive product grid with "Load more".
 *
 * The service paginates at 20 items; this grid accumulates every loaded page
 * (via useInfiniteProducts) and shows a "Load more" button until the whole
 * result set is on screen. Previously it rendered only page 1, so any
 * category/brand with more than 20 matches hid the rest.
 */
export function ProductGrid({ filters }: { filters: ProductFilters }) {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts(filters);

  if (isPending) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 2xl:grid-cols-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[3/4]" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="text-sm text-muted-foreground">Couldn&apos;t load products.</p>;
  }

  // Flatten all fetched pages into a single list of products.
  const items = data.pages.flatMap((page) => page.items);
  const total = data.pages[0]?.total ?? items.length;

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No products match these filters yet. Try clearing a filter.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 2xl:grid-cols-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-muted-foreground">
          Showing {items.length} of {total}
        </p>
        {hasNextPage && (
          <Button
            variant="outline"
            size="lg"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="min-w-40"
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </Button>
        )}
      </div>
    </div>
  );
}
