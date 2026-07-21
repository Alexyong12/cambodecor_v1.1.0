/**
 * Banner service — STATIC MODE.
 *
 * Data source: src/data/banner.json (no backend yet). Even static JSON
 * passes through Zod so a typo in the data file fails loudly here,
 * never as a blank carousel.
 *
 * TO SWITCH TO THE REAL API later, replace the body with:
 *   const data = await apiClient.get<unknown>("/banners");
 *   return bannerListSchema.parse(data);
 */
import bannersJson from "@/data/branner.json";
import { bannerListSchema, type Banner } from "../schemas/banner.schema";

export const bannerService = {
  getAll(): Banner[] {
    return bannerListSchema.parse(bannersJson);
  },
};
