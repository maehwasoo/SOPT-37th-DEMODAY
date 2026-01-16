import type { Meta, StoryObj } from '@storybook/nextjs';

import { Divider, TagMain } from '@/components';

const meta = {
  title: 'feature/SectionHeader',
  component: TagMain,
} satisfies Meta<typeof TagMain>;

export default meta;

type Story = StoryObj<typeof TagMain>;

export const Default: Story = {
  args: {
    children: '행사 개요',
  },
  render: (args) => {
    return (
      <div className="flex w-[343px] flex-col gap-[12px]">
        <TagMain {...args} />
        <Divider />
      </div>
    );
  },
};

export const DividerOnly: Story = {
  render: () => {
    return (
      <div className="w-[343px]">
        <Divider />
      </div>
    );
  },
};
