import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

// Two looks:
// - segmented (default): muted track, active tab is a background-colored chip.
//   Track 36px with 4px padding, so triggers are 28px.
// - line: tabs over a border rule, active tab underlined in the primary color.

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn("group/tabs flex gap-4 data-[orientation=horizontal]:flex-col", className)}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center text-foreground group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col group-data-[orientation=vertical]/tabs:items-stretch",
  {
    variants: {
      variant: {
        segmented: "rounded-lg bg-muted p-1 group-data-[orientation=horizontal]/tabs:h-9",
        line: "gap-4 group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=horizontal]/tabs:border-b-(length:--border-width) group-data-[orientation=horizontal]/tabs:border-border group-data-[orientation=vertical]/tabs:gap-1 group-data-[orientation=vertical]/tabs:border-r-(length:--border-width) group-data-[orientation=vertical]/tabs:border-border",
      },
    },
    defaultVariants: {
      variant: "segmented",
    },
  }
)

function TabsList({
  className,
  variant = "segmented",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // Shared
        "relative inline-flex h-full items-center justify-center gap-2 text-sm font-medium whitespace-nowrap outline-none",
        "text-foreground/70 hover:text-foreground data-[state=active]:text-foreground",
        "transition-[color,background-color,box-shadow] duration-(--duration-fast) ease-out",
        "focus-visible:ring-(length:--ring-width) focus-visible:ring-ring focus-visible:ring-offset-(length:--ring-offset)",
        "disabled:pointer-events-none disabled:opacity-(--disabled-opacity)",
        "group-data-[orientation=vertical]/tabs:justify-start",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Segmented
        "group-data-[variant=segmented]/tabs-list:flex-1 group-data-[variant=segmented]/tabs-list:rounded-md group-data-[variant=segmented]/tabs-list:px-3",
        "group-data-[variant=segmented]/tabs-list:group-data-[orientation=vertical]/tabs:h-7",
        "group-data-[variant=segmented]/tabs-list:data-[state=active]:bg-background group-data-[variant=segmented]/tabs-list:data-[state=active]:shadow-xs",
        // Line: a 2px primary bar sits on top of the list's border rule
        "group-data-[variant=line]/tabs-list:px-0 group-data-[variant=line]/tabs-list:group-data-[orientation=vertical]/tabs:h-8 group-data-[variant=line]/tabs-list:group-data-[orientation=vertical]/tabs:pr-4",
        "after:absolute after:bg-primary after:opacity-0 after:transition-opacity after:duration-(--duration-fast)",
        "group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:-bottom-px group-data-[orientation=horizontal]/tabs:after:h-0.5",
        "group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-px group-data-[orientation=vertical]/tabs:after:w-0.5",
        "group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
