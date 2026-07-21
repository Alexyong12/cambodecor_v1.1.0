/**
 * Category service — STATIC MODE.
 *
 * Data source: src/data/categories.json (no backend yet).
 * The public API (getAll / getBySlug) is identical to the future API
 * version, so hooks and components will not change when the backend ships.
 *
 * TO SWITCH TO THE REAL API later, replace the bodies with:
 *   const data = await apiClient.get<unknown>("/categories", { signal });
 *   return categoryListSchema.parse(data);
 * (apiClient lives in @/lib/api/client — already built and typed.)
 */
import categoriesJson from "@/data/categories.json";
import {
  categoryListSchema,
  type Category,
} from "../schemas/category.schema";

/** Tiny artificial delay so loading skeletons stay testable. */
const simulateLatency = () => new Promise((resolve) => setTimeout(resolve, 200));

export const categoryService = {
  async getAll(_signal?: AbortSignal): Promise<Category[]> {
    await simulateLatency();
    // Validate even static JSON: a typo in the file fails loudly here,
    // not as a blank screen somewhere in the UI.
    return categoryListSchema.parse(categoriesJson);
  },

  async getBySlug(slug: string, _signal?: AbortSignal): Promise<Category> {
    await simulateLatency();
    const categories = categoryListSchema.parse(categoriesJson);
    const category = categories.find((c) => c.slug === slug);
    if (!category) {
      throw new Error(`Category not found: ${slug}`);
    }
    return category;
  },
};
