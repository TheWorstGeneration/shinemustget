import type { Meta, StoryObj } from '@storybook/react';
import { LoginSection } from './LoginSection';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LoginSection> = {
  title: 'Organisms/sections/LoginSection',
  component: LoginSection,
  tags: ['autodocs'],
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<typeof LoginSection>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
  },
};
