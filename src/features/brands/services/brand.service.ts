/**
 * Brand service — STATIC MODE (src/data/brands.json).
 * Swap to apiClient.get("/brands") when the backend ships.
 */
import brandsJson from "@/data/brands.json";
import { brandListSchema, type Brand } from "../schemas/brand.schema";

export const brandService = {
  getAll(): Brand[] {
    return brandListSchema.parse(brandsJson);
  },

  getBySlugs(slugs: string[]): Brand[] {
    const all = brandService.getAll();
    return slugs
      .map((slug) => all.find((b) => b.slug === slug))
      .filter((b): b is Brand => Boolean(b));
  },
};
