import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Chip> = {
  title: 'Atoms/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    context: {
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ShortChip: Story = {
  args: {
    context: '프론트엔드 개발자 되기',
  },
};

export const LongChip: Story = {
  args: {
    context: '월 1000의 광고 수익을 내는 블로거 되기',
  },
};
