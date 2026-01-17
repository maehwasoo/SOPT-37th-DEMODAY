import type { ReactNode } from 'react';

import { NavBottom } from '@/components';

export default function TabsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[375px]">
      <div className="pb-[81px]">{children}</div>
      <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[375px] -translate-x-1/2">
        <NavBottom />
      </div>
    </div>
  );
}
