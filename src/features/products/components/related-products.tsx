"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "../hooks/use-products";
import { ProductCard } from "./product-card";

/**
 * "Related products" strip for the product detail page — other items in the
 * same category (and same sub-category first, if available), excluding the
 * product being viewed. Uses the single-page hook (a fixed-size strip, not a
 * full paginated grid) so the detail page stays light.
 */
export function RelatedProducts({
  currentId,
  categorySlug,
  subCategorySlug,
}: {
  currentId: string;
  categorySlug?: string;
  subCategorySlug?: string;
}) {
  const { data, isPending, isError } = useProducts({
    category: categorySlug,
    subCategory: subCategorySlug,
  });

  if (!categorySlug || isError) return null;

  if (isPending) {
    return (
      <section className="space-y-3">
        <h2 className="text-sm font-bold uppercase text-brand-navy md:text-base">
          Related products
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4]" />
          ))}
        </div>
      </section>
    );
  }

  // Drop the current product, cap the strip at 10.
  const related = data.items.filter((p) => p.id !== currentId).slice(0, 10);
  if (related.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-bold uppercase text-brand-navy md:text-base">
        Related products
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
