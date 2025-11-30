import { useState } from "react";
import clsx from "clsx";

import { IconButton } from "@/components/IconButton";

const fieldBaseClasses =
  "flex bg-background-secondary has-[:focus]:bg-background-active transition-colors duration-200";

export function CommentComposer() {
  const [comment, setComment] = useState("");
  const remainingChars = 280 - comment.length;
  const sendDisabled = remainingChars < 0 || comment.length === 0;

  return (
    <div className="flex flex-col w-full rounded-md border border-separator overflow-hidden">
      <div className={clsx(fieldBaseClasses, "p-3 flex-col")}>
        <textarea
          className="w-full min-h-32 outline-0 resize-none field-sizing-content"
          name="comment"
          placeholder="Leave a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <span
          className={clsx(
            "font-mono text-sm text-end",
            remainingChars < 0 ? "text-error" : "text-tertiary",
            { invisible: remainingChars > 50 },
          )}
        >
          {remainingChars}
        </span>
      </div>
      <div
        className={clsx(
          fieldBaseClasses,
          "pl-3 pr-1 py-0.5 border-t border-separator",
        )}
      >
        <input
          className="flex-1 outline-0"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name (optional)"
        />
        <IconButton
          className={clsx({
            "cursor-not-allowed opacity-20": sendDisabled,
            "cursor-pointer hover:text-primary": !sendDisabled,
          })}
          icon="send"
          aria-label="Send"
          disabled={sendDisabled}
        />
      </div>
    </div>
  );
}
