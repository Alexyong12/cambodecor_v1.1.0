"use client";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useMessages, useSendMessage, useThread } from "../hooks/use-chat";
import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";
import { useRouter } from "next/navigation";
/**
 * A single conversation: brand header, message history, composer.
 * Self-contained — give it a threadId and it fetches everything it needs.
 * `onBack` is optional so it works both as a full page and inside a
 * two-pane desktop layout.
 */
export function ChatBox({threadId,}: {threadId: string;}) {
  
  const { data: thread, isPending: threadPending } = useThread(threadId);
  const { data: messages, isPending: messagesPending } = useMessages(threadId);
  const { mutate: send } = useSendMessage(threadId);
  const router = useRouter();

  return (
    <div className="flex h-[90vh] flex-col overflow-hidden rounded-lg border bg-card md:h-[75vh]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b bg-background p-3">
          <button
            type="button"
            onClick={(() => router.back())}
            aria-label="Back to conversations"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent md:hidden"
           >
             <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
        
        {threadPending || !thread ? (
          <>
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </>
        ) : (
          <>
            {thread.avatarUrl ? (
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border bg-white">
                <Image
                  src={thread.avatarUrl}
                  alt={thread.brandName}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </span>
            ) : (
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 bg-white text-[10px] font-bold"
                style={{ borderColor: thread.color, color: thread.color }}
              >
                {thread.brandName.slice(0, 3).toUpperCase()}
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold uppercase text-brand-navy">
                {thread.brandName}
              </p>
              <p className="text-[11px] text-muted-foreground">Seller · usually replies fast</p>
            </div>
          </>
        )}
      </div>

      {/* Messages */}
      {messagesPending ? (
        <div className="flex-1 space-y-3 p-4">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="ml-auto h-10 w-1/2" />
          <Skeleton className="h-10 w-3/5" />
        </div>
      ) : (
        <MessageList messages={messages ?? []} />
      )}

      {/* Composer */}
      <ChatInput onSend={(text) => send(text)} disabled={threadPending} />
    </div>
  );
}
