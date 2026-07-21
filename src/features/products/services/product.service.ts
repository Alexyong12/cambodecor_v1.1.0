/**
 * Product service — STATIC MODE.
 *
 * Data source: src/data/products.json (no backend yet).
 * Filtering, search, sort, and pagination run in-memory so the UI behaves
 * exactly like it will against the real API.
 *
 * TO SWITCH TO THE REAL API later, replace the bodies with:
 *   const data = await apiClient.get<unknown>("/products", { params, signal });
 *   return productListSchema.parse(data);
 */
import productsJson from "@/data/products.json";
import {
  productFiltersSchema,
  productSchema,
  type Product,
  type ProductFilters,
  type ProductList,
} from "../schemas/product.schema";
import { z } from "zod";

const allProductsSchema = z.array(productSchema);
const PAGE_SIZE = 20;

const simulateLatency = () => new Promise((resolve) => setTimeout(resolve, 200));

export const productService = {
  async getList(filters: ProductFilters, _signal?: AbortSignal): Promise<ProductList> {
    await simulateLatency();
    const parsed = productFiltersSchema.parse(filters);
    let items = allProductsSchema.parse(productsJson);

    if (parsed.category) {
      items = items.filter((p) => p.categorySlug === parsed.category);
    }
    if (parsed.subCategory) {
      items = items.filter((p) => p.subCategorySlug === parsed.subCategory);
    }
    if (parsed.type) {
      items = items.filter((p) => p.typeSlug === parsed.type);
    }
    if (parsed.brand) {
      items = items.filter(
        (p) => p.brand?.toLowerCase() === parsed.brand?.toLowerCase(),
      );
    }
    if (parsed.search) {
      const q = parsed.search.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q));
    }

    switch (parsed.sort) {
      case "price_asc":
        items = [...items].sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        items = [...items].sort((a, b) => b.price - a.price);
        break;
      case "popular":
        items = [...items].sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
        break;
      default:
        break; // "newest": keep JSON order
    }

    const start = (parsed.page - 1) * PAGE_SIZE;
    return {
      items: items.slice(start, start + PAGE_SIZE),
      page: parsed.page,
      pageSize: PAGE_SIZE,
      total: items.length,
    };
  },

  async getById(id: string, _signal?: AbortSignal): Promise<Product> {
    await simulateLatency();
    const items = allProductsSchema.parse(productsJson);
    const product = items.find((p) => p.id === id);
    if (!product) {
      throw new Error(`Product not found: ${id}`);
    }
    return product;
  },
};
