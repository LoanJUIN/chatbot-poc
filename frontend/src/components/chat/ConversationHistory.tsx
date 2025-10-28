import { MessageSquare, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
}

interface ConversationHistoryProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
}

export const ConversationHistory = ({
  conversations,
  selectedId,
  onSelectConversation,
  onDeleteConversation,
}: ConversationHistoryProps) => {
  return (
    <div className="p-4 bg-card rounded-lg border border-border shadow-sm">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Historique</h3>
      <ScrollArea className="h-[400px]">
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedId === conversation.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              <div className="flex items-start gap-2">
                <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{conversation.title}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(conversation.timestamp).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <Trash2 className="h-4 w-4 text-muted-foreground flex-shrink-0" onClick={() => onDeleteConversation(conversation.id)} />
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
