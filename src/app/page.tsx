import { HomeStyleSection, NewStoreSection, BannerCarousel } from "@/features/home";
import { CategoryGrid } from "@/features/catalog";
import { BrandStrip } from "@/features/brands";
/**
 * Home Page — section order follows the design file exactly:
 *   1. Promo banner ("Up to 30% OFF")
 *   2. CATEGORIES icon grid (18 categories)
 *   3. HOME STYLE room tiles
 *   4. POPULAR BRANDS partner strip
 *   5. NEW STORE partner promo tiles
 */
export default function HomePage() {
      return (
            <div className="space-y-6 md:space-y-8">
                  <BannerCarousel />
                  <section aria-labelledby="categories-heading" className="space-y-3">
                        <h2
                              id="categories-heading"
                              className="text-sm font-bold uppercase text-brand-navy md:text-base"
                        >
                              Categories
                        </h2>
                        <CategoryGrid />
                  </section>
                  <HomeStyleSection />
                  <BrandStrip />
                  <NewStoreSection />
            </div>
      );
}
