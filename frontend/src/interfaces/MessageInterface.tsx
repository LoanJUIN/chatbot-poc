export interface MessageInterface {
  idMessage: number;
  auteur: "user" | "assistant";
  contenu: string;
  dateMessage: string;
}
