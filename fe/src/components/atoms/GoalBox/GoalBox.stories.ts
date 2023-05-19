import type { Meta, StoryObj } from '@storybook/react';
import { GoalBox } from './GoalBox';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof GoalBox> = {
  title: 'Atoms/GoalBox',
  component: GoalBox,
  tags: ['autodocs'],
  argTypes: {
    id: {
      defaultValue: '1',
      description: 'The id of the goal',
      control: {
        type: 'number',
      },
    },
    location: {
      defaultValue: 'Location',
      description: 'The location of the goal',
      control: {
        type: 'number',
      },
    },
    content: {
      defaultValue: 'Content',
      description: 'The Content of the goal',
      control: {
        type: 'text',
      },
    },
    isPodo: {
      defaultValue: false,
      description: 'Whether the goal is a podo',
      control: {
        type: 'boolean',
      },
    },
    isClear: {
      defaultValue: false,
      description: 'Whether the goal is cleared',
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GoalBox>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    id: 1,
    location: 1,
    content: 'Content',
    isPodo: false,
    isClear: false,
  },
};
