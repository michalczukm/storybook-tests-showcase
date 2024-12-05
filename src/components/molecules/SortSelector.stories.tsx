import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { SortSelector } from "./SortSelector";
import { useCallback, useState } from "react";

const meta = {
  title: "Molecules/SortSelector",
  component: SortSelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SortSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "rating-desc", label: "Rating: High to Low" },
];

export const Default: Story = {
  args: {
    value: "price-asc",
    onChange: fn(),
    options: mockOptions,
  },
};

export const WithCustomLabel: Story = {
  args: {
    value: "rating-desc",
    onChange: fn(),
    options: mockOptions,
    label: "Order by",
  },
};

const TestComponent = (args: React.ComponentProps<typeof SortSelector>) => {
  const [value, setValue] = useState(args.value);

  const onChange = useCallback(
    (value: string) => {
      setValue(value);
      args.onChange(value);
    },
    [args],
  );

  return <SortSelector {...args} value={value} onChange={onChange} />;
};

export const WithInteraction: Story = {
  args: {
    value: "price-asc",
    onChange: fn(),
    options: mockOptions,
  },
  render: (args) => <TestComponent {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");

    // Change selection to "Price: High to Low"
    await userEvent.selectOptions(select, "price-desc");
    await expect(args.onChange).toHaveBeenCalledWith("price-desc");

    // Verify the selected option
    const selectedOption = canvas.getByRole("option", {
      name: "Price: High to Low",
      selected: true,
    });
    await expect(selectedOption).toBeInTheDocument();
  },
};
