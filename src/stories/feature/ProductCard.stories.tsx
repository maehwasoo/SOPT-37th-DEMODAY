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
    state: 'default',
    thumbnailSrc,
    title: '{프로덕트명}',
    category: '{카테고리}',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
  },
  argTypes: {
    state: {
      control: { type: 'radio' },
      options: ['default', 'pressed'],
    },
  },
  parameters: {
    docs: {
      description: {
        component: '카드의 눌림(pressed) 상태는 props로 확인할 수 있습니다.',
      },
    },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { state: 'default' },
};

export const Pressed: Story = {
  args: { state: 'pressed' },
};
