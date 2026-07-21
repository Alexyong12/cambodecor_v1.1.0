"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import { chatService } from "../services/chat.service";
import type { ChatMessage } from "../schemas/chat.schema";

/**
 * Conversation threads. Pass a `brandSlug` to scope the list to a single
 * brand (brand pages); omit it for the Home chat (all brands).
 */
export function useThreads(brandSlug?: string) {
  return useQuery({
    queryKey: queryKeys.chat.threads(brandSlug),
    queryFn: ({ signal }) => chatService.getThreads(brandSlug, signal),
    staleTime: 60 * 1000,
  });
}

export function useThread(threadId: string) {
  return useQuery({
    queryKey: queryKeys.chat.thread(threadId),
    queryFn: ({ signal }) => chatService.getThread(threadId, signal),
    enabled: Boolean(threadId),
  });
}

export function useMessages(threadId: string) {
  return useQuery({
    queryKey: queryKeys.chat.messages(threadId),
    queryFn: ({ signal }) => chatService.getMessages(threadId, signal),
    enabled: Boolean(threadId),
  });
}

/**
 * Send a message with an optimistic update: the user's line shows instantly,
 * then reconciles with the "server" acknowledgement. This is the same shape
 * a real socket-backed send would take.
 */
export function useSendMessage(threadId: string) {
  const queryClient = useQueryClient();
  const key = queryKeys.chat.messages(threadId);

  return useMutation({
    mutationFn: (text: string) => chatService.sendMessage(threadId, text),
    onMutate: async (text) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<ChatMessage[]>(key) ?? [];
      const optimistic: ChatMessage = {
        id: `optimistic-${Date.now()}`,
        threadId,
        author: "user",
        text,
        sentAt: new Date().toISOString(),
      };
      queryClient.setQueryData<ChatMessage[]>(key, [...previous, optimistic]);
      return { previous };
    },
    onError: (_err, _text, context) => {
      if (context?.previous) queryClient.setQueryData(key, context.previous);
    },
    onSuccess: (serverMessage) => {
      // Replace the optimistic placeholder with the acknowledged message.
      queryClient.setQueryData<ChatMessage[]>(key, (current = []) => {
        const withoutOptimistic = current.filter(
          (m) => !m.id.startsWith("optimistic-"),
        );
        return [...withoutOptimistic, serverMessage];
      });
    },
  });
}
