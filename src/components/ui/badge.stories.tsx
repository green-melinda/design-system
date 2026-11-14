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

export const AsLink: Story = {
  render: () => (
    <Badge asChild>
      <a href="#tags">Design systems</a>
    </Badge>
  ),
};
