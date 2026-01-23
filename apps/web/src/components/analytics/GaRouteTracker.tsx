'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

import { trackPageView } from '@/lib/ga';

export default function GaRouteTracker({ gaId }: { gaId?: string }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!gaId) return;

    trackPageView({
      pagePath: pathname,
      pageTitle: document.title,
      pageLocation: `${window.location.origin}${pathname}`,
    });
  }, [gaId, pathname]);

  return null;
}
