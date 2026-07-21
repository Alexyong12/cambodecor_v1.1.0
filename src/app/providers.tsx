"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
/**
 * Client-side providers. Kept out of layout.tsx so the root layout
 * stays a Server Component.
 */
export function Providers({ children }: { children: ReactNode }) {
  // useState ensures one QueryClient per browser session,
  // and a fresh one per request during SSR (no cross-user cache leaks).
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
