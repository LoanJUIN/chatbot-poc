import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "lucide-react";

interface UserProfileProps {
  userName: string;
  userAvatar?: string;
  userRole: string;
  onRoleChange: (role: string) => void;
}

export const UserProfile = ({ userName, userAvatar, userRole, onRoleChange }: UserProfileProps) => {
  return (
    <div className="p-4 bg-card rounded-lg border border-border shadow-sm">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">User Profile</h3>
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground truncate">{userName}</p>
        </div>
      </div>
      <div>
        <label className="text-xs text-muted-foreground mb-2 block">Role</label>
        <Select value={userRole} onValueChange={onRoleChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="expert">Expert</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
