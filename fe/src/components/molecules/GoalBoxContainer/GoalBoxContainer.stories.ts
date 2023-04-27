import type { Meta, StoryObj } from '@storybook/react';
import { GoalBoxContainer } from './GoalBoxContainer';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof GoalBoxContainer> = {
  title: 'Molecules/GoalBoxContainer',
  component: GoalBoxContainer,
  tags: ['autodocs'],
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<typeof GoalBoxContainer>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = { 
};
