import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border-(length:--border-width) border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,border-color,box-shadow] duration-(--duration-fast) ease-out outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-(--disabled-opacity) md:text-sm",
        "focus-visible:ring-(length:--ring-width) focus-visible:ring-ring focus-visible:ring-offset-(length:--ring-offset)",
        "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
