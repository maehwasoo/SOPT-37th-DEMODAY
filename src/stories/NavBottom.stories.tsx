import type { Meta, StoryObj } from '@storybook/react';

import { NavBottom } from '@/components';

const meta: Meta<typeof NavBottom> = {
  title: 'layout/NavBottom',
  component: NavBottom,
  args: {
    active: 'home',
    onNavigate: (tab) => console.log('NavBottom onNavigate:', tab),
  },
  render: (args) => (
    <div style={{ width: 375 }}>
      <NavBottom {...args} />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof NavBottom>;

export const Home: Story = {
  args: {
    active: 'home',
  },
};

export const Product: Story = {
  args: {
    active: 'product',
  },
};

export const Leaflet: Story = {
  args: {
    active: 'leaflet',
  },
};

