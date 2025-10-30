export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  profile: string;
  conversationId?: number;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const chatService = {
  async sendMessage(request: ChatRequest): Promise<ChatMessage> {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    if (!response.ok) throw new Error("Erreur API");

    const data = await response.json();

    // On sauvegarde l’ID de conversation créé ou mis à jour
    if (data.conversationId) {
      localStorage.setItem("activeConversationId", data.conversationId);
    }

    return {
      role: "assistant",
      content: data.response,
      timestamp: new Date(),
    };
  },
};
