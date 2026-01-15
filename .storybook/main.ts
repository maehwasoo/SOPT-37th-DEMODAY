import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const configDir = path.dirname(fileURLToPath(import.meta.url));
const srcAlias = path.resolve(configDir, '../src');

const config = {
  stories: ['../src/stories/**/*.stories.@(ts|tsx|mdx)'],
  addons: [],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  webpackFinal: async (webpackConfig: any) => {
    const resolvedConfig = webpackConfig ?? {};

    resolvedConfig.resolve = resolvedConfig.resolve ?? {};

    const existingAlias = resolvedConfig.resolve.alias;

    if (Array.isArray(existingAlias)) {
      existingAlias.push({ name: '@', alias: srcAlias });
    } else {
      resolvedConfig.resolve.alias = {
        ...(existingAlias ?? {}),
        '@': srcAlias,
      };
    }

    return resolvedConfig;
  },
};

export default config;
