import type { Preview } from '@storybook/nextjs';

import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    nextjs: {
      // App Router (next/navigation) mocks
      appDirectory: true,
    },
  },
};

export default preview;
