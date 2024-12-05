import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { SearchBar } from "./SearchBar";

const meta = {
  title: "Molecules/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    onSearch: fn(),
  },
};

export const WithValue: Story = {
  args: {
    value: "Gaming keyboard",
    onSearch: fn(),
  },
};

export const WithInteraction: Story = {
  args: {
    value: "",
    onSearch: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    const searchButton = canvas.getByRole("button");

    await userEvent.type(input, "mechanical keyboard");
    await expect(input).toHaveValue("mechanical keyboard");
    await userEvent.click(searchButton);
    
    await expect(args.onSearch).toHaveBeenCalledWith(
      "mechanical keyboard",
    );

    await userEvent.click(searchButton);
    await expect(args.onSearch).toHaveBeenCalled();
  },
};
