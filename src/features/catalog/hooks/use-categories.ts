"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import { categoryService } from "../services/category.service";

/** All main categories (Furniture, Tools, Bathroom, Kitchen, ...). */
export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: ({ signal }) => categoryService.getAll(signal),
    staleTime: 5 * 60 * 1000, // categories change rarely; don't refetch on every mount
  });
}

/** One category + its sub-categories, for the Main/Sub Category screens. */
export function useCategory(slug: string) {
  return useQuery({
    queryKey: queryKeys.categories.detail(slug),
    queryFn: ({ signal }) => categoryService.getBySlug(slug, signal),
    enabled: Boolean(slug),
  });
}
