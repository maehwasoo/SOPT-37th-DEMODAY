import type { Meta, StoryObj } from '@storybook/nextjs';

import { ProgressBar } from '@/components';

const meta = {
  title: 'ui/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component:
          '진행도에 따라 채움 너비가 변경되는 ProgressBar 컴포넌트입니다.',
      },
    },
  },
  args: {
    value: 27,
    min: 0,
    max: 100,
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  render: (args) => (
    <div className="flex w-[295px] flex-col gap-[12px]">
      <ProgressBar {...args} />
      <p className="caption_r_10 text-[var(--color-white-70)]">
        value: {args.value}
      </p>
    </div>
  ),
};

export const Full: Story = {
  args: {
    value: 100,
  },
  render: (args) => (
    <div className="flex w-[295px] flex-col gap-[12px]">
      <ProgressBar {...args} />
      <p className="caption_r_10 text-[var(--color-white-70)]">
        value: {args.value}
      </p>
    </div>
  ),
};
