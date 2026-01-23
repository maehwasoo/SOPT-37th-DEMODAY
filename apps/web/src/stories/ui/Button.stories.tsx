import type { Meta, StoryObj } from '@storybook/nextjs';

import { Button, QrIcon } from '@/components';

const meta = {
  title: 'ui/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Pressed(:active) 상태는 버튼을 눌러 확인할 수 있습니다.',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Square: Story = {
  args: {
    shape: 'square',
    children: '서비스 보러가기',
  },
  render: (args) => (
    <div className="flex w-[343px] flex-col gap-[12px]">
      <p className="caption_r_10 text-[var(--color-white-70)]">
        버튼을 눌러 :active 확인
      </p>
      <Button {...args} />
    </div>
  ),
};

export const Round: Story = {
  args: {
    shape: 'round',
    leftIcon: <QrIcon />,
    children: 'text',
  },
  render: (args) => (
    <div className="flex flex-col gap-[12px]">
      <p className="caption_r_10 text-[var(--color-white-70)]">
        버튼을 눌러 :active 확인
      </p>
      <Button {...args} />
    </div>
  ),
};
