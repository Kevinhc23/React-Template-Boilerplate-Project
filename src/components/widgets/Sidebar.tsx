import type { FC } from "react";
import {
  Atom,
  LayoutPanelLeft,
  Settings,
  Bug,
  Database,
  FolderGit2,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";

interface SidebarProps extends React.ComponentProps<"aside"> {}

type NavItem = {
  to: string;
  icon: FC<React.ComponentProps<"svg">>;
  label: string;
};

const Sidebar: FC<SidebarProps> = ({ className, ...rest }) => {
  const { pathname } = useLocation();

  const navItems: NavItem[] = [
    { to: "/", icon: LayoutPanelLeft, label: "Dashboard" },
    {
      to: "/projects",
      icon: FolderGit2,
      label: "Projects",
    },
    { to: "/database", icon: Database, label: "Database" },
    {
      to: "/debug",
      icon: Bug,
      label: "Debug",
    },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  const itemClasses =
    "p-2 rounded-lg hover:bg-secondary/80 transition-colors w-full flex justify-center cursor-pointer";

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
              <Atom className="size-6 text-primary" />
            </Link>
          </div>
        </section>

        <section aria-label="Main navigation" className="flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const content = <Icon className={cn("size-6")} />;
            return (
              <Link
                to={item.to}
                key={item.label}
                className={cn(
                  itemClasses,
                  pathname.search(item.to) === 0 && "text-primary",
                )}
              >
                {content}
              </Link>
            );
          })}
        </section>

        <section aria-label="Bottom navigation" className="flex justify-center">
          <button className="p-2 rounded-lg hover:bg-secondary/40 transition-colors cursor-pointer">
            <div className="size-6 bg-primary text-primary-foreground flex items-center justify-center rounded-full p-4">
              <span>KH</span>
            </div>
          </button>
        </section>
      </div>
    </aside>
  );
};

export default Sidebar;
