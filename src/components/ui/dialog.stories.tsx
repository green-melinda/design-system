import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor } from "storybook/test";

import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Share project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this project</DialogTitle>
          <DialogDescription>
            Anyone with the link can view the files. They can't edit or delete anything.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Copy link</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Rename project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          <DialogDescription>The new name shows up everywhere the project is shared.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="project-name">Project name</Label>
          <Input id="project-name" defaultValue="Spring field notes" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Save name</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Say exactly what goes away, and name the button after the action, not "OK".
export const ConfirmDelete: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete "Spring field notes"?</DialogTitle>
          <DialogDescription>
            This deletes 14 files and removes access for 3 people. You can't undo it.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Keep project</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive">Delete project</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Tall content scrolls inside the dialog instead of running off the screen.
export const LongContent: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Read the terms</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sharing terms</DialogTitle>
          <DialogDescription>What happens to files you share.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 text-sm">
          {Array.from({ length: 12 }, (_, i) => (
            <p key={i}>
              Section {i + 1}. Shared files stay yours. People you share with can view and download them
              until you remove their access or delete the files.
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Focus moves into the dialog on open, and back to the trigger on Escape.
export const FocusMovesInAndBack: Story = {
  render: Default.render,
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole("button", { name: "Share project" });
    await userEvent.click(trigger);
    const dialog = await screen.findByRole("dialog", { name: "Share this project" });
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};
