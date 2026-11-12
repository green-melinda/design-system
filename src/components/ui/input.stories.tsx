import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { Input } from "./input";
import { Label } from "./label";

const meta = {
  title: "Components/Input",
  component: Input,
  args: { id: "display-name", type: "text" },
  argTypes: {
    type: { control: "select", options: ["text", "email", "password", "number", "search", "file"] },
    disabled: { control: "boolean" },
  },
  render: (args) => (
    <div className="grid max-w-80 gap-2">
      <Label htmlFor={args.id}>Display name</Label>
      <Input {...args} />
    </div>
  ),
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: { defaultValue: "Sam Rivera" },
};

export const WithHelperText: Story = {
  args: { id: "email", type: "email" },
  render: (args) => (
    <div className="grid max-w-80 gap-2">
      <Label htmlFor="email">Email address</Label>
      <Input {...args} aria-describedby="email-help" />
      <p id="email-help" className="text-sm text-muted-foreground">
        Used for sign-in and receipts. Never shown to other people.
      </p>
    </div>
  ),
};

export const Invalid: Story = {
  args: { id: "email-invalid", type: "email", defaultValue: "sam.rivera" },
  render: (args) => (
    <div className="grid max-w-80 gap-2">
      <Label htmlFor="email-invalid">Email address</Label>
      <Input {...args} aria-invalid aria-describedby="email-error" />
      <p id="email-error" className="text-sm text-destructive">
        Enter an email address with an @, like name@example.com.
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Sam Rivera" },
};

export const File: Story = {
  args: { id: "upload", type: "file" },
  render: (args) => (
    <div className="grid max-w-80 gap-2">
      <Label htmlFor="upload">Profile photo</Label>
      <Input {...args} />
    </div>
  ),
};

export const TypingUpdatesTheValue: Story = {
  play: async ({ canvas }) => {
    const field = canvas.getByLabelText("Display name");
    await userEvent.type(field, "Sam Rivera");
    await expect(field).toHaveValue("Sam Rivera");
  },
};
