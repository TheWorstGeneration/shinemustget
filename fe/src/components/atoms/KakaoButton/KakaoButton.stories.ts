import type { Meta, StoryObj } from '@storybook/react';
import { KakaoButton } from './KakaoButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof KakaoButton> = {
  title: 'Atoms/Button',
  component: KakaoButton,
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
type Story = StoryObj<typeof KakaoButton>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};
