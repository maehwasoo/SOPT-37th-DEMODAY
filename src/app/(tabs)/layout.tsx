import type { ReactNode } from 'react';

import { Footer, NavBottom } from '@/components';

export default function TabsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[375px]">
      <div className="pb-[81px]">
        {children}
        <Footer />
      </div>
      <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[375px] -translate-x-1/2">
        <NavBottom />
      </div>
    </div>
  );
}
