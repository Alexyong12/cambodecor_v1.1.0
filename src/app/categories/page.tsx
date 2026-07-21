import type { Metadata } from "next";
import { CategoryGrid } from "@/features/catalog";
import { BrandStrip } from "@/features/brands";

export const metadata: Metadata = {
  title: "Categories",
  description: "All CamboDecor product categories and popular brands.",
};

/**
 * /categories — the full category directory. Each tile links to its
 * /categories/[slug] page (handled by CategoryGrid). Popular brands are
 * shown too so shoppers can jump straight into a brand's products/chat.
 */
export default function CategoriesPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      <section aria-labelledby="categories-heading" className="space-y-3">
        <h1
          id="categories-heading"
          className="text-lg font-bold uppercase text-brand-navy md:text-xl"
        >
          Categories
        </h1>
        <CategoryGrid />
      </section>

      <BrandStrip />
    </div>
  );
}
