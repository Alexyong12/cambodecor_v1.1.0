"use client";

import Image from "next/image";
import { useProduct, RelatedProducts } from "@/features/products";

import { useCartStore } from "@/features/cart";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
// eslint-disable-next-line no-restricted-imports
import {CategoryBanner} from "@/features/catalog/category-banner";

/**
 * Product detail. Mobile: image stacked above info.
 * md+: two-column — image left (sticky), info right.
 */
export function ProductScreen({ id }: { id: string }) {
  const { data: product, isPending, isError } = useProduct(id);
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();
  if (isPending) {
    return (
      <div className="grid gap-4 md:grid-cols-2 md:gap-8">
        <Skeleton className="aspect-square w-full" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-11 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return <p className="text-sm text-muted-foreground">Product not found.</p>;
  }

  return (
    <div className="space-y-8 md:space-y-12">
      <article className="grid gap-4 md:grid-cols-2 md:items-start md:gap-8 lg:gap-12">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <span className="text-sm font-bold uppercase text-brand-navy">
          {product.shopName ?? "Product"}
        </span>
      </div>
      {/* Category banner — same banner as the product's category page,
            resolved from categories.json (sub banner → category banner). */}
      {product.categorySlug && (
        <CategoryBanner
          slug={product.categorySlug}
          subSlug={product.subCategorySlug}
        />
      )}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white md:sticky md:top-24">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
            priority
          />
        )}
      </div>

      <div className="space-y-4">
        {product.shopName && (
          <p className="text-xs uppercase text-muted-foreground">{product.shopName}</p>
        )}
        <h1 className="text-xl font-semibold uppercase lg:text-2xl">{product.name}</h1>
        <p className="text-2xl font-bold text-red-600 lg:text-3xl">
          $ {product.price.toFixed(2)}
        </p>

        <Button
          variant="brand"
          size="lg"
          className="w-full md:max-w-sm"
          onClick={() =>
            addItem({
              productId: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
            })
          }
        >
          Add to cart
        </Button>

      </div>
      </article>

      {/* Related products — other items in the same category */}
      <RelatedProducts
        currentId={product.id}
        categorySlug={product.categorySlug}
        subCategorySlug={product.subCategorySlug}
      />
    </div>
  );
}
