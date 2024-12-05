import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { ProductStack } from "./ProductStack";
import { productsHandler } from "../../data/msw";

const meta = {
  component: ProductStack,
  parameters: {
    layout: "padded",
    msw: {
      handlers: [productsHandler()],
    },
  },
} satisfies Meta<typeof ProductStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onAddToCart: fn(),
    onRatingChange: fn(),
  },
};

export const WithInteractions: Story = {
  args: {
    onAddToCart: fn(),
    onRatingChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Test price filter
    const minInput = canvas.getByLabelText(/Minimum/i);
    const maxInput = canvas.getByLabelText(/Maximum/i);
    const applyButton = canvas.getByText("Apply");

    await userEvent.type(minInput, "50");
    await userEvent.type(maxInput, "200");
    await userEvent.click(applyButton);

    // Test sort selector
    const sortSelect = canvas.getByRole("combobox");
    await userEvent.selectOptions(sortSelect, "price-desc");

    // Test product interaction
    const addToCartButton = canvas.getAllByText("Add to Cart")[0];
    await userEvent.click(addToCartButton);
    await expect(args.onAddToCart).toHaveBeenCalled();

    // Test rating interaction
    const stars = canvas.getAllByRole("button").slice(0, 5);
    await userEvent.click(stars[4]); // 5-star rating
    await expect(args.onRatingChange).toHaveBeenCalled();
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [productsHandler({ delay: 2000, status: 200 })],
    },
  },
  args: {
    onAddToCart: fn(),
    onRatingChange: fn(),
  },
};

export const ErrorState: Story = {
  parameters: {
    msw: {
      handlers: [productsHandler({ status: 500 })],
    },
  },
  args: {
    onAddToCart: fn(),
    onRatingChange: fn(),
  },
};
