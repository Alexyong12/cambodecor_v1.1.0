"use client";

import { useEffect, useState } from "react";
import { useThreads } from "../hooks/use-chat";
import { ThreadList } from "./thread-list";
import { ChatBox } from "./chat-box";
//import { useRouter } from "next/navigation";
//import { ChevronLeft } from "lucide-react";
import ChatHeader from "./navbar/chat-header";

/**
 * The chat experience, brand-context aware:
 *
 *   • Home chat (no brandSlug)     → inbox lists ALL brands
 *   • Brand page chat (brandSlug)  → inbox is that brand only, and its
 *     conversation opens immediately
 *
 * Layout:
 *   • Mobile: one pane at a time (inbox → tap → conversation → back)
 *   • md+:    two panes side by side (inbox left, conversation right)
 */
export function ChatScreen({ brandSlug,brandName,}: {brandSlug?: string;brandName?: string;}) {
  
  const { data: threads } = useThreads(brandSlug);
  const [activeThreadId, setActiveThreadId] = useState<string | undefined>();
  //const router =useRouter();
  // When scoped to a single brand, auto-open that one conversation.
  useEffect(() => {
    const first = threads?.[0];
    if (brandSlug && first && !activeThreadId) {
      setActiveThreadId(first.id);
    }
  }, [brandSlug, threads, activeThreadId]);

  // const title = brandName ? `Chat with ${brandName}` : "Messages";
  // const subtitle = brandName
  //   ? "Ask this seller about products, stock, and delivery."
  //   : "Your conversations with sellers on CamboDecor.";

  return (
    <div className="space-y-4">
      <ChatHeader brandName={brandName} />
      {/* <div>
        <div className="flex flex-row text-lg font-bold uppercase text-brand-navy md:text-xl">
          <button onClick={() => router.back()}>
            <ChevronLeft />
          </button> 
          <p>{title}</p>
        </div>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div> */}

      <div className="grid gap-4 md:grid-cols-[320px_1fr] md:items-start lg:grid-cols-[360px_1fr]">
        {/* Inbox — hidden on mobile once a conversation is open */}
        <div className={activeThreadId ? "hidden md:block" : "block"}>
          <ThreadList
            brandSlug={brandSlug}
            activeThreadId={activeThreadId}
            onSelect={setActiveThreadId}
          />
        </div>

        {/* Conversation */}
        <div className={activeThreadId ? "block" : "hidden md:block"}>
          {activeThreadId ? (
            <ChatBox
              threadId={activeThreadId}
            />
          ) : (
            <div className="flex h-[70vh] items-center justify-center rounded-lg border bg-card md:h-[75vh]">
              <p className="px-6 text-center text-sm text-muted-foreground">
                Select a conversation to start messaging.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
