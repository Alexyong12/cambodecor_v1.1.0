"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";
import type { ChatMessage } from "../schemas/chat.schema";

/** Short, locale-friendly time label (e.g. "2:45 PM"). */
function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Scrollable list of chat bubbles. User messages sit right (brand orange),
 * seller messages left (muted). Auto-scrolls to the newest message.
 */
export function MessageList({ messages }: { messages: ChatMessage[] }) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <p className="text-sm text-muted-foreground">
          No messages yet. Say hello to start the conversation.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-2 overflow-y-auto p-4">
      {messages.map((message) => {
        const mine = message.author === "user";
        return (
          <div
            key={message.id}
            className={cn("flex", mine ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-3.5 py-2 text-sm md:max-w-[70%]",
                mine
                  ? "rounded-br-sm bg-brand-orange text-white"
                  : "rounded-bl-sm bg-muted text-foreground",
              )}
            >
              <p className="whitespace-pre-wrap break-words">{message.text}</p>
              <time
                dateTime={message.sentAt}
                className={cn(
                  "mt-1 block text-[10px]",
                  mine ? "text-white/70" : "text-muted-foreground",
                )}
              >
                {formatTime(message.sentAt)}
              </time>
            </div>
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
}
