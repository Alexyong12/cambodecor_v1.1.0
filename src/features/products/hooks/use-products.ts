"use client";

import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import { productService } from "../services/product.service";
import type { ProductFilters } from "../schemas/product.schema";

/**
 * Single-page product list. Kept for callers that only need page 1
 * (e.g. a fixed-size "related products" strip).
 */
export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: ({ signal }) => productService.getList(filters, signal),
    // Keep old page on screen while the next one loads — no layout jump.
    placeholderData: keepPreviousData,
  });
}

/**
 * Accumulating product list with "Load more". The service paginates at
 * PAGE_SIZE (20); this hook fetches page 1, then appends each next page so
 * every matching product is reachable — the grid was previously capped at
 * the first page because nothing advanced `page`.
 *
 * getNextPageParam returns undefined once we've loaded everything, which is
 * how the grid knows to hide the "Load more" button.
 */
export function useInfiniteProducts(filters: ProductFilters) {
  // `page` is owned by the infinite query, so strip any incoming page value.
  const { page: _ignored, ...baseFilters } = filters;

  return useInfiniteQuery({
    queryKey: queryKeys.products.infinite(baseFilters),
    queryFn: ({ pageParam, signal }) =>
      productService.getList({ ...baseFilters, page: pageParam }, signal),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const loaded = lastPage.page * lastPage.pageSize;
      return loaded < lastPage.total ? lastPage.page + 1 : undefined;
    },
    placeholderData: keepPreviousData,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: ({ signal }) => productService.getById(id, signal),
    enabled: Boolean(id),
  });
}
