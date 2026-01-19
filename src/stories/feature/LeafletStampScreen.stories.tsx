import type { Meta, StoryObj } from '@storybook/nextjs';

import LeafletStampScreen from '@/components/feature/leaflet-stamp/LeafletStampScreen';
import NavTop from '@/components/layout/nav-top/NavTop';

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
    <div className="w-[375px]">
      <NavTop />
      <LeafletStampScreen {...args} />
    </div>
  ),
};

export const Progress11Of12: Story = {
  args: { progressCount: 11 },
  render: (args) => (
    <div className="w-[375px]">
      <NavTop />
      <LeafletStampScreen {...args} />
    </div>
  ),
};

export const CompleteHandleUp: Story = {
  args: { progressCount: 12, handleDown: false },
  render: (args) => (
    <div className="w-[375px]">
      <NavTop />
      <LeafletStampScreen {...args} />
    </div>
  ),
};

export const CompleteHandleDown: Story = {
  args: { progressCount: 12, handleDown: true },
  render: (args) => (
    <div className="w-[375px]">
      <NavTop />
      <LeafletStampScreen {...args} />
    </div>
  ),
};
