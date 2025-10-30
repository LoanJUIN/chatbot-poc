import { ConversationInterface } from "@/interfaces/ConversationInterface";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const conversationService = {
  async getAll(): Promise<ConversationInterface[]> {
    const res = await fetch(`${API_BASE_URL}/api/conversations`);
    if (!res.ok) throw new Error("Impossible de charger les conversations");
    return res.json();
  },

  async getById(id: number): Promise<ConversationInterface> {
    const res = await fetch(`${API_BASE_URL}/api/conversations/${id}`);
    if (!res.ok) throw new Error("Impossible de charger la conversation");
    return res.json();
  },

  async deleteById(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/api/conversations/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Erreur lors de la suppression de la conversation");
  },
};
