import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import { Tabs } from '@/components';

const meta = {
  title: 'ui/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: 'Pressed(:active) 상태는 탭을 눌러 확인할 수 있습니다.',
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof Tabs>;

function DefaultView() {
  const [value, setValue] = useState<'all' | 'appjam' | 'makers'>('all');

  return (
    <div className="flex w-[343px] flex-col gap-[12px]">
      <p className="caption_r_10 text-[var(--color-white-70)]">
        탭을 눌러 :active 확인
      </p>
      <Tabs onValueChange={setValue} value={value} />
      <p className="caption_r_10 text-[var(--color-white-70)]">
        value: {value}
      </p>
    </div>
  );
}

export const Default: Story = {
  render: () => <DefaultView />,
};
