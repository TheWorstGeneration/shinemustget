import type { Meta, StoryObj } from '@storybook/react';
import { ChipList } from './ChipList';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ChipList> = {
  title: 'Molecules/ChipList',
  component: ChipList,
  tags: ['autodocs'],
  argTypes: {
    chipList: {
      control: {
        type: 'select',
        options: [
          ['프론트엔드 개발자 되기', '월 1000의 광고 수익을 내는 블로거 되기'],
          [
            '프론트엔드 개발자 되기',
            '월 1000의 광고 수익을 내는 블로거 되기',
            '프론트엔드 개발자 되기',
            '월 1000의 광고 수익을 내는 블로거 되기',
          ],
        ],
      },
    },
    move: {
      control: {
        type: 'number',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChipList>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    chipList: [
      '프론트엔드 개발자 되기',
      '월 1000의 광고 수익을 내는 블로거 되기',
      '자녀를 위한 투자를 시작하기',
      '세계 여행을 떠나기',
      'epl에서 우승하기',
    ],
    move: 0,
  },
};
