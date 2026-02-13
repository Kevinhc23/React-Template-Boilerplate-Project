import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva("px-4 py-2 rounded-lg cursor-pointer", {
  variants: {
    variant: {
      default:
        "px-4 py-2 rounded-lg cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90",
    },

    size: {
      default:
        "h-10 px-4 py-2 rounded-lg cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
