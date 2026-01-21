import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    // local API proxy
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8080/api/:path*',
        },
      ];
    }

    return [];
  },
};

const sentryWebpackPluginOptions =
  process.env.SENTRY_ORG && process.env.SENTRY_PROJECT
    ? {
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        silent: !process.env.CI,
        authToken: process.env.SENTRY_AUTH_TOKEN,
        widenClientFileUpload: Boolean(process.env.SENTRY_AUTH_TOKEN),
      }
    : null;

export default sentryWebpackPluginOptions
  ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
  : nextConfig;
