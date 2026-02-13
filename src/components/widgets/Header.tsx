import type { FC } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps extends React.ComponentProps<"header"> {}

const Header: FC<HeaderProps> = ({ className, ...rest }) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur border-border/40 py-2 h-auto",
        className,
      )}
      {...rest}
    >
      <div className="max-w-2xl mx-auto flex justify-center"></div>
    </header>
  );
};

export default Header;
