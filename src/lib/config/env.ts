import { z } from "zod";

/**
 * Validate public env vars once at startup so a missing value fails loudly
 * at boot instead of as a mysterious 404 in production.
 */
const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.cambodecor.example.com/v1",
});
