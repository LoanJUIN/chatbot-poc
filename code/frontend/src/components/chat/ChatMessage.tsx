import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const ChatMessage = ({ role, content, timestamp }: ChatMessageProps) => {
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-3 shadow-sm",
          isUser
            ? "bg-[hsl(var(--chat-user))] text-[hsl(var(--chat-user-foreground))]"
            : "bg-[hsl(var(--chat-bot))] text-[hsl(var(--chat-bot-foreground))] border border-border"
        )}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{content}</p>
        <p
          className={cn(
            "text-xs mt-2 opacity-70",
            isUser ? "text-right" : "text-left"
          )}
        >
          {timestamp.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
};
