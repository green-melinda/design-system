import type { Meta, StoryObj } from "@storybook/react-vite";

// Every color slot, grouped the way token-inventory.md groups them.
// Switch the Theme and Mode toolbars to check a theme fills every slot.
const groups: { name: string; slots: string[] }[] = [
  { name: "Surfaces", slots: ["background", "card", "popover", "muted", "secondary", "accent", "overlay"] },
  { name: "Text", slots: ["foreground", "card-foreground", "popover-foreground", "muted-foreground", "secondary-foreground", "accent-foreground"] },
  { name: "Action", slots: ["primary", "primary-foreground", "primary-hover", "secondary-hover", "link", "link-hover"] },
  {
    name: "Feedback",
    slots: [
      "destructive", "destructive-foreground", "destructive-hover", "destructive-subtle",
      "success", "success-foreground", "success-subtle",
      "warning", "warning-foreground", "warning-subtle",
      "info", "info-foreground", "info-subtle",
    ],
  },
  { name: "Lines", slots: ["border", "input", "ring"] },
  { name: "Data", slots: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"] },
  {
    name: "Sidebar",
    slots: [
      "sidebar", "sidebar-foreground", "sidebar-primary", "sidebar-primary-foreground",
      "sidebar-accent", "sidebar-accent-foreground", "sidebar-border", "sidebar-ring",
    ],
  },
];

function Swatch({ slot }: { slot: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="size-10 shrink-0 rounded-md border border-border"
        style={{ background: `var(--${slot})` }}
      />
      <code className="font-mono text-sm">--{slot}</code>
    </div>
  );
}

function ColorSlots() {
  return (
    <div className="grid gap-8">
      {groups.map((group) => (
        <section key={group.name} className="grid gap-3">
          <h2 className="text-lg">{group.name}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.slots.map((slot) => (
              <Swatch key={slot} slot={slot} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

const meta = {
  title: "Foundations/Color slots",
  component: ColorSlots,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ColorSlots>;

export default meta;
export const AllSlots: StoryObj<typeof meta> = {};
