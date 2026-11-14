import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertTriangle, CheckCircle2, CircleX, Info } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  argTypes: {
    variant: { control: "select", options: ["default", "info", "success", "warning", "destructive"] },
  },
  args: { variant: "info" },
  render: (args) => (
    <Alert {...args} className="max-w-xl">
      <Info aria-hidden />
      <AlertTitle>Scheduled maintenance on Sunday</AlertTitle>
      <AlertDescription>Uploads will pause from 2am to 4am Eastern. Files you already uploaded stay available.</AlertDescription>
    </Alert>
  ),
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="grid max-w-xl gap-4">
      <Alert variant="info">
        <Info aria-hidden />
        <AlertTitle>Scheduled maintenance on Sunday</AlertTitle>
        <AlertDescription>Uploads will pause from 2am to 4am Eastern.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CheckCircle2 aria-hidden />
        <AlertTitle>Project published</AlertTitle>
        <AlertDescription>Anyone with the link can view it now.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTriangle aria-hidden />
        <AlertTitle>Storage is almost full</AlertTitle>
        <AlertDescription>You've used 4.6 GB of 5 GB. New uploads will stop at 5 GB.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleX aria-hidden />
        <AlertTitle>Upload failed</AlertTitle>
        <AlertDescription>The file is larger than 2 GB. Compress it or split it into parts, then try again.</AlertDescription>
      </Alert>
      <Alert>
        <Info aria-hidden />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>A neutral note with no status.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <Alert variant="success" className="max-w-xl">
      <CheckCircle2 aria-hidden />
      <AlertTitle>Changes saved</AlertTitle>
    </Alert>
  ),
};

export const LongTitleWraps: Story = {
  render: () => (
    <Alert variant="warning" className="max-w-sm">
      <AlertTriangle aria-hidden />
      <AlertTitle>Two people are editing this file, so your changes might overwrite theirs</AlertTitle>
      <AlertDescription>Save a copy first if you're not sure.</AlertDescription>
    </Alert>
  ),
};
