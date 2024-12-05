import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { mockProducts } from "../../data/mockData";
import { ProductCard } from "./ProductCard";

const meta = {
  title: "Molecules/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProduct = mockProducts[0];

export const Default: Story = {
  args: {
    product: mockProduct,
    onAddToCart: fn(),
  },
};

export const OutOfStock: Story = {
  args: {
    product: {
      ...mockProduct,
      stock: 0,
    },
    onAddToCart: fn(),
  },
};

export const LowStock: Story = {
  args: {
    product: {
      ...mockProduct,
      stock: 3,
    },
    onAddToCart: fn(),
  },
};

export const WithRatingInteraction: Story = {
  args: {
    product: mockProduct,
    onAddToCart: fn(),
    onRatingChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const stars = canvas.getAllByRole("button").slice(0, 5); // Get only rating buttons

    // Click the fourth star
    await userEvent.click(stars[3]);

    // Verify the first four stars are filled
    const filledStars = stars.slice(0, 4);
    for (const star of filledStars) {
      expect(star.querySelector("svg")).toHaveClass("text-yellow-400");
    }
  },
};

export const AddToCartInteraction: Story = {
  args: {
    product: mockProduct,
    onAddToCart: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addToCartButton = canvas.getByText("Add to Cart");

    await userEvent.hover(addToCartButton);
    await expect(addToCartButton).toHaveClass("hover:bg-blue-700");

    await userEvent.click(addToCartButton);
  },
};
