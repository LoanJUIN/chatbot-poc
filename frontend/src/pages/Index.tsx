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
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      
      // Add mock response for demo purposes (remove when backend is ready)
      const mockResponse: Message = {
        role: 'assistant',
        content: "I'm your AI assistant. Your backend API is not connected yet, but I'm ready to help once it's set up!",
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
      title: "Conversation loaded",
      description: `Loading conversation: ${conversations.find(c => c.id === id)?.title}`,
    });
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar
        userName="John Doe"
        userRole={userRole}
        onRoleChange={setUserRole}
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        onSelectConversation={handleSelectConversation}
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
