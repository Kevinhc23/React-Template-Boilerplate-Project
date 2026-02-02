import type { FC } from "react";
import { Ghost, Home, Search, Plus, Heart, User, Menu } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { useModalStore } from "@/app/store/useModalStore";
import { UserModal } from "./modals/UserModal";

interface SidebarProps extends React.ComponentProps<"aside"> {}

type NavItem = {
  to?: string;
  icon: FC<React.ComponentProps<"svg">>;
  label: string;
  isPrimary?: boolean;
  onClick?: () => void;
};

const Sidebar: FC<SidebarProps> = ({ className, ...rest }) => {
  const openModal = useModalStore((s) => s.openModal);

  const navItems: NavItem[] = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/search", icon: Search, label: "Search" },
    {
      icon: Plus,
      label: "Create",
      isPrimary: true,
      onClick: () =>
        openModal(UserModal, {
          name: "Gemini",
          role: "AI Collaborator",
        }),
    },
    { to: "/activity", icon: Heart, label: "Activity" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  const itemClasses =
    "p-2 rounded-lg hover:bg-secondary/40 transition-colors w-full flex justify-center cursor-pointer";

  return (
    <aside
      {...rest}
      className={cn("border-r border-gray-200 h-screen", className)}
    >
      <div
        className="flex flex-col gap-4 justify-between h-full p-4"
        aria-label="Sidebar"
      >
        <section aria-label="Top navigation">
          <div className="flex items-center gap-2 justify-center">
            <Link to="/">
              <Ghost className="size-6 text-primary" />
            </Link>
          </div>
        </section>

        <section aria-label="Main navigation" className="flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const content = (
              <Icon
                className={cn(
                  "size-6",
                  item.isPrimary ? "text-primary" : "text-zinc-500",
                )}
              />
            );

            if (item.to) {
              return (
                <Link to={item.to} key={item.label} className={itemClasses}>
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className={itemClasses}
                type="button"
              >
                {content}
              </button>
            );
          })}
        </section>

        <section aria-label="Bottom navigation" className="flex justify-center">
          <button className="p-2 rounded-lg hover:bg-secondary/40 transition-colors cursor-pointer">
            <Menu className="size-6 text-zinc-500" />
          </button>
        </section>
      </div>
    </aside>
  );
};

export default Sidebar;
