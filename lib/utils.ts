import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Merge Tailwind class names safely
export function cn(...inputs: Array<string | undefined | null | false>) {
  return twMerge(clsx(inputs))
}
