import { MessageInterface } from "./MessageInterface";

export interface ConversationInterface {
  idConversation: number;
  titre: string;
  dateCreation: string;
  messages: MessageInterface[];
}
