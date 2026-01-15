import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import { FilterChip } from '@/components';

const meta = {
  title: 'ui/FilterChip',
  component: FilterChip,
  parameters: {
    docs: {
      description: {
        component: 'Pressed(:active) 상태는 칩을 눌러 확인할 수 있습니다.',
      },
    },
  },
} satisfies Meta<typeof FilterChip>;

export default meta;

type Story = StoryObj<typeof FilterChip>;

function PlaygroundView() {
  const [active, setActive] = useState(false);

  return (
    <div className="flex flex-col gap-[12px]">
      <p className="caption_r_10 text-[var(--color-white-70)]">
        칩을 눌러 :active 확인
      </p>
      <div className="flex flex-wrap gap-[8px]">
        <FilterChip active={active} onClick={() => setActive((prev) => !prev)}>
          {active ? 'ACTIVE' : 'INACTIVE'}
        </FilterChip>
        <FilterChip active>APPJAM</FilterChip>
        <FilterChip active={false}>MAKERS</FilterChip>
      </div>
    </div>
  );
}

export const Playground: Story = {
  render: () => <PlaygroundView />,
};
