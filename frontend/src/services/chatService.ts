export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  profile: string;
  conversationId?: number;
}

export interface ChatResponse {
  response: string;
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

    // Si on reçoit un conversationId, on le stocke pour la session
    if (data.conversationId) {
      localStorage.setItem("activeConversationId", data.conversationId);
    }

    return {
      role: "assistant",
      content: data.response,
      timestamp: new Date(),
    };
  },

  async getAllConversations() {
    const res = await fetch(`${API_BASE_URL}/api/conversations`);
    if (!res.ok) throw new Error("Impossible de charger les conversations");
    const data = await res.json();

    return data.map((conv: any) => ({
      id: conv.idConversation.toString(),
      title: conv.titre || "Sans titre",
      timestamp: new Date(conv.dateCreation),
      messages: conv.messages?.map((m: any) => ({
        role: m.auteur === "assistant" ? "assistant" : "user",
        content: m.contenu,
        timestamp: new Date(m.dateMessage),
      })) ?? [],
    }));
  },

  async getMessages(conversationId: number) {
    const res = await fetch(`${API_BASE_URL}/api/conversations/${conversationId}/messages`);
    if (!res.ok) throw new Error("Impossible de charger les messages");
    const data = await res.json();

    return data.map((m: any) => ({
      role: m.auteur === "assistant" ? "assistant" : "user",
      content: m.contenu,
      timestamp: new Date(m.dateMessage),
    }));
  },

  async deleteConversation(conversationId: number) {
    await fetch(`${API_BASE_URL}/api/conversations/${conversationId}`, { method: "DELETE" });
  },
};
