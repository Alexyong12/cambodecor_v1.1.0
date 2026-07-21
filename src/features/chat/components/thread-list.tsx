"use client";

import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { Skeleton } from "@/components/ui/skeleton";
import { useThreads } from "../hooks/use-chat";

/** Relative "time ago" for the thread preview (e.g. "7m", "2h", "3d"). */
function timeAgo(iso?: string): string {
  if (!iso) return "";
  const diff = Date.now() - Date.parse(iso);
  const min = Math.round(diff / 60_000);
  if (min < 1) return "now";
  if (min < 60) return `${min}m`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h`;
  return `${Math.round(hr / 24)}d`;
}

/**
 * The conversation inbox. On the Home chat it lists a thread for every brand;
 * on a brand page it's already scoped to that brand's single thread (the
 * `brandSlug` is passed straight through to the service via the hook).
 */
export function ThreadList({
  brandSlug,
  activeThreadId,
  onSelect,
}: {
  brandSlug?: string;
  activeThreadId?: string;
  onSelect: (threadId: string) => void;
}) {
  const { data: threads, isPending, isError } = useThreads(brandSlug);

  if (isPending) {
    return (
      <ul className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i}>
            <Skeleton className="h-16 w-full rounded-lg" />
          </li>
        ))}
      </ul>
    );
  }

  if (isError || !threads) {
    return (
      <p className="text-sm text-muted-foreground">Couldn&apos;t load conversations.</p>
    );
  }

  if (threads.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No conversations yet.</p>
    );
  }

  return (
    <ul className="space-y-1.5" aria-label="Conversations">
      {threads.map((thread) => {
        const active = thread.id === activeThreadId;
        return (
          <li key={thread.id}>
            <button
              type="button"
              onClick={() => onSelect(thread.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-accent",
                active ? "border-brand-orange bg-accent" : "bg-card",
              )}
            >
              {thread.avatarUrl ? (
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border bg-white">
                  <Image
                    src={thread.avatarUrl}
                    alt={thread.brandName}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </span>
              ) : (
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 bg-white text-[11px] font-bold"
                  style={{ borderColor: thread.color, color: thread.color }}
                >
                  {thread.brandName.slice(0, 3).toUpperCase()}
                </span>
              )}

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-sm font-semibold uppercase text-brand-navy">
                    {thread.brandName}
                  </span>
                  <span className="shrink-0 text-[10px] text-muted-foreground">
                    {timeAgo(thread.lastSentAt)}
                  </span>
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {thread.lastMessage}
                </p>
              </div>

              {thread.unread > 0 && (
                <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange px-1.5 text-[10px] font-bold text-white">
                  {thread.unread}
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
