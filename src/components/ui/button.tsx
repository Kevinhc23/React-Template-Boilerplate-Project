import type { FC } from "react";
import { cn } from "@/lib/utils";

type Props = {
  label?: string;
  variant?: Variants;
  size?: Size;
} & React.ComponentProps<"button">;

type Variants = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  outline: "shadow-[inset_0_0_0_1px_#c96442] text-primary",
  ghost: "bg-transparent text-primary",
} satisfies Record<Variants, string>;

const sizes = {
  sm: "px-2 py-1",
  md: "px-4 py-2",
  lg: "px-6 py-3",
} satisfies Record<Size, string>;

const Button: FC<Props> = ({
  variant = "primary",
  size = "md",
  label = "Button",
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={cn(
        variants[variant],
        sizes[size],
        rest.className,
        "rounded-sm min-w-[120x]",
        "font-medium",
        "transition-all duration-150 ease-in-out",
        "hover:opacity-90",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "hover:scale-105",
        "active:scale-95",
        "cursor-pointer",
      )}
    >
      {label}
    </button>
  );
};

Button.displayName = "Button";

export default Button;
