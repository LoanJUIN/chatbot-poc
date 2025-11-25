import { UserProfile } from "./UserProfile";
import { ConversationHistory } from "./ConversationHistory";
import { ConversationInterface } from "@/interfaces/ConversationInterface";


interface SidebarProps {
  userName: string;
  userAvatar?: string;
  userRole: string;
  onRoleChange: (role: string) => void;
  conversations: ConversationInterface[];
  selectedConversationId?: string;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
}

export const Sidebar = ({
  userName,
  userAvatar,
  userRole,
  onRoleChange,
  conversations,
  selectedConversationId,
  onSelectConversation,
  onDeleteConversation,
}: SidebarProps) => {
  return (
    <aside className="w-80 bg-secondary/30 border-r border-border p-4 flex flex-col gap-4">
      <UserProfile
        userName={userName}
        userAvatar={userAvatar}
        userRole={userRole}
        onRoleChange={onRoleChange}
      />
      <ConversationHistory
        conversations={conversations}
        selectedId={selectedConversationId}
        onSelectConversation={onSelectConversation}
        onDeleteConversation={onDeleteConversation}
      />
    </aside>
  );
};
