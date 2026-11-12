import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Trash2 } from "lucide-react";

import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "Save changes" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "destructive", "link"],
    },
    size: { control: "select", options: ["xs", "sm", "default", "lg"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Save changes</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="outline">Export CSV</Button>
      <Button variant="ghost">Skip for now</Button>
      <Button variant="destructive">
        <Trash2 aria-hidden /> Delete file
      </Button>
      <Button variant="link">View version history</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        Continue <ArrowRight aria-hidden />
      </>
    ),
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};
