import type { Meta, StoryObj } from '@storybook/nextjs';

import { TagProduct } from '@/components';

const meta = {
  title: 'ui/TagProduct',
  component: TagProduct,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '상품/작품 카드에서 카테고리를 표시하는 태그입니다.',
      },
    },
  },
} satisfies Meta<typeof TagProduct>;

export default meta;

type Story = StoryObj<typeof TagProduct>;

export const Basic: Story = {
  render: () => (
    // Preview wrapper
    <div className="bg-[var(--color-gray-900)] p-[24px]">
      <TagProduct>카테고리</TagProduct>
    </div>
  ),
};
