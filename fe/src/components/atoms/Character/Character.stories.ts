import type { Meta, StoryObj } from '@storybook/react';
import { Character } from './Character';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Character> = {
  title: 'Atoms/Character',
  component: Character,
  tags: ['autodocs'],
  argTypes: {
    src: {
      description: 'The image source',
      control: {
        type: 'text',
      },
    },
    alt: {
      description: 'The image alt',
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Character>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Ohtani: Story = {
  args: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Shohei_Ohtani_%2852251723213%29_%28cropped_2%29.jpg/330px-Shohei_Ohtani_%2852251723213%29_%28cropped_2%29.jpg',
    alt: '오타니 쇼헤이',
  },
};
