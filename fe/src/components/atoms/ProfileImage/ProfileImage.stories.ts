import type { Meta, StoryObj } from '@storybook/react';
import { ProfileImage } from './ProfileImage';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ProfileImage> = {
  title: 'Atoms/ProfileImage',
  component: ProfileImage,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof ProfileImage>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
};
