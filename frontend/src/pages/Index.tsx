import { useEffect, useState } from "react";
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Charger les conversations et l’historique au démarrage
  useEffect(() => {
    const loadData = async () => {
      try {
        const convs = await chatService.getAllConversations();
        setConversations(convs);

        const savedId = localStorage.getItem("activeConversationId");
        if (savedId) {
          setSelectedConversationId(Number(savedId));
          const selectedConv = convs.find(c => c.id === savedId);
          if (selectedConv && selectedConv.messages.length > 0) {
            setMessages(selectedConv.messages);
          } else {
            const msgs = await chatService.getMessages(Number(savedId));
            setMessages(msgs);
          }
        }
      } catch {
        toast({ title: "Erreur", description: "Impossible de charger l'historique." });
      }
    };
    loadData();
  }, []);


  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    const currentId = selectedConversationId ?? Number(localStorage.getItem("activeConversationId")) ?? null;

    try {
      const userMessage: Message = { role: "user", content: message, timestamp: new Date() };
      setMessages((prev) => [...prev, userMessage]);

      const response = await chatService.sendMessage({
        message,
        profile: "user",
        conversationId: currentId,
      });

      setMessages((prev) => [...prev, response]);

      // Mise à jour de l’ID de conversation s’il a été créé
      if (!currentId && localStorage.getItem("activeConversationId")) {
        setSelectedConversationId(Number(localStorage.getItem("activeConversationId")));
      }
    } catch {
      toast({ title: "Erreur", description: "Échec de l’envoi du message.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectConversation = async (id: number) => {
    setSelectedConversationId(id);
    localStorage.setItem("activeConversationId", id.toString());
    const msgs = await chatService.getMessages(id);
    setMessages(msgs.map((m: any) => ({
      role: m.auteur === "assistant" ? "assistant" : "user",
      content: m.contenu,
      timestamp: new Date(m.dateMessage?.split(".")[0]),
    })));
  };

  const handleDeleteConversation = async (id: number) => {
    await chatService.deleteConversation(id);
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (selectedConversationId === id) {
      setMessages([]);
      localStorage.removeItem("activeConversationId");
      setSelectedConversationId(null);
    }
    toast({ title: "Conversation supprimée" });
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar
        userName="Loan Juin"
        userRole="standard"
        onRoleChange={() => {}}
        conversations={conversations}
        selectedConversationId={selectedConversationId?.toString()}
        onSelectConversation={(id) => handleSelectConversation(Number(id))}
        onDeleteConversation={(id) => handleDeleteConversation(Number(id))}
      />
      <main className="flex-1 flex flex-col">
        <ChatArea messages={messages} onSendMessage={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default Index;
