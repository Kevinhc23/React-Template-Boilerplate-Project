import type { FC } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface HeaderProps extends React.ComponentProps<"header"> {}

const TABS = [
  { value: "foryou", label: "Para ti" },
  { value: "following", label: "Siguiendo" },
  { value: "video", label: "Video" },
];

const Header: FC<HeaderProps> = ({ className, ...rest }) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur border-border/40 py-2 h-auto",
        className,
      )}
      {...rest}
    >
      <div className="max-w-2xl mx-auto flex justify-center">
        <Tabs defaultValue="foryou" className="w-auto">
          <TabsList
            variant="line"
            className="flex bg-transparent p-0 gap-6 h-auto"
          >
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "w-auto px-2 cursor-pointer",
                  "data-[state=active]:text-foreground data-[state=active]:font-semibold hover:text-primary/80",
                  "text-base font-sans",
                  "transition-all duration-100 ease-in-out",
                )}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
};

export default Header;
