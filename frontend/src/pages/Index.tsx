import { useEffect, useState } from "react";
import { Sidebar } from "@/components/chat/Sidebar";
import { ChatArea } from "@/components/chat/ChatArea";
import { chatService } from "@/services/chatService";
import { conversationService } from "@/services/conversationService";
import { useToast } from "@/hooks/use-toast";
import { ConversationInterface } from "@/interfaces/ConversationInterface";
import { MessageInterface } from "@/interfaces/MessageInterface";

const Index = () => {
  const { toast } = useToast();

  const [conversations, setConversations] = useState<ConversationInterface[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationInterface | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Charger les conversations au démarrage
  useEffect(() => {
    const load = async () => {
      try {
        const convs = await conversationService.getAll();
        setConversations(convs);

        const savedId = localStorage.getItem("activeConversationId");
        if (savedId) {
          const conv = convs.find(c => c.idConversation === Number(savedId));
          if (conv) setSelectedConversation(conv);
        }
      } catch {
        toast({ title: "Erreur", description: "Impossible de charger les conversations." });
      }
    };
    load();
  }, []);

  const handleNewConversation = () => {
    setSelectedConversation(null);
    localStorage.removeItem("activeConversationId");
    toast({ title: "Nouvelle conversation", description: "Prêt à démarrer." });
  };

  const handleSelectConversation = async (id: number) => {
    try {
      const conv = await conversationService.getById(id);
      setSelectedConversation(conv);
      localStorage.setItem("activeConversationId", id.toString());
    } catch {
      toast({ title: "Erreur", description: "Impossible de charger la conversation." });
    }
  };

  const handleDeleteConversation = async (id: number) => {
    try {
      await conversationService.deleteById(id);
      setConversations(prev => prev.filter(c => c.idConversation !== id));
      if (selectedConversation?.idConversation === id) {
        setSelectedConversation(null);
        localStorage.removeItem("activeConversationId");
      }
      toast({ title: "Conversation supprimée" });
    } catch {
      toast({ title: "Erreur", description: "Échec de la suppression." });
    }
  };

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    const currentId = selectedConversation?.idConversation ?? Number(localStorage.getItem("activeConversationId")) ?? null;

    try {
      // Ajout du message utilisateur
      const userMessage: MessageInterface = {
        idMessage: Date.now(),
        auteur: "user",
        contenu: message,
        dateMessage: new Date().toISOString(),
      };

      const updatedConv = {
        ...selectedConversation,
        messages: [...(selectedConversation?.messages ?? []), userMessage],
      } as ConversationInterface;
      setSelectedConversation(updatedConv);

      const response = await chatService.sendMessage({
        message,
        profile: "user",
        conversationId: currentId ?? undefined,
      });

      const assistantMessage: MessageInterface = {
        idMessage: Date.now() + 1,
        auteur: "assistant",
        contenu: response.content,
        dateMessage: new Date().toISOString(),
      };

      setSelectedConversation(prev => ({
        ...prev!,
        messages: [...(prev?.messages ?? []), assistantMessage],
      }));
    } catch {
      toast({ title: "Erreur", description: "Échec de l’envoi du message." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar
        userName="Loan Juin"
        userRole="standard"
        onRoleChange={() => {}}
        conversations={conversations}
        selectedConversationId={selectedConversation?.idConversation?.toString()}
        onSelectConversation={(id) => handleSelectConversation(Number(id))}
        onDeleteConversation={(id) => handleDeleteConversation(Number(id))}
      />
      <main className="flex-1 flex flex-col">
        <ChatArea
          messages={selectedConversation?.messages ?? []}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          onNewConversation={handleNewConversation}
        />
      </main>
    </div>
  );
};

export default Index;
