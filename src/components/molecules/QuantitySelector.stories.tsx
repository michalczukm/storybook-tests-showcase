import type { Meta, StoryObj } from '@storybook/react';
import { QuantitySelector } from './QuantitySelector';
import { userEvent, within, expect, fn } from '@storybook/test';

const meta = {
  title: 'Molecules/QuantitySelector',
  component: QuantitySelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
  },
} satisfies Meta<typeof QuantitySelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1,
    onChange: fn(),
    min: 0,
    max: 10,
  },
};

export const WithLimits: Story = {
  args: {
    value: 1,
    onChange: fn(),
    min: 1,
    max: 5,
  },
};

export const Disabled: Story = {
  args: {
    value: 1,
    onChange: fn(),
    disabled: true,
  },
};

export const WithInteractions: Story = {
  args: {
    value: 1,
    onChange: fn(),
    min: 0,
    max: 5,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const [decreaseBtn, increaseBtn] = canvas.getAllByRole('button');
    const input = canvas.getByRole('spinbutton');

    // Test increase
    await userEvent.click(increaseBtn);
    await expect(args.onChange).toHaveBeenCalledWith(2);

    // Test decrease
    await userEvent.click(decreaseBtn);
    await expect(args.onChange).toHaveBeenCalledWith(0);

    // Test direct input
    await userEvent.clear(input);
    await userEvent.type(input, '3');
    await expect(args.onChange).toHaveBeenCalledWith(3);
  },
}; 