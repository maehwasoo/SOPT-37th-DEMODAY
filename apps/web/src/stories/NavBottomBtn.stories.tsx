import type { Meta, StoryObj } from '@storybook/react';

import { NavBottomBtn } from '@/components';

const meta = {
  title: 'UI/NavBottomBtn',
  component: NavBottomBtn,
  args: {
    label: '홈',
    state: 'inactive',
  },
  argTypes: {
    state: {
      control: { type: 'radio' },
      options: ['inactive', 'pressed', 'active'],
    },
  },
} satisfies Meta<typeof NavBottomBtn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inactive: Story = {
  args: {
    state: 'inactive',
  },
};

export const Pressed: Story = {
  args: {
    state: 'pressed',
  },
};

export const Active: Story = {
  args: {
    state: 'active',
  },
};
