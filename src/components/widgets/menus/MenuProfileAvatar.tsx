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
import { Link, useNavigate } from "react-router";
import { useMsalAuth } from "@/hooks/useMsalAuth";
import { useProfileShortcuts } from "@/hooks/shortcuts/useProfileShortcuts";

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

/**
 * MenuProfileAvatar
 * Componente de menú desplegable profesional estilo SaaS.
 * Corregido para evitar errores de clonación de Radix UI con asChild.
 */
export const MenuProfileAvatar = () => {
  const navigateTo = useNavigate();
  const { logout } = useMsalAuth();

  // Implementación del Custom Hook para atajos de teclado
  useProfileShortcuts({
    onProfile: () => navigateTo("/profile"),
    onBilling: () => navigateTo("/billing"),
    onLogout: () => logout(),
  });

  return (
    <DropdownMenuContent
      className="w-64 p-2 rounded-xl border-border bg-popover shadow-lg animate-in fade-in-0 zoom-in-95"
      align="end"
      sideOffset={12}
    >
      {/* Cabecera del Menú */}
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

      {/* Grupo: Usuario y Configuración */}
      <DropdownMenuGroup className="space-y-1 mt-1">
        <DropdownMenuItem
          asChild
          className="cursor-pointer focus:bg-primary/5 focus:text-primary group rounded-lg transition-colors"
        >
          <Link to="/profile" viewTransition aria-label="Profile">
            {/* Contenedor único para evitar el error React.Children.only */}
            <div className="flex w-full items-center gap-3 px-3 py-2.5">
              <User className="h-4 w-4 text-muted-foreground group-focus:text-primary transition-colors" />
              <span className="font-sans text-sm font-medium">Profile</span>
              <DropdownMenuShortcut className="ml-auto text-[10px] opacity-50 group-focus:text-primary/70">
                ⇧⌘P
              </DropdownMenuShortcut>
            </div>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="cursor-pointer focus:bg-primary/5 focus:text-primary group rounded-lg transition-colors"
        >
          <Link to="/billing" viewTransition aria-label="Billing">
            <div className="flex w-full items-center gap-3 px-3 py-2.5">
              <CreditCard className="h-4 w-4 text-muted-foreground group-focus:text-primary transition-colors" />
              <span className="font-sans text-sm font-medium">Billing</span>
              <DropdownMenuShortcut className="ml-auto text-[10px] opacity-50 group-focus:text-primary/70">
                ⌘B
              </DropdownMenuShortcut>
            </div>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="cursor-pointer focus:bg-primary/5 focus:text-primary group rounded-lg transition-colors"
        >
          <Link to="/settings" viewTransition aria-label="Settings">
            <div className="flex w-full items-center gap-3 px-3 py-2.5">
              <Settings className="h-4 w-4 text-muted-foreground group-focus:text-primary transition-colors" />
              <span className="font-sans text-sm font-medium">Settings</span>
            </div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator className="mx-1 bg-border/60" />

      {/* Grupo: Equipo y Colaboración */}
      <DropdownMenuGroup className="space-y-1">
        <DropdownMenuItem
          asChild
          className="cursor-pointer focus:bg-accent group rounded-lg transition-colors"
        >
          <Link to="/team" viewTransition aria-label="Team">
            <div className="flex w-full items-center gap-3 px-3 py-2.5">
              <Users className="h-4 w-4 text-muted-foreground group-focus:text-foreground" />
              <span className="font-sans text-sm font-medium">Team</span>
            </div>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer focus:bg-accent group">
            <UserPlus className="h-4 w-4 text-muted-foreground group-focus:text-foreground" />
            <span className="font-sans text-sm font-medium">Invite</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="p-2 rounded-xl border-border bg-popover shadow-xl min-w-48">
              <DropdownMenuItem
                asChild
                className="cursor-pointer focus:bg-accent rounded-md"
              >
                <Link
                  to="/invite/email"
                  viewTransition
                  aria-label="Invite via Email"
                >
                  <div className="flex w-full items-center gap-3 px-3 py-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-sans text-sm">Vía Email</span>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="cursor-pointer focus:bg-accent rounded-md"
              >
                <Link
                  to="/invite/whatsapp"
                  viewTransition
                  aria-label="Invite via WhatsApp"
                >
                  <div className="flex w-full items-center gap-3 px-3 py-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="font-sans text-sm">WhatsApp</span>
                  </div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuGroup>

      <DropdownMenuSeparator className="mx-1 bg-border/60" />

      {/* Grupo: Soporte y Recursos Externos */}
      <DropdownMenuGroup className="space-y-1">
        <DropdownMenuItem
          asChild
          className="cursor-pointer focus:bg-accent group rounded-lg transition-colors"
        >
          <Link
            to="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            viewTransition
            aria-label="GitHub"
          >
            <div className="flex w-full items-center gap-3 px-3 py-2.5">
              <Github className="h-4 w-4 text-muted-foreground group-focus:text-foreground" />
              <span className="font-sans text-sm font-medium">GitHub</span>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer focus:bg-accent group rounded-lg transition-colors"
        >
          <Link to="/support" viewTransition aria-label="Support">
            <div className="flex w-full items-center gap-3 px-3 py-2.5">
              <LifeBuoy className="h-4 w-4 text-muted-foreground group-focus:text-foreground" />
              <span className="font-sans text-sm font-medium">Support</span>
            </div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator className="mx-1 bg-border/60" />

      {/* Acción Destructiva: Logout */}
      <DropdownMenuItem
        className="mt-1 flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-destructive focus:bg-destructive/10 focus:text-destructive group"
        onClick={() => logout()}
      >
        <LogOut className="h-4 w-4 text-destructive/70 group-focus:text-destructive transition-colors" />
        <span className="font-sans text-sm font-bold">Logout</span>
        <DropdownMenuShortcut className="ml-auto text-[10px] opacity-70 group-focus:text-destructive">
          ⇧⌘L
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
