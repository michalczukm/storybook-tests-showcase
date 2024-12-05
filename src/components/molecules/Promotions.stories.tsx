import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, within } from "@storybook/test";
import { Promotions } from "./Promotions";

const meta = {
  component: Promotions,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Promotions>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockPromotions = [
  {
    id: "1",
    title: "Summer Sale",
    description: "Get amazing discounts on summer collection",
    discount: 20,
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
  },
  {
    id: "2",
    title: "Flash Sale",
    description: "Limited time offer on selected items",
    discount: 30,
    endDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
  },
];

export const Default: Story = {
  args: {
    promotions: mockPromotions,
    onPromotionExpired: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const promotionTitle = canvas.queryByText("Promotion expired");
    await expect(promotionTitle).not.toBeInTheDocument();
  },
};

export const SinglePromotion: Story = {
  args: {
    promotions: [mockPromotions[0]],
    onPromotionExpired: fn(),
  },
};

export const ExpiredPromotion: Story = {
  args: {
    promotions: [
      {
        ...mockPromotions[0],
        endDate: new Date(Date.now() - 1000), // Already expired
      },
    ],
    onPromotionExpired: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // Verify that the promotion is not visible
    const promotionTitle = canvas.queryByText("Promotion expired");
    await expect(promotionTitle).toBeInTheDocument();

    // Verify that onPromotionExpired was called
    await expect(args.onPromotionExpired).toHaveBeenCalledWith("1");
  },
};

export const WithLongContent: Story = {
  args: {
    promotions: [
      {
        ...mockPromotions[0],
        title: "Super Extra Long Summer Sale Title That Might Wrap",
        description:
          "This is a very long description that contains a lot of text to test how the component handles long content and whether it wraps properly or truncates at some point.",
      },
    ],
    onPromotionExpired: fn(),
  },
};