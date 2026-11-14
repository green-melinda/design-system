import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  args: { defaultValue: "overview" },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const panels = (
  <>
    <TabsContent value="overview" className="text-sm">Three files changed this week. The last edit was Tuesday at 4:12pm.</TabsContent>
    <TabsContent value="activity" className="text-sm">Sam uploaded two files and renamed one folder.</TabsContent>
    <TabsContent value="settings" className="text-sm">Only people you invite can see this project.</TabsContent>
  </>
);

export const Segmented: Story = {
  render: (args) => (
    <Tabs {...args} className="max-w-md">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      {panels}
    </Tabs>
  ),
};

export const Line: Story = {
  render: (args) => (
    <Tabs {...args} className="max-w-md">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      {panels}
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: (args) => (
    <Tabs {...args} className="max-w-md">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings" disabled>Settings</TabsTrigger>
      </TabsList>
      {panels}
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <Tabs {...args} orientation="vertical" className="max-w-md">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      {panels}
    </Tabs>
  ),
};

export const ArrowKeysMoveBetweenTabs: Story = {
  render: Segmented.render,
  play: async ({ canvas }) => {
    const overview = canvas.getByRole("tab", { name: "Overview" });
    await userEvent.click(overview);
    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("tab", { name: "Activity" })).toHaveAttribute("data-state", "active");
  },
};
