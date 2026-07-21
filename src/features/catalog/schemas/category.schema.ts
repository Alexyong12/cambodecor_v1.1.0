import { z } from "zod";

/**
 * Runtime validation at the data boundary. Today the data is static JSON;
 * later it will be an API response — either way it MUST pass this schema
 * before entering the app, so swapping the source can't break the UI.
 *
 * Hierarchy mirrors the design: Category → SubCategory (#1) → child types (#2),
 * plus optional brand filters (the paint screens filter by brand instead).
 */
export const subCategoryChildSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  icon: z.string().optional(),
});

export const subCategorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  nameKm: z.string().optional(), // Khmer label
  /** lucide-react icon name (see icon-map). */
  icon: z.string().optional(),
  /** Header banner shown on the Sub Category #2 screen. */
  bannerUrl: z.string().optional(),
  /** Level-2 filter chips (e.g. Tableware → Plate, Spoon, Forks...). */
  children: z.array(subCategoryChildSchema).default([]),
  /** Brand-slug filter chips (e.g. Paint → Nippon, Jotun, Dulux...). */
  brands: z.array(z.string()).default([]),
});

export const categorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  nameKm: z.string().optional(),
  icon: z.string().optional(),
  /** Local path (/images/...) or absolute URL once a CDN exists. */
  imageUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
  subCategories: z.array(subCategorySchema).default([]),
});

export const categoryListSchema = z.array(categorySchema);

export type Category = z.infer<typeof categorySchema>;
export type SubCategory = z.infer<typeof subCategorySchema>;
export type SubCategoryChild = z.infer<typeof subCategoryChildSchema>;
