import type { Meta, StoryObj } from '@storybook/react';
import { PriceFilter } from './PriceFilter';
import { userEvent, within, expect, fn } from '@storybook/test';

const meta = {
  title: 'Molecules/PriceFilter',
  component: PriceFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PriceFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    minPrice: '',
    maxPrice: '',
    onMinChange: fn(),
    onMaxChange: fn(),
    onApply: fn(),
    onReset: fn(),
  },
};

export const WithValues: Story = {
  args: {
    minPrice: '10',
    maxPrice: '100',
    onMinChange: fn(),
    onMaxChange: fn(),
    onApply: fn(),
    onReset: fn(),
  },
};

export const WithInteractions: Story = {
  args: {
    minPrice: '',
    maxPrice: '',
    onMinChange: fn(),
    onMaxChange: fn(),
    onApply: fn(),
    onReset: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const [minInput, maxInput] = canvas.getAllByRole('spinbutton');
    const applyButton = canvas.getByText('Apply');
    const resetButton = canvas.getByText('Reset');

    // Test min price input
    await userEvent.type(minInput, '10');
    await expect(args.onMinChange).toHaveBeenCalledWith('10');

    // Test max price input
    await userEvent.type(maxInput, '100');
    await expect(args.onMaxChange).toHaveBeenCalledWith('100');

    // Test apply filter
    await userEvent.click(applyButton);
    await expect(args.onApply).toHaveBeenCalled();

    // Test reset
    await userEvent.click(resetButton);
    await expect(args.onReset).toHaveBeenCalled();
  },
}; 