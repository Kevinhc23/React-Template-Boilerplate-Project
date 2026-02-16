import {
  CreditCard,
  Github,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

import { useProfileShortcuts } from "@/hooks/shortcuts/useProfileShortcuts";
import { useNavigate } from "react-router";
import { useMsal } from "@azure/msal-react";

export const MenuProfileAvatar = () => {
  const navigateTo = useNavigate();
  const { instance } = useMsal();

  useProfileShortcuts({
    onProfile: () => navigateTo("/profile"),
    onBilling: () => navigateTo("/billing"),
    onLogout: () => instance.logoutRedirect(),
  });

  return (
    <DropdownMenuContent
      className="w-64 p-2 rounded-xl border-border bg-popover shadow-lg animate-in fade-in-0 zoom-in-95"
      align="end"
      sideOffset={12}
    >
      <DropdownMenuLabel className="px-3 py-3 mb-1">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold text-foreground font-sans">
            My Account
          </p>
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Premium Plan
          </p>
        </div>
      </DropdownMenuLabel>

      <DropdownMenuSeparator className="mx-1 bg-border/60" />

      <DropdownMenuGroup className="space-y-1 mt-1">
        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors focus:bg-primary/5 focus:text-primary group">
          <User className="h-4 w-4 text-muted-foreground group-focus:text-primary transition-colors" />
          <span className="font-sans text-sm font-medium">Profile</span>
          <DropdownMenuShortcut className="ml-auto text-[10px] opacity-50">
            ⇧⌘P
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors focus:bg-primary/5 focus:text-primary group">
          <CreditCard className="h-4 w-4 text-muted-foreground group-focus:text-primary transition-colors" />
          <span className="font-sans text-sm font-medium">Billing</span>
          <DropdownMenuShortcut className="ml-auto text-[10px] opacity-50">
            ⌘B
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors focus:bg-primary/5 focus:text-primary group">
          <Settings className="h-4 w-4 text-muted-foreground group-focus:text-primary transition-colors" />
          <span className="font-sans text-sm font-medium">Settings</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator className="mx-1 bg-border/60" />

      <DropdownMenuGroup className="space-y-1">
        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer focus:bg-accent group">
          <Users className="h-4 w-4 text-muted-foreground group-focus:text-foreground" />
          <span className="font-sans text-sm font-medium">Team</span>
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer focus:bg-accent group">
            <UserPlus className="h-4 w-4 text-muted-foreground group-focus:text-foreground" />
            <span className="font-sans text-sm font-medium">Invite</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="p-2 rounded-xl border-border bg-popover shadow-xl min-w-48">
              <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer focus:bg-accent">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-sans text-sm">Vía Email</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer focus:bg-accent">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="font-sans text-sm">WhatsApp</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuGroup>

      <DropdownMenuSeparator className="mx-1 bg-border/60" />

      <DropdownMenuGroup className="space-y-1">
        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer focus:bg-accent group">
          <Github className="h-4 w-4 text-muted-foreground group-focus:text-foreground" />
          <span className="font-sans text-sm font-medium">GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer focus:bg-accent group">
          <LifeBuoy className="h-4 w-4 text-muted-foreground group-focus:text-foreground" />
          <span className="font-sans text-sm font-medium">Support</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator className="mx-1 bg-border/60" />

      <DropdownMenuItem
        className="mt-1 flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-destructive focus:bg-destructive/10 focus:text-destructive group *:hover:text-destructive"
        onClick={() => console.log("Cerrar sesión")}
      >
        <LogOut className="h-4 w-4 text-destructive/70 group-focus:text-destructive transition-colors" />
        <span className="font-sans text-sm font-bold">Logout</span>
        <DropdownMenuShortcut className="ml-auto text-[10px] opacity-70">
          ⇧⌘L
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
