import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Logo> = {
  title: 'Atoms/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Logo>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {};
