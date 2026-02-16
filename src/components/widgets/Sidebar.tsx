import type { FC } from "react";
import {
  LayoutPanelLeft,
  Settings,
  Bug,
  Database,
  FolderKanban,
  HelpCircle,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { BancoGuayaquilIsotipoIcon } from "@/components/ui/icons";
import { motion } from "motion/react";

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
      icon: FolderKanban,
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
    "p-2 rounded-lg hover:bg-primary/10 transition-colors w-full flex justify-center cursor-pointer";

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
            <Link to="/" viewTransition aria-label="Home">
              <BancoGuayaquilIsotipoIcon className="size-7 text-primary" />
            </Link>
          </div>
        </section>

        <section aria-label="Main navigation" className="flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                to={item.to}
                key={item.label}
                viewTransition
                aria-label={item.label}
                className={cn(
                  itemClasses,
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-400 hover:bg-primary/10 hover:text-primary",
                )}
              >
                <Icon className={cn("size-6 stroke-[1.5px]")} />
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute -left-5 w-1 h-6 bg-primary rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </section>

        <section aria-label="Bottom navigation" className="flex justify-center">
          <Link
            to="/about"
            viewTransition
            aria-label="About"
            className={cn(
              itemClasses,
              "text-slate-400 hover:bg-primary/10 hover:text-primary",
            )}
          >
            <HelpCircle className="size-6 stroke-[1.5px] " />
          </Link>
        </section>
      </div>
    </aside>
  );
};

export default Sidebar;
