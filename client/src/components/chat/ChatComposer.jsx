import { ArrowUpIcon, ImageIcon, LoaderIcon, XIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import useKeyboardSound from "../../hooks/useKeyboardSound";
import { useChatStore } from "../../store/useChatStore";
import { useSelectedConversation } from "../../hooks/useSelectedConversation";

export function ChatComposer() {
  const composerText = useChatStore((state) => state.composerText);
  const isSoundEnabled = useChatStore((state) => state.isSoundEnabled);
  const sendMediaMessage = useChatStore((state) => state.sendMediaMessage);
  const isSendingMedia = useChatStore((state) => state.isSendingMedia);
  const sendTextMessage = useChatStore((state) => state.sendTextMessage);
  const setComposerText = useChatStore((state) => state.setComposerText);

  const { activeConversationId } = useSelectedConversation();
  const { playRandomKeyStrokeSound } = useKeyboardSound();

  const mediaInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Pending file state — file is staged here until Send is clicked
  const [pendingFile, setPendingFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Revoke the object URL when the preview changes or component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const playSoundIfEnabled = () => {
    if (isSoundEnabled) playRandomKeyStrokeSound();
  };

  const clearPendingFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPendingFile(null);
    setPreviewUrl(null);
  };

  const handleSend = async () => {
    // If there is a staged media file, send it (with optional caption text)
    if (pendingFile) {
      const didSendMessage = await sendMediaMessage({
        conversationId: activeConversationId,
        file: pendingFile,
        text: composerText.trim() || undefined,
      });
      if (didSendMessage) {
        playSoundIfEnabled();
        clearPendingFile();
        setComposerText("");
        if (textareaRef.current) textareaRef.current.style.height = "auto";
      }
      return;
    }

    // Otherwise send a plain text message
    if (!composerText.trim()) return;
    const didSendMessage = await sendTextMessage(activeConversationId);
    if (didSendMessage) {
      playSoundIfEnabled();
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleComposerTextChange = (event) => {
    setComposerText(event.target.value);
    playSoundIfEnabled();

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 128)}px`;
    }
  };

  // Only stage the file — do NOT send yet
  const handleMediaPick = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    clearPendingFile();
    setPendingFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const canSend = !!pendingFile || !!composerText.trim();
  const isVideo = pendingFile?.type?.startsWith("video/");

  return (
    <footer className="shrink-0 border-t border-border/70 bg-background/80 px-2 pb-2.5 pt-2 backdrop-blur-md sm:px-4 sm:pb-3 sm:pt-2.5">
      {isSendingMedia ? (
        <div className="mx-auto mb-2 flex max-w-full items-center gap-2 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs text-muted">
          <LoaderIcon
            className="size-3.5 shrink-0 animate-spin text-accent"
            strokeWidth={2}
            aria-hidden
          />
          <span className="truncate">Uploading media...</span>
        </div>
      ) : null}

      {/* Media preview strip — shown only when a file is staged */}
      {previewUrl && !isSendingMedia ? (
        <div className="mx-auto mb-2 flex max-w-4xl items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2">
          {isVideo ? (
            <video
              src={previewUrl}
              className="h-16 max-w-[8rem] rounded-lg object-cover"
              muted
              playsInline
            />
          ) : (
            <img
              src={previewUrl}
              alt="Preview"
              className="h-16 max-w-[8rem] rounded-lg object-cover"
            />
          )}
          <span className="flex-1 truncate text-xs text-muted">
            {pendingFile.name}
          </span>
          <button
            type="button"
            onClick={clearPendingFile}
            className="flex size-6 shrink-0 items-center justify-center rounded-full text-muted hover:bg-muted/20 hover:text-foreground"
            aria-label="Remove selected file"
          >
            <XIcon className="size-3.5" strokeWidth={2.5} />
          </button>
        </div>
      ) : null}

      <div className="mx-auto flex w-full max-w-4xl items-end gap-1.5 sm:gap-2">
        <input
          ref={mediaInputRef}
          type="file"
          accept="image/*,video/*"
          className="sr-only"
          disabled={isSendingMedia}
          tabIndex={-1}
          aria-hidden
          onChange={handleMediaPick}
        />

        {/* Media / Attachment button */}
        <button
          type="button"
          disabled={isSendingMedia}
          onClick={() => mediaInputRef.current?.click()}
          className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-surface active:scale-95 disabled:opacity-50 ${
            pendingFile ? "text-accent" : "text-muted hover:text-foreground"
          }`}
          title="Attach image or video"
          aria-label="Attach media"
        >
          <ImageIcon className="size-5 sm:size-5.5" strokeWidth={1.8} />
        </button>

        {/* Apple iMessage Pill Input Capsule */}
        <div className="flex min-h-[38px] flex-1 items-end rounded-[20px] border border-border/80 bg-surface/75 px-3.5 py-1.5 shadow-xs transition-colors focus-within:border-accent/80 focus-within:ring-1 focus-within:ring-accent/30 dark:bg-zinc-800/60">
          <textarea
            ref={textareaRef}
            placeholder={pendingFile ? "Add a caption… (optional)" : "iMessage"}
            rows={1}
            value={composerText}
            onChange={handleComposerTextChange}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSend();
              }
            }}
            className="max-h-32 min-h-[22px] flex-1 resize-none bg-transparent py-0.5 text-[15px] leading-snug text-foreground placeholder:text-muted/70 focus:outline-hidden"
          />

          {/* Embedded Send Circle Button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend || isSendingMedia}
            className={`mb-0.5 ml-2 flex size-7 shrink-0 items-center justify-center rounded-full transition-all duration-150 ${
              canSend && !isSendingMedia
                ? "cursor-pointer bg-accent text-accent-foreground shadow-xs hover:scale-105 active:scale-95"
                : "cursor-not-allowed bg-muted/20 text-muted/40 opacity-50"
            }`}
            title="Send message"
            aria-label="Send message"
          >
            <ArrowUpIcon className="size-4" strokeWidth={2.75} />
          </button>
        </div>
      </div>
    </footer>
  );
}
