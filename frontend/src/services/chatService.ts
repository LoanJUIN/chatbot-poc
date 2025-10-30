import axios from "axios";

const API_URL = "http://localhost:8080/api/chat";

export const chatService = {
  async sendMessage({
    message,
    conversationId,
  }: {
    message: string;
    conversationId?: number | null;
  }) {
    const body: any = { message };
    if (conversationId) body.conversationId = conversationId;

    const { data } = await axios.post(API_URL, body);

    return {
      content: data.response,
      conversationId: data.conversationId,
    };
  },

  async getConversationById(id: number) {
    const { data } = await axios.get(`http://localhost:8080/api/conversations/${id}`);
    return data;
  },
};
