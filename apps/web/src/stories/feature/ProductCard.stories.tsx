import type { Meta, StoryObj } from '@storybook/nextjs';

import { ProductCard } from '@/components';

const thumbnailSrc = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="326" height="184" viewBox="0 0 326 184">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop stop-color="#3a3f40" />
        <stop offset="1" stop-color="#1d1f20" />
      </linearGradient>
    </defs>
    <rect width="326" height="184" fill="url(#g)" />
  </svg>`
)}`;

const meta = {
  title: 'feature/ProductCard',
  component: ProductCard,
  args: {
    thumbnailSrc,
    title: '{프로덕트명}',
    category: '{카테고리}',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
  },
  parameters: {
    docs: {
      description: {
        component: '눌림(:active) 상태는 카드를 눌러 확인할 수 있습니다.',
      },
    },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col gap-[12px]">
      <p className="caption_r_10 text-[var(--color-white-70)]">
        카드를 눌러 :active 확인
      </p>
      <ProductCard {...args} />
    </div>
  ),
};
