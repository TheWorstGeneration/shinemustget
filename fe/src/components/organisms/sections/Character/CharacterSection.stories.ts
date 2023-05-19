import type { Meta, StoryObj } from '@storybook/react';
import { CharacterSection } from './CharacterSection';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CharacterSection> = {
  title: 'Organisms/sections/CharacterSection',
  component: CharacterSection,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CharacterSection>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
};
