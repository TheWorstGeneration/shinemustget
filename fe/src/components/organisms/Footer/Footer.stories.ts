import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Organisms/Footer',
  component: Footer,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['sm', 'lg'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const LargeFooter: Story = {
  args: {
    size: 'lg',
  },
};

export const SmallFooter: Story = {
  args: {
    size: 'sm',
  },
};
