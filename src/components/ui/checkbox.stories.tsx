import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  args: { id: "updates", defaultChecked: true },
  argTypes: { disabled: { control: "boolean" } },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <Label htmlFor={args.id}>Email me about product updates</Label>
    </div>
  ),
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {};

export const Off: Story = {
  args: { defaultChecked: false },
};

export const WithDescription: Story = {
  args: { id: "backups" },
  render: (args) => (
    <div className="flex items-start gap-2">
      <Checkbox {...args} aria-describedby="backups-help" />
      <div className="grid gap-1">
        <Label htmlFor="backups">Back up files every night</Label>
        <p id="backups-help" className="text-sm text-muted-foreground">
          Copies run at 2am and keep the last 30 days.
        </p>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ClickingTogglesIt: Story = {
  play: async ({ canvas }) => {
    const box = canvas.getByRole("checkbox");
    await expect(box).toBeChecked();
    await userEvent.click(box);
    await expect(box).not.toBeChecked();
  },
};
