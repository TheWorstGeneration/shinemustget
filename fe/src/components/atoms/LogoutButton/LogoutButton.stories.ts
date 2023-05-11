import type { Meta, StoryObj } from '@storybook/react';
import { LogoutButton } from './LogoutButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LogoutButton> = {
  title: 'Atoms/LogoutButton',
  component: LogoutButton,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LogoutButton>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {};
