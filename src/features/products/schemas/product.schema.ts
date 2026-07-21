import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().nonnegative(),
  currency: z.literal("USD").default("USD"),
  /** Local path (/images/products/...) today; absolute CDN URL later. */
  imageUrl: z.string().optional(),
  shopName: z.string().optional(), // e.g. "BODA SHOP", "CHHOUK VA SHOP"
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().optional(),
  categorySlug: z.string().optional(),
  subCategorySlug: z.string().optional(),
  /** Level-2 type within a sub-category (e.g. tableware → "plate"). */
  typeSlug: z.string().optional(),
  brand: z.string().optional(), // Jotun, Nippon Paint, TOA, Dulux ...
});

export const productListSchema = z.object({
  items: z.array(productSchema),
  page: z.number().int(),
  pageSize: z.number().int(),
  total: z.number().int(),
});

export type Product = z.infer<typeof productSchema>;
export type ProductList = z.infer<typeof productListSchema>;

/** Filters accepted by the product list endpoint (Sub Category screens). */
export const productFiltersSchema = z.object({
  category: z.string().optional(),
  subCategory: z.string().optional(),
  brand: z.string().optional(),
  type: z.string().optional(),
  search: z.string().optional(),
  sort: z.enum(["newest", "price_asc", "price_desc", "popular"]).optional(),
  page: z.number().int().positive().default(1),
});

export type ProductFilters = z.input<typeof productFiltersSchema>;
