'use client';

import type { ReactNode } from 'react';

import { usePathname } from 'next/navigation';

import { Footer, NavBottom } from '@/components';

export default function TabsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideFooter = pathname.startsWith('/leaflet');

  return (
    <div className="mx-auto w-full max-w-[375px]">
      <div className="pb-[80px]">
        {children}
        {hideFooter ? null : <Footer />}
      </div>
      <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[375px] -translate-x-1/2">
        <NavBottom />
      </div>
    </div>
  );
}
