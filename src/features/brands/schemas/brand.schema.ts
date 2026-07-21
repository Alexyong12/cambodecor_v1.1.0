import { z } from "zod";

export const brandSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  /** Brand accent color for the placeholder circle until real logos exist. */
  color: z.string(),
  /** Real logo (/images/brands/...). Falls back to the initials circle. */
  imageUrl: z.string().optional(),
});

export const brandListSchema = z.array(brandSchema);
export type Brand = z.infer<typeof brandSchema>;
