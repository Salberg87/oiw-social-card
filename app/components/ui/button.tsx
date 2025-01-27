import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#eca1fd] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#2b005c] text-[#f7ebda] shadow hover:bg-[#000037]",
        destructive:
          "bg-[#ff4f45] text-[#f7ebda] shadow-sm hover:bg-[#ff4f45]/90",
        outline:
          "border border-[#2b005c] bg-transparent text-[#f7ebda] shadow-sm hover:bg-[#2b005c] hover:text-[#f7ebda]",
        secondary:
          "bg-[#000037] text-[#f7ebda] shadow-sm hover:bg-[#000037]/80",
        ghost: "hover:bg-[#2b005c] hover:text-[#f7ebda]",
        link: "text-[#eca1fd] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        data-oid="8kv-mkw"
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
