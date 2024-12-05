import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { Rating } from "./Rating";
import { useCallback, useState } from 'react';

const meta = {
  component: Rating,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "number", min: 0, max: 5, step: 0.5 },
    },
    readonly: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 3.5,
  },
};

export const ReadOnly: Story = {
  args: {
    value: 4,
    readonly: true,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const FullScore: Story = {
  args: {
    value: 5,
  },
};

const TestComponent = (args: Story["args"]) => {
  const [value, setValue] = useState(args.value);

  const onChange = useCallback((value: number) => {
    args.onChange?.(value);
    setValue(value);
  }, [args]);

  return <Rating {...args} value={value} onChange={onChange} />;
};

export const Interactive: Story = {
  args: {
    value: 0,
  },
  render: TestComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const stars = canvas.getAllByRole("button");

    // Click the third star
    await userEvent.click(stars[2]);

    // Verify the first three stars are filled
    const filledStars = canvas
      .getAllByRole("button")
      .filter((star) => star.getAttribute("data-star"));

    expect(filledStars).toHaveLength(3);
  },
};
