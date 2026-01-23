'use client';

import type { ReactNode } from 'react';

import { usePathname } from 'next/navigation';

import Footer from '@/components/layout/footer/Footer';
import NavBottom from '@/components/layout/nav-bottom/NavBottom';

export default function TabsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideFooter = pathname.startsWith('/leaflet');

  return (
    <div className="mx-auto w-full max-w-[var(--app-max-width)]">
      <div className="flex min-h-[100dvh] flex-col pb-[calc(var(--nav-bottom-height)+var(--safe-area-bottom))]">
        {children}
        {hideFooter ? null : (
          <div className="mt-auto">
            <Footer />
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[var(--app-max-width)] -translate-x-1/2 bg-[var(--color-black)] pb-[var(--safe-area-bottom)]">
        <NavBottom />
      </div>
    </div>
  );
}
