import { z } from "zod";

/**
 * Chat domain — validated at the data boundary like every other feature.
 *
 * A "thread" is a conversation with one seller/brand. The Home chat screen
 * lists a thread for EVERY brand; a brand page's chat is scoped to just that
 * brand's thread (see chatService.getThreads / getThread).
 *
 * Messages are STATIC MODE today (seeded locally). The public surface matches
 * how a real WebSocket/SaaS backend would look, so swapping transport later
 * touches only the service — never the components.
 */
export const chatAuthorSchema = z.enum(["user", "seller"]);

export const chatMessageSchema = z.object({
  id: z.string(),
  threadId: z.string(),
  author: chatAuthorSchema,
  text: z.string(),
  /** ISO timestamp; kept as string so the model stays serializable. */
  sentAt: z.string(),
});

export const chatThreadSchema = z.object({
  id: z.string(),
  /** The brand this conversation is with. */
  brandSlug: z.string(),
  brandName: z.string(),
  /** Brand accent colour for the avatar circle (mirrors brands.json). */
  color: z.string(),
  avatarUrl: z.string().optional(),
  lastMessage: z.string().optional(),
  lastSentAt: z.string().optional(),
  unread: z.number().int().nonnegative().default(0),
});

export const chatThreadListSchema = z.array(chatThreadSchema);
export const chatMessageListSchema = z.array(chatMessageSchema);

export type ChatAuthor = z.infer<typeof chatAuthorSchema>;
export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatThread = z.infer<typeof chatThreadSchema>;
