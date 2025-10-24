import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Bot } from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export const ChatArea = ({ messages, onSendMessage, isLoading }: ChatAreaProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center gap-3 p-4 border-b border-border bg-card">
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
          <Bot className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">Assistant IA Interne</h2>
          <p className="text-xs text-muted-foreground">Always here to help</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Welcome to your AI Assistant
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Start a conversation by typing your message below. I'm here to help you with any questions or tasks.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                role={message.role}
                content={message.content}
                timestamp={message.timestamp}
              />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse delay-75" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse delay-150" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      <ChatInput onSendMessage={onSendMessage} disabled={isLoading} />
    </div>
  );
};
