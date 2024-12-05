import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, waitFor, within } from "@storybook/test";
import { ReviewForm } from "./ReviewForm";

const meta = {
  title: "Molecules/ReviewForm",
  component: ReviewForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ReviewForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
};

export const WithInitialRating: Story = {
  args: {
    onSubmit: fn(),
    initialRating: 4,
  },
};

export const WithValidation: Story = {
  args: {
    onSubmit: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitButton = canvas.getByText("Submit Review");

    // Try to submit empty form
    await userEvent.click(submitButton);

    // Check for validation messages
    const errors = await canvas.findAllByTestId("input-error");
    await expect(errors).toHaveLength(4);
  },
};

export const WithInteraction: Story = {
  args: {
    onSubmit: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Set rating
    const stars = canvas.getAllByRole("button").slice(0, 5);
    await userEvent.click(stars[3]); // 4-star rating

    // Fill in title
    const titleInput = canvas.getByPlaceholderText(/Summarize/);
    await userEvent.type(titleInput, "Great Product!");

    // Fill in review
    const commentInput = canvas.getByPlaceholderText(/Share your experience/);
    await userEvent.type(
      commentInput,
      "This product exceeded my expectations.",
    );

    // Fill in name
    const nameInput = canvas.getByPlaceholderText(/Enter your name/);
    await userEvent.type(nameInput, "John Doe");

    // Submit form
    const submitButton = canvas.getByText("Submit Review");
    await userEvent.click(submitButton);

    // Verify submission
    await expect(args.onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        rating: 4,
        title: "Great Product!",
        comment: "This product exceeded my expectations.",
        name: "John Doe",
      }),
    );

    // Verify form reset
    await waitFor(() => expect(titleInput).toHaveValue(""));
    await waitFor(() => expect(commentInput).toHaveValue(""));
    await waitFor(() => expect(nameInput).toHaveValue(""));
  },
};
