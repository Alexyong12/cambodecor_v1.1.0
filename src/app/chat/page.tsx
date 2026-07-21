"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChatScreen } from "@/features/chat";
import { brandService } from "@/features/brands";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Chat page — brand context comes from the URL:
 *
 *   /chat              → Home chat: conversations with ALL brands
 *   /chat?brand=cotto  → scoped to one brand (linked from that brand's page)
 *
 * Reading the query string is a client-only concern, and in a static export
 * search params resolve after hydration — hence the Suspense boundary Next
 * requires around useSearchParams().
 */
function ChatPageInner() {
  const searchParams = useSearchParams();
  const brandSlug = searchParams.get("brand") ?? undefined;

  // Resolve a friendly brand name for the header, if the slug is valid.
  const brand = brandSlug
    ? brandService.getBySlugs([brandSlug])[0]
    : undefined;

  return <ChatScreen brandSlug={brand?.slug} brandName={brand?.name} />;
}

export default function ChatPage() {
  return (
    <Suspense fallback={<ChatPageSkeleton />}>
      <ChatPageInner />
    </Suspense>
  );
}

function ChatPageSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-7 w-40" />
      <div className="grid gap-4 md:grid-cols-[320px_1fr]">
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
        <Skeleton className="hidden h-[75vh] w-full rounded-lg md:block" />
      </div>
    </div>
  );
}
