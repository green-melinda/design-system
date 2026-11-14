import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertTriangle, Check, Info, X } from "lucide-react";

import { Badge } from "./badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  args: { children: "Draft", variant: "default" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "success", "warning", "info", "destructive"],
    },
    appearance: { control: "inline-radio", options: ["solid", "tinted"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>New</Badge>
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="outline">Archived</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Expires soon</Badge>
      <Badge variant="info">Beta</Badge>
      <Badge variant="destructive">Failed</Badge>
    </div>
  ),
};

// Pair status color with an icon and a word, so the meaning never rests on color alone.
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success"><Check aria-hidden /> Published</Badge>
      <Badge variant="warning"><AlertTriangle aria-hidden /> Needs review</Badge>
      <Badge variant="info"><Info aria-hidden /> Shared</Badge>
      <Badge variant="destructive"><X aria-hidden /> Upload failed</Badge>
    </div>
  ),
};

// Side by side, to choose a default. Tinted only changes the four status colors.
export const SolidVsTinted: Story = {
  render: () => (
    <div className="grid gap-4">
      {(["solid", "tinted"] as const).map((appearance) => (
        <div key={appearance} className="grid gap-2">
          <p className="text-sm text-muted-foreground">{appearance === "solid" ? "Solid" : "Tinted"}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge appearance={appearance} variant="success"><Check aria-hidden /> Published</Badge>
            <Badge appearance={appearance} variant="warning"><AlertTriangle aria-hidden /> Needs review</Badge>
            <Badge appearance={appearance} variant="info"><Info aria-hidden /> Shared</Badge>
            <Badge appearance={appearance} variant="destructive"><X aria-hidden /> Upload failed</Badge>
          </div>
        </div>
      ))}
    </div>
  ),
};

// Text only. Still accessible: the word carries the meaning, color backs it up.
export const WithoutIcons: Story = {
  render: () => (
    <div className="grid gap-4">
      {(["tinted", "solid"] as const).map((appearance) => (
        <div key={appearance} className="grid gap-2">
          <p className="text-sm text-muted-foreground">{appearance === "tinted" ? "Tinted (default)" : "Solid"}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge appearance={appearance} variant="success">Published</Badge>
            <Badge appearance={appearance} variant="warning">Needs review</Badge>
            <Badge appearance={appearance} variant="info">Shared</Badge>
            <Badge appearance={appearance} variant="destructive">Upload failed</Badge>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Heights: Story = {
  render: () => (
    <div className="grid gap-4">
      {(["sm", "md"] as const).map((size) => (
        <div key={size} className="grid gap-2">
          <p className="text-sm text-muted-foreground">{size === "sm" ? "20px" : "24px"}</p>
          {(["solid", "tinted"] as const).map((appearance) => (
            <div key={appearance} className="flex flex-wrap items-center gap-2">
              <Badge size={size} appearance={appearance} variant="success"><Check aria-hidden /> Published</Badge>
              <Badge size={size} appearance={appearance} variant="warning"><AlertTriangle aria-hidden /> Needs review</Badge>
              <Badge size={size} appearance={appearance} variant="info"><Info aria-hidden /> Shared</Badge>
              <Badge size={size} appearance={appearance} variant="destructive"><X aria-hidden /> Upload failed</Badge>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const AsLink: Story = {
  render: () => (
    <Badge asChild>
      <a href="#tags">Design systems</a>
    </Badge>
  ),
};
