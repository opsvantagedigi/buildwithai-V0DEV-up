import * as React from "react"
import { cn } from "@/lib/utils"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = "button", size: _size, ...props }, ref) => {
    return (
      <button
        type={type}
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-black shadow transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    )
  },
)

Button.displayName = "Button"
