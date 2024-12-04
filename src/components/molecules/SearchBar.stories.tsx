import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';
import { userEvent, within, expect, fn } from '@storybook/test';

const meta = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    onChange: fn(),
    onSearch: fn(),
  },
};

export const WithValue: Story = {
  args: {
    value: 'Gaming keyboard',
    onChange: fn(),
    onSearch: fn(),
  },
};

export const WithInteraction: Story = {
  args: {
    value: '',
    onChange: fn(),
    onSearch: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    const searchButton = canvas.getByRole('button');

    await userEvent.type(input, 'mechanical keyboard');
    await expect(input).toHaveValue('mechanical keyboard');
    await expect(args.onChange).toHaveBeenCalledTimes('mechanical keyboard'.length);

    await userEvent.click(searchButton);
    await expect(args.onSearch).toHaveBeenCalled();
  },
}; 