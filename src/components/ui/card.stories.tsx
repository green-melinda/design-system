import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Input } from "./input";
import { Label } from "./label";
import { Switch } from "./switch";

const meta = {
  title: "Components/Card",
  component: Card,
  render: (args) => (
    <Card {...args} className="max-w-96">
      <CardHeader>
        <CardTitle>Storage</CardTitle>
        <CardDescription>3.2 GB of 5 GB used</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Files in the trash still count toward your storage until you empty it.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button>Upgrade storage</Button>
        <Button variant="outline">Empty trash</Button>
      </CardFooter>
    </Card>
  ),
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHeaderAction: Story = {
  render: (args) => (
    <Card {...args} className="max-w-96">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Shown on everything you publish.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">Edit</Button>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-1 text-sm">
        <p className="font-medium">Sam Rivera</p>
        <p className="text-muted-foreground">sam.rivera@example.com</p>
      </CardContent>
    </Card>
  ),
};

export const Settings: Story = {
  render: (args) => (
    <Card {...args} className="max-w-96">
      <CardHeader className="border-b">
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what you hear about by email.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {[
          { id: "comments", label: "Comments on your files", on: true },
          { id: "shares", label: "Files shared with you", on: true },
          { id: "digest", label: "Weekly summary", on: false },
        ].map((row) => (
          <div key={row.id} className="flex items-center justify-between gap-4">
            <Label htmlFor={row.id}>{row.label}</Label>
            <Switch id={row.id} defaultChecked={row.on} />
          </div>
        ))}
      </CardContent>
    </Card>
  ),
};

export const Form: Story = {
  render: (args) => (
    <Card {...args} className="max-w-96">
      <CardHeader>
        <CardTitle>New project</CardTitle>
        <CardDescription>You can rename it later.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="project-name">Project name</Label>
          <Input id="project-name" defaultValue="Spring launch" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="project-owner">Owner's email</Label>
          <Input id="project-owner" type="email" aria-describedby="owner-help" />
          <p id="owner-help" className="text-sm text-muted-foreground">
            They'll get an invite to join.
          </p>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2 border-t">
        <Button variant="outline">Cancel</Button>
        <Button>Create project</Button>
      </CardFooter>
    </Card>
  ),
};
