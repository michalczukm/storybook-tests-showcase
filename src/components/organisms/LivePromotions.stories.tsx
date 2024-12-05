import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { LivePromotions } from "./LivePromotions";
import { promotionsHandler } from "../../data/msw";

const meta = {
  component: LivePromotions,
  args: {
    state: "ongoing",
  },
  parameters: {
    layout: "centered",
    msw: {
      handlers: [promotionsHandler()],
    },
  },
} satisfies Meta<typeof LivePromotions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for promotions to load
    const summerSale = await canvas.findByText("Summer Sale");
    await expect(summerSale).toBeInTheDocument();
    
    const flashSale = await canvas.findByText("Flash Sale");
    await expect(flashSale).toBeInTheDocument();
  },
};

export const UpcomingState: Story = {
  args: {
    state: "upcoming",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const winterSale = await canvas.findByText("Winter Sale");
    await expect(winterSale).toBeInTheDocument();
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [promotionsHandler({ delay: 2000 })],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const skeletons = canvas.getAllByRole("generic").filter((el) =>
      el.className.includes("animate-pulse"),
    );
    expect(skeletons).toHaveLength(2);
  },
};

export const ErrorState: Story = {
  parameters: {
    msw: {
      handlers: [promotionsHandler({ status: 500 })],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const errorMessage = await canvas.findByText(/Error loading promotions/);
    await expect(errorMessage).toBeInTheDocument();
  },
}; 