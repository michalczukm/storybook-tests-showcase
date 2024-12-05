import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { Badge } from "./Badge";

const meta = {
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "warning", "error", "info"],
    },
    size: {
      control: "radio",
      options: ["sm", "md"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    variant: "success",
    children: "In Stock",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Low Stock",
  },
};

export const ErrorState: Story = {
  args: {
    variant: "error",
    children: "Out of Stock",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "New Arrival",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Sale",
  },
};

export const WithLongText: Story = {
  args: {
    children: "Limited Time Offer",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Limited Time Offer");
    await expect(badge).toBeVisible();
  },
};
