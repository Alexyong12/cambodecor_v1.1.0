"use client";

import { useState, type FormEvent } from "react";
import { SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
/**
 * Message composer. Controlled locally; hands the trimmed text up via onSend
 * and clears itself. Enter submits (it's a real <form>), Shift is free for
 * future multiline if this becomes a textarea.
 */
export function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue("");
  }

  return (
    <form
      onSubmit={submit}
      className="flex items-center gap-2 border-t bg-background p-3"
    >
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Type a message..."
        aria-label="Message"
        className="mr-0"
        disabled={disabled}
      />
      <Button
        type="submit"
        variant="brand"
        size="icon"
        aria-label="Send message"
        disabled={disabled || value.trim().length === 0}
        className="shrink-0"
      >
        <SendHorizonal className="h-5 w-5" aria-hidden />
      </Button>
    </form>
  );
}
