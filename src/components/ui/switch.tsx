import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

// Track and thumb sit on the 4pt grid. The 2px transparent border insets the
// thumb; borders are exempt from the grid, padding is not.
// Default: track 36 x 20, thumb 16. Small: track 28 x 16, thumb 12.
function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch inline-flex shrink-0 items-center rounded-full border-2 border-transparent shadow-xs transition-[background-color,box-shadow] duration-(--duration-fast) ease-out outline-none",
        "focus-visible:ring-(length:--ring-width) focus-visible:ring-ring focus-visible:ring-offset-(length:--ring-offset)",
        "disabled:cursor-not-allowed disabled:opacity-(--disabled-opacity)",
        "data-[size=default]:h-5 data-[size=default]:w-9 data-[size=sm]:h-4 data-[size=sm]:w-7",
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full transition-transform duration-(--duration-fast) ease-out",
          "group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3",
          "data-[state=unchecked]:translate-x-0 group-data-[size=default]/switch:data-[state=checked]:translate-x-4 group-data-[size=sm]/switch:data-[state=checked]:translate-x-3",
          // Off: page color on the field-border track. On: label color on the primary track.
          // Never the text color: in some themes it matches --input and the thumb vanishes.
          "data-[state=unchecked]:bg-background data-[state=checked]:bg-primary-foreground"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
