import type { ReactNode } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import LeafletStampScreen from '@/components/feature/leaflet-stamp/LeafletStampScreen';
import NavBottom from '@/components/layout/nav-bottom/NavBottom';
import NavTop from '@/components/layout/nav-top/NavTop';

function LeafletFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[667px] w-[375px] overflow-hidden bg-[var(--color-black)]">
      <div className="pb-[80px]">{children}</div>
      <div className="absolute bottom-0 left-0 w-full">
        <NavBottom
          active="leaflet"
          onNavigate={(tab) => console.log('NavBottom onNavigate:', tab)}
        />
      </div>
    </div>
  );
}

const meta = {
  title: 'feature/LeafletStampScreen',
  component: LeafletStampScreen,
  parameters: {
    layout: 'centered',
  },
  args: {
    progressCount: 0,
  },
} satisfies Meta<typeof LeafletStampScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default0Of12: Story = {
  args: { progressCount: 0 },
  render: (args) => (
    <LeafletFrame>
      <NavTop variant="main" />
      <LeafletStampScreen {...args} />
    </LeafletFrame>
  ),
};

export const Progress11Of12: Story = {
  args: { progressCount: 11 },
  render: (args) => (
    <LeafletFrame>
      <NavTop variant="main" />
      <LeafletStampScreen {...args} />
    </LeafletFrame>
  ),
};

export const CompleteHandleUp: Story = {
  args: { progressCount: 12, handleDown: true },
  render: (args) => (
    <LeafletFrame>
      <NavTop variant="main" />
      <LeafletStampScreen {...args} />
    </LeafletFrame>
  ),
};

export const CompleteHandleDown: Story = {
  args: { progressCount: 12, handleDown: true },
  render: (args) => (
    <LeafletFrame>
      <NavTop variant="main" />
      <LeafletStampScreen {...args} />
    </LeafletFrame>
  ),
};
