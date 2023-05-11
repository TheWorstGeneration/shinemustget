import type { Meta, StoryObj } from '@storybook/react';
import { Navigator } from './Navigator';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Navigator> = {
  title: 'Atoms/Navigator',
  component: Navigator,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Navigator>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {};
