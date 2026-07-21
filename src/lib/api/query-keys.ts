/**
 * Central query-key factory. One source of truth prevents typo'd keys and
 * makes cache invalidation greppable:
 *   queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
 */
export const queryKeys = {
  categories: {
    all: ["categories"] as const,
    detail: (slug: string) => ["categories", slug] as const,
  },
  products: {
    all: ["products"] as const,
    list: (filters: Record<string, unknown>) => ["products", "list", filters] as const,
    infinite: (filters: Record<string, unknown>) =>
      ["products", "infinite", filters] as const,
    detail: (id: string) => ["products", "detail", id] as const,
  },
  banners: {
    all: ["banners"] as const,
  },
  chat: {
    /** Thread list; scoped by brand on brand pages, all brands on Home. */
    threads: (brandSlug?: string) => ["chat", "threads", brandSlug ?? "all"] as const,
    thread: (threadId: string) => ["chat", "thread", threadId] as const,
    messages: (threadId: string) => ["chat", "messages", threadId] as const,
  },
} as const;