import { UserProfile } from "./UserProfile";
import { ConversationHistory } from "./ConversationHistory";

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
}

interface SidebarProps {
  userName: string;
  userAvatar?: string;
  userRole: string;
  onRoleChange: (role: string) => void;
  conversations: Conversation[];
  selectedConversationId?: string;
  onSelectConversation: (id: string) => void;
}

export const Sidebar = ({
  userName,
  userAvatar,
  userRole,
  onRoleChange,
  conversations,
  selectedConversationId,
  onSelectConversation,
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
      />
    </aside>
  );
};
