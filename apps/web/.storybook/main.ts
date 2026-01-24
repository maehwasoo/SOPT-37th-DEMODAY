import * as path from 'node:path';

const srcAlias = path.resolve(process.cwd(), 'src');

const config = {
  stories: ['../src/stories/**/*.stories.@(ts|tsx|mdx)'],
  addons: [],
  staticDirs: ['../public'],
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
