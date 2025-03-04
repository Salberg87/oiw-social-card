import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eca1fd]/70 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#2b005c] text-[#f7ebda] shadow-md hover:bg-[#000037] hover:shadow-lg active:translate-y-0.5 active:shadow",
        destructive:
          "bg-[#ff4f45] text-[#f7ebda] shadow-md hover:bg-[#ff4f45]/90 hover:shadow-lg active:translate-y-0.5 active:shadow",
        outline:
          "border-2 border-[#2b005c] bg-transparent text-[#2b005c] shadow-sm hover:bg-[#2b005c]/10 hover:text-[#2b005c] active:translate-y-0.5",
        secondary:
          "bg-[#000037] text-[#f7ebda] shadow-md hover:bg-[#000037]/90 hover:shadow-lg active:translate-y-0.5 active:shadow",
        ghost: "text-[#2b005c] hover:bg-[#2b005c]/10 hover:text-[#2b005c] active:translate-y-0.5",
        link: "text-[#eca1fd] underline-offset-4 hover:underline hover:text-[#eca1fd]/80",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10",
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
