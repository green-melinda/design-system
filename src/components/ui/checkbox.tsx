import * as React from "react"
import { CheckIcon } from "lucide-react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-sm border-(length:--border-width) border-input shadow-xs transition-[background-color,border-color,box-shadow] duration-(--duration-fast) ease-out outline-none",
        "focus-visible:ring-(length:--ring-width) focus-visible:ring-ring focus-visible:ring-offset-(length:--ring-offset)",
        "disabled:cursor-not-allowed disabled:opacity-(--disabled-opacity)",
        "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
