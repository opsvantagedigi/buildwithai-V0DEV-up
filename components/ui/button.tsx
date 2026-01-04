import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: string;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = "button", size: _size, ...props }, ref) => {
    return (
      <button
        type={type}
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-linear-to-r from-[#4f7cff] via-[#2ee6a6] to-[#ffd166] px-5 py-2.5 text-sm font-medium text-black shadow-[0_0_22px_rgba(79,124,255,0.6)] transition duration-300 hover:shadow-[0_0_30px_rgba(79,124,255,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f7cff] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
