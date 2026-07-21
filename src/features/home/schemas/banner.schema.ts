import { z } from "zod";

/**
 * Promo banners shown in the home carousel.
 * Data source today: src/data/banner.json — later the /banners endpoint
 * (queryKeys.banners.all is already reserved for it).
 */
export const bannerSchema = z.object({
  id: z.string(),
  /** Local path (/images/banners/...) today; absolute CDN URL later. */
  imageUrl: z.string(),
  alt: z.string(),
  /** Where tapping the banner navigates (category, brand, promo page...). */
  href: z.string().optional(),
});

export const bannerListSchema = z.array(bannerSchema);

export type Banner = z.infer<typeof bannerSchema>;
