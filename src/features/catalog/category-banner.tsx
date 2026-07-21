//"use client";

import Image from "next/image";
import Link from "next/link";
import { useCategory } from "./hooks/use-categories";

/**
 * Banner resolved from categories.json — the single data source for page
 * banners across the app:
 *
 *   subCategory.bannerUrl  →  category.bannerUrl  →  render nothing
 *
 * Used by the product detail page (category banner) and reusable anywhere
 * a page needs "the banner of this category/sub-category". Changing a
 * banner is a data edit in categories.json — no code changes.
 */
export function CategoryBanner({
      slug,
      subSlug,
      linkToCategory = true,
}: {
      slug: string;
      subSlug?: string;
      linkToCategory?: boolean;
}) {
      const { data: category } = useCategory(slug);
      if (!category) return null;

      const sub = subSlug
            ? category.subCategories.find((s) => s.slug === subSlug)
            : undefined;
      const bannerUrl = sub?.bannerUrl ?? category.bannerUrl;
      if (!bannerUrl) return null;

      const banner = (
            <span className="relative block aspect-[8/3] w-full overflow-hidden rounded-lg md:aspect-[4/1]">
                  <Image
                        src={bannerUrl}
                        alt={`${sub?.name ?? category.name} promotion`}
                        fill
                        sizes="100vw"
                        className="object-cover"
                  />
            </span>
      );

      if (!linkToCategory) return banner;

      return (
            <Link
                  href={`/categories/${category.slug}`}
                  aria-label={`See all ${category.name}`}
                  className="block"
            >
                  {banner}
            </Link>
      );
}
