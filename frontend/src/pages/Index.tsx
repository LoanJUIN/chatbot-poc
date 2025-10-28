import { useState } from "react";
import { Sidebar } from "@/components/chat/Sidebar";
import { ChatArea } from "@/components/chat/ChatArea";
import { chatService } from "@/services/chatService";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Index = () => {
  const { toast } = useToast();
  const [userRole, setUserRole] = useState("standard");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<string>();

  const conversations = [
    { id: "1", title: "Nouvelle conversation", timestamp: new Date() },
  ];

  const handleSendMessage = async (message: string) => {
    const userMessage: Message = {
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const assistantMessage = await chatService.sendMessage({
        message,
        profile: userRole,
      });
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Erreur API",
        description:
          "Impossible de contacter le backend. Vérifie qu'il est bien lancé.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar
        userName="Loan Juin"
        userRole={userRole}
        onRoleChange={setUserRole}
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        onSelectConversation={setSelectedConversationId}
        onDeleteConversation={(id) =>
          toast({
            title: "Conversation supprimée",
            description: "Cette conversation a été supprimée.",
          })
        }
      />
      <main className="flex-1 flex flex-col">
        <ChatArea
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default Index;
