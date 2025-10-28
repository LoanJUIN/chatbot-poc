import { useState } from "react";
import { Sidebar } from "@/components/chat/Sidebar";
import { ChatArea } from "@/components/chat/ChatArea";
import { chatService } from "@/services/chatService";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Index = () => {
  const { toast } = useToast();
  const [userRole, setUserRole] = useState("standard");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<string>();

  // Mock conversation history
  const conversations = [
    {
      id: "1",
      title: "Project planning discussion",
      timestamp: new Date(2025, 9, 20, 14, 30),
    },
    {
      id: "2",
      title: "Technical documentation help",
      timestamp: new Date(2025, 9, 21, 10, 15),
    },
    {
      id: "3",
      title: "Code review questions",
      timestamp: new Date(2025, 9, 22, 9, 0),
    },
  ];

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage({
        message,
        profile: userRole,
      });

      // Add assistant response
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date(response.timestamp),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      });
      
      // Add mock response for demo purposes (remove when backend is ready)
      const mockResponse: Message = {
        role: 'assistant',
        content: "Je suis votre assistant IA. Votre API backend n'est pas encore connectée, mais je suis prêt à vous aider une fois qu'elle sera configurée !",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, mockResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
    // In a real app, load conversation messages here
    toast({
      title: "Historique chargé",
      description: `Chargement de la conversation : ${conversations.find(c => c.id === id)?.title}`,
    });
  };

  const handleDeleteConversation = (id: string) => {
    // In a real app, you would also remove the conversation from state
    //passer au backend to delete the conversation
    toast({
      title: "Conversation supprimée",
      description: `La conversation "${conversations.find(c => c.id === id)?.title}" a été supprimée.`,
    });
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar
        userName="Loan Juin"
        userRole={userRole}
        onRoleChange={setUserRole}
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={(id) => {
          toast({
            title: "Conversation supprimée",
            description: `La conversation "${conversations.find(c => c.id === id)?.title}" a été supprimée.`,
          });
        }}
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
