import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// Badges are labels, so they read the label slots: themes decide whether
// they're uppercase and how wide the letter spacing is.
// Fixed 20px height keeps them on the 4pt grid.
const badgeVariants = cva(
  "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-sm border-(length:--border-width) border-transparent px-2 text-xs font-medium whitespace-nowrap [text-transform:var(--label-case)] tracking-label transition-[color,background-color,box-shadow] duration-(--duration-fast) ease-out focus-visible:ring-(length:--ring-width) focus-visible:ring-ring focus-visible:ring-offset-(length:--ring-offset) outline-none [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary-hover",
        secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary-hover",
        outline: "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        info: "bg-info text-info-foreground",
        destructive: "bg-destructive text-destructive-foreground [a&]:hover:bg-destructive-hover",
      },
      // Tinted: pale fill and a status-colored border, with text in the
      // foreground color. Status-colored text fails contrast on some pale
      // fills (orange on pale orange is 3.89:1), so the color stays out of the text.
      appearance: {
        solid: "",
        tinted: "",
      },
    },
    compoundVariants: [
      { appearance: "tinted", variant: "success", className: "border-success bg-success-subtle text-foreground" },
      { appearance: "tinted", variant: "warning", className: "border-warning bg-warning-subtle text-foreground" },
      { appearance: "tinted", variant: "info", className: "border-info bg-info-subtle text-foreground" },
      { appearance: "tinted", variant: "destructive", className: "border-destructive bg-destructive-subtle text-foreground" },
    ],
    defaultVariants: {
      variant: "default",
      appearance: "solid",
    },
  }
)

function Badge({
  className,
  variant = "default",
  appearance = "solid",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-appearance={appearance}
      className={cn(badgeVariants({ variant, appearance }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
