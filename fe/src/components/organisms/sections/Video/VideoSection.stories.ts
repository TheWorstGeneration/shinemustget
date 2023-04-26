import type { Meta, StoryObj } from '@storybook/react';
import { VideoSection } from './VideoSection';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof VideoSection> = {
  title: 'Organisms/sections/VideoSection',
  component: VideoSection,
  tags: ['autodocs'],
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<typeof VideoSection>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
  },
};
