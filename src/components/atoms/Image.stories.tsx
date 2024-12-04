import type { Meta, StoryObj } from "@storybook/react";
import { expect, waitFor, within } from "@storybook/test";
import { Image } from "./Image";

const meta = {
  title: "Atoms/Image",
  component: Image,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    aspectRatio: {
      control: "select",
      options: ["1:1", "4:3", "16:9"],
    },
    fit: {
      control: "radio",
      options: ["cover", "contain"],
    },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://picsum.photos/300/300",
    alt: "Random image",
  },
};

export const WithAspectRatio4x3: Story = {
  args: {
    src: "https://picsum.photos/400/300",
    alt: "4:3 image",
    aspectRatio: "4:3",
  },
};

export const WithAspectRatio16x9: Story = {
  args: {
    src: "https://picsum.photos/500/281",
    alt: "16:9 image",
    aspectRatio: "16:9",
  },
};

export const WithFallback: Story = {
  args: {
    src: "invalid-url",
    alt: "Invalid image",
    fallback: "https://via.placeholder.com/150?text=Fallback",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByRole("img") as HTMLImageElement;

    await waitFor(() => {
      expect(img.src).toContain("placeholder");
    });
  },
};
