import type { Meta, StoryObj } from '@storybook/react';
import { LanguageButton } from './LanguageButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LanguageButton> = {
  title: 'Atoms/LanguageButton',
  component: LanguageButton,
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
type Story = StoryObj<typeof LanguageButton>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const LargeKorean: Story = {
  args: {
    size: 'lg',
    language: 'ko',
  },
};

export const SmallKorean: Story = {
  args: {
    size: 'sm',
    language: 'ko',
  },
};

export const LargeEnglish: Story = {
  args: {
    size: 'lg',
    language: 'en',
  },
};

export const SmallEnglish: Story = {
  args: {
    size: 'sm',
    language: 'en',
  },
};
