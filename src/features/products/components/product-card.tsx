import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "../schemas/product.schema";

/**
 * Product tile used in every grid (matches the design's card:
 * shop name, image, title, red price).
 * Server-renderable: no hooks, data comes in as props.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="block">
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardContent className="flex h-full flex-col gap-2 p-3">
          <div className="relative aspect-square w-full overflow-hidden rounded-md bg-white">
            {product.imageUrl && (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 240px"
                className="object-contain"
              />
            )}
          </div>
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span className="uppercase">{product.shopName}</span>
            {product.rating !== undefined && (
              <span className="flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden />
                {product.rating.toFixed(1)}
                {product.reviewCount !== undefined && ` (${product.reviewCount})`}
              </span>
            )}
          </div>
          <h3 className="line-clamp-2 text-sm font-medium uppercase">{product.name}</h3>
          <p className="mt-auto font-semibold text-red-600">
            $ {product.price.toFixed(2)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
