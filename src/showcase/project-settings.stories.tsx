import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertTriangle, Share2, UserPlus } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Every component on one realistic page. Flip the Theme and Mode toolbars:
// the whole page should change while the components stay the same.
const meta = {
  title: "Showcase/Project settings",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const people = [
  { name: "Maya Okafor", role: "Owner", badge: <Badge variant="secondary">Owner</Badge> },
  { name: "Sam Lee", role: "Can view", badge: <Badge variant="info">Can view</Badge> },
  { name: "jo@example.com", role: "Invited", badge: <Badge variant="warning">Invite pending</Badge> },
];

function ShareDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Share2 aria-hidden /> Share project
        </Button>
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
  );
}

function InviteDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserPlus aria-hidden /> Invite people
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite people</DialogTitle>
          <DialogDescription>They'll get an email with a link to this project.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="invite-email">Email address</Label>
          <Input id="invite-email" type="email" aria-describedby="invite-email-help" />
          <p id="invite-email-help" className="text-sm text-muted-foreground">
            New people can view files. You can change that later.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Send invite</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DeleteDialog() {
  return (
    <Dialog>
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
  );
}

export const ProjectSettings: Story = {
  render: () => (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground sm:px-8">
      <div className="mx-auto grid max-w-3xl gap-8">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="grid gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl leading-tight">Spring field notes</h1>
              <Badge variant="success">Shared</Badge>
            </div>
            <p className="text-sm text-muted-foreground">14 files · Last edited Tuesday at 4:12pm</p>
          </div>
          <ShareDialog />
        </header>

        <Alert variant="warning">
          <AlertTriangle aria-hidden />
          <AlertTitle>Storage is almost full</AlertTitle>
          <AlertDescription>You've used 4.6 GB of 5 GB. New uploads will stop at 5 GB.</AlertDescription>
        </Alert>

        <Tabs defaultValue="details" className="gap-6">
          <TabsList variant="line" aria-label="Project settings">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="project-name">Project name</Label>
                  <Input id="project-name" defaultValue="Spring field notes" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-description">Description</Label>
                  <Input
                    id="project-description"
                    defaultValue="Bird counts and photos from the March survey"
                    aria-describedby="project-description-help"
                  />
                  <p id="project-description-help" className="text-sm text-muted-foreground">
                    Shown to people you share with.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="secondary">Save changes</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delete project</CardTitle>
                <CardDescription>This deletes all 14 files and removes access for everyone.</CardDescription>
              </CardHeader>
              <CardFooter className="justify-end">
                <DeleteDialog />
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="people">
            <Card>
              <CardHeader>
                <CardTitle>People with access</CardTitle>
                <CardDescription>3 people can see this project.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid">
                  {people.map((person) => (
                    <li
                      key={person.name}
                      className="flex items-center justify-between gap-4 border-t-(length:--border-width) border-border py-3 first:border-t-0 first:pt-0"
                    >
                      <span className="text-sm">{person.name}</span>
                      {person.badge}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="justify-end">
                <InviteDialog />
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Email notifications</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="notify-uploads">Email me when someone uploads a file</Label>
                  <Switch id="notify-uploads" defaultChecked />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="notify-weekly">Send a weekly summary</Label>
                  <Switch id="notify-weekly" />
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="notify-previews" />
                  <Label htmlFor="notify-previews">Include file previews in emails</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  ),
};
