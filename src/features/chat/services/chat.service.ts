/**
 * Chat service — STATIC MODE.
 *
 * Threads are derived from brands.json: one conversation per brand/seller.
 * This is the single place the "which brands does chat show?" rule lives:
 *
 *   • Home chat            → getThreads()            → ALL brands
 *   • Brand A's chat page  → getThreads("brand-a")   → just brand A
 *
 * Messages are seeded per-thread so the UI has something to render. When a
 * real WebSocket / SaaS backend lands, replace the bodies here (e.g. open a
 * socket in a transport module and stream into chatMessageListSchema.parse);
 * the hooks and components below do not change.
 */
import brandsJson from "@/data/brands.json";
import { brandListSchema } from "../../brands/schemas/brand.schema";

import {
  chatMessageListSchema,
  chatThreadListSchema,
  type ChatMessage,
  type ChatThread,
} from "../schemas/chat.schema";

const simulateLatency = () => new Promise((resolve) => setTimeout(resolve, 200));

/** Build one thread per brand, newest-looking activity first. */
function buildThreads(): ChatThread[] {
  const brands = brandListSchema.parse(brandsJson);
  const now = Date.now();

  const threads = brands.map((brand, i) => {
    // Stagger timestamps so the list has a believable recency order.
    const minutesAgo = (i + 1) * 7;
    const sentAt = new Date(now - minutesAgo * 60_000).toISOString();
    return {
      id: `thread-${brand.slug}`,
      brandSlug: brand.slug,
      brandName: brand.name,
      color: brand.color,
      avatarUrl: brand.imageUrl,
      lastMessage: SEED_LAST_MESSAGE[i % SEED_LAST_MESSAGE.length],
      lastSentAt: sentAt,
      // A couple of brands show an unread badge for realism.
      unread: i % 4 === 0 ? (i % 8 === 0 ? 2 : 1) : 0,
    };
  });

  return chatThreadListSchema.parse(threads);
}

const SEED_LAST_MESSAGE = [
  "Yes, that item is in stock — want delivery?",
  "Thanks for your order! It ships tomorrow.",
  "We can offer 10% off for two or more units.",
  "The warranty is 5 years on all models.",
  "Hi! How can we help you today?",
  "Sure, here are the available colours.",
];

/** Seed a short conversation for a thread so the message list isn't empty. */
function buildMessages(thread: ChatThread): ChatMessage[] {
  const base = Date.parse(thread.lastSentAt ?? new Date().toISOString());
  const at = (offsetMin: number) => new Date(base - offsetMin * 60_000).toISOString();

  const messages: ChatMessage[] = [
    {
      id: `${thread.id}-m1`,
      threadId: thread.id,
      author: "seller",
      text: `Hello, welcome to ${thread.brandName}! How can we help you today?`,
      sentAt: at(30),
    },
    {
      id: `${thread.id}-m2`,
      threadId: thread.id,
      author: "user",
      text: "Hi, is this product available and what's the delivery time?",
      sentAt: at(24),
    },
    {
      id: `${thread.id}-m3`,
      threadId: thread.id,
      author: "seller",
      text: thread.lastMessage ?? "Yes, it's available.",
      sentAt: at(2),
    },
  ];

  return chatMessageListSchema.parse(messages);
}

export const chatService = {
  /**
   * List conversation threads.
   * @param brandSlug when provided, scopes to that single brand (brand pages).
   *                  Omitted → all brands (Home chat).
   */
  async getThreads(brandSlug?: string, _signal?: AbortSignal): Promise<ChatThread[]> {
    await simulateLatency();
    const all = buildThreads();
    return brandSlug ? all.filter((t) => t.brandSlug === brandSlug) : all;
  },

  async getThread(threadId: string, _signal?: AbortSignal): Promise<ChatThread> {
    await simulateLatency();
    const thread = buildThreads().find((t) => t.id === threadId);
    if (!thread) throw new Error(`Chat thread not found: ${threadId}`);
    return thread;
  },

  async getMessages(threadId: string, _signal?: AbortSignal): Promise<ChatMessage[]> {
    await simulateLatency();
    const thread = buildThreads().find((t) => t.id === threadId);
    if (!thread) return [];
    return buildMessages(thread);
  },

  /**
   * "Send" a message. In static mode this just echoes the optimistic message
   * back with an id/timestamp; the real transport would POST / emit over a
   * socket here and return the server-acknowledged message.
   */
  async sendMessage(threadId: string, text: string): Promise<ChatMessage> {
    await simulateLatency();
    return {
      id: `${threadId}-u-${Date.now()}`,
      threadId,
      author: "user",
      text,
      sentAt: new Date().toISOString(),
    };
  },
};
