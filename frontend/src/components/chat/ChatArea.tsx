import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Bot } from "lucide-react";
import { MessageInterface } from "@/interfaces/MessageInterface";


interface ChatAreaProps {
  messages: MessageInterface[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  onNewConversation: () => void;
}

export const ChatArea = ({ messages, onSendMessage, isLoading, onNewConversation }: ChatAreaProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center gap-3 p-4 border-b border-border bg-card">
        <button
          onClick={onNewConversation}
          aria-label="Nouvelle conversation"
          className="h-10 w-10 rounded-full bg-primary flex items-center justify-center hover:opacity-90 focus:outline-none"
        >
          <Bot className="h-6 w-6 text-primary-foreground" />
        </button>
        <div>
          <h2 className="font-semibold text-foreground">Assistant IA Interne</h2>
          <p className="text-xs text-muted-foreground">Toujours là pour aider</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <button
                onClick={onNewConversation}
                aria-label="Nouvelle conversation"
                className="h-16 w-16 flex items-center justify-center"
              >
                <Bot className="h-8 w-8 text-primary" />
              </button>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Bienvenue dans votre Assistant IA
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Commencez une conversation en tapant votre message ci-dessous. Je suis là pour vous aider avec toutes vos questions ou tâches.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                role={message.auteur}
                content={message.contenu}
                timestamp={new Date(message.dateMessage)}
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
