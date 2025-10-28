export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  profile: string;
}

export interface ChatResponse {
  response: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";


export const chatService = {
  async sendMessage(request: ChatRequest): Promise<ChatMessage> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: request.message }),
      });

      if (!response.ok) {
        throw new Error(`Erreur API (${response.status})`);
      }

      const data: ChatResponse = await response.json();

      return {
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error("Chat service error:", error);
      throw error;
    }
  },

  async deleteConversation(conversationId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/conversations/${conversationId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Chat service error:', error);
      throw error;
    }
  },
};
