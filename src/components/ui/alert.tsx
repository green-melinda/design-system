import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Status alerts are tinted like badges: pale fill, status-colored border and
// icon, text in the foreground color. Status-colored text fails contrast on
// some pale fills, so color stays in the border and icon.
const alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-1 rounded-lg border-(length:--border-width) px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-card-foreground [&>svg]:text-current",
        info: "border-info bg-info-subtle text-foreground [&>svg]:text-info",
        success: "border-success bg-success-subtle text-foreground [&>svg]:text-success",
        warning: "border-warning bg-warning-subtle text-foreground [&>svg]:text-warning",
        destructive: "border-destructive bg-destructive-subtle text-foreground [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Only errors interrupt a screen reader. Everything else is announced
// politely. Pass role yourself to override.
function Alert({
  className,
  variant = "default",
  role,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      role={role ?? (variant === "destructive" ? "alert" : "status")}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn("col-start-2 min-h-4 font-medium tracking-tight", className)}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
