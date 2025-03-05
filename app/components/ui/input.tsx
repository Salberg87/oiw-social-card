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
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          "[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:hidden",
          "[&::-webkit-list-button]:appearance-none",
          className,
        )}
        ref={ref}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        data-lpignore="true"
        data-form-type="other"
        style={{
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          appearance: 'none'
        }}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
