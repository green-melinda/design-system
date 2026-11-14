import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { Label } from "./label";
import { Switch } from "./switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  args: { id: "notifications", defaultChecked: true, size: "default" },
  argTypes: {
    size: { control: "select", options: ["default", "sm"] },
    disabled: { control: "boolean" },
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch {...args} />
      <Label htmlFor={args.id}>Notifications</Label>
    </div>
  ),
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {};

export const Off: Story = {
  args: { defaultChecked: false },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ClickingTurnsItOff: Story = {
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole("switch");
    await expect(toggle).toBeChecked();
    await userEvent.click(toggle);
    await expect(toggle).not.toBeChecked();
  },
};
