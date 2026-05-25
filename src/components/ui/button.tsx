import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "accent-emerald" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          // Variants
          {
            "bg-[#0B192C] text-white hover:bg-[#1E3E62] shadow-sm focus-visible:ring-[#0B192C]":
              variant === "primary",
            "bg-[#f1f5f9] text-[#0B192C] hover:bg-[#e2e8f0] focus-visible:ring-[#cbd5e1]":
              variant === "secondary",
            "bg-[#B6925B] text-white hover:bg-[#A37F48] shadow-sm focus-visible:ring-[#B6925B]":
              variant === "accent",
            "bg-[#10B981] text-white hover:bg-[#059669] shadow-sm focus-visible:ring-[#10B981]":
              variant === "accent-emerald",
            "border-2 border-[#e2e8f0] bg-transparent text-[#0B192C] hover:bg-[#f8fafc] hover:border-[#cbd5e1] focus-visible:ring-[#0B192C]":
              variant === "outline",
            "bg-transparent text-[#0B192C] hover:bg-[#f1f5f9] focus-visible:ring-[#0B192C]":
              variant === "ghost",
            "bg-transparent text-[#B6925B] underline-offset-4 hover:underline hover:text-[#A37F48] p-0 h-auto":
              variant === "link",
          },
          // Sizes
          {
            "h-9 px-4 text-sm": size === "sm",
            "h-11 px-6 text-base": size === "md",
            "h-13 px-8 text-lg rounded-2xl": size === "lg",
            "h-11 w-11 p-0": size === "icon",
          },
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
