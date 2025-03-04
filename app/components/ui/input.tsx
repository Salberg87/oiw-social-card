import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-[#2b005c]/70 bg-white/90 px-4 py-2 text-sm shadow-sm transition-all duration-200 ease-in-out",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-[#2b005c]/40 placeholder:font-light",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eca1fd]/70 focus-visible:border-transparent",
          "hover:border-[#2b005c] hover:bg-white/95",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100/50",
          className,
        )}
        ref={ref}
        {...props}
        data-oid="btf7:zb"
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
