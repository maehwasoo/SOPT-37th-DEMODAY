type GaEventParams = Record<
  string,
  string | number | boolean | null | undefined
>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function pushToDataLayer(args: unknown[]) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(args);
}

function safeGtag(...args: unknown[]) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag(...args);
    return;
  }
  pushToDataLayer(args);
}

export function trackPageView({
  pagePath,
  pageTitle,
  pageLocation,
}: {
  pagePath: string;
  pageTitle?: string;
  pageLocation?: string;
}) {
  // SPA page view event
  safeGtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: pageLocation,
  } satisfies GaEventParams);
}

export function trackEvent(eventName: string, params: GaEventParams = {}) {
  safeGtag('event', eventName, params);
}
