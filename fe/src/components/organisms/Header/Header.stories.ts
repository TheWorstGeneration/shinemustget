import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md','lg'],
      },
    },
    isLogin: {
      control: {
        type: 'boolean',
      },
    },
    language: {
      control: {
        type: 'select',
        options: ['en', 'ko'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const LargeLogoutKorean: Story = {
  args: {
    size: 'lg',
    isLogin: false,
    language: 'ko',
  },
};

export const LargeLogoutEnglish: Story = {
  args: {
    size: 'lg',
    isLogin: false,
    language: 'en',
  },
};

export const LargeLoginKorean: Story = {
  args: {
    size: 'lg',
    isLogin: true,
    language: 'ko',
  },
};

export const LargeLoginEnglish: Story = {
  args: {
    size: 'lg',
    isLogin: true,
    language: 'en',
  },
};

export const SmallLogout: Story = {
  args: {
    size: 'sm',
    isLogin: false,
    language: 'ko',
  },
};
export const SmallLogin: Story = {
  args: {
    size: 'sm',
    isLogin: true,
    language: 'ko',
  },
};