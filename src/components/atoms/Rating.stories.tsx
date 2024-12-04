import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';
import { userEvent, within, expect } from '@storybook/test';

const meta = {
  title: 'Atoms/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
    },
    readonly: {
      control: 'boolean',
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

export const Interactive: Story = {
  args: {
    value: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const stars = canvas.getAllByRole('button');
    
    // Click the third star
    await userEvent.click(stars[2]);
    
    // Verify the first three stars are filled
    const filledStars = canvas.getAllByRole('button').slice(0, 3);
    filledStars.forEach(star => {
      expect(star.querySelector('svg')).toHaveClass('text-yellow-400');
    });
  },
}; 