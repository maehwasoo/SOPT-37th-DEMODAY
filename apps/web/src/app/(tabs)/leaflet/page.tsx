import { Suspense } from 'react';

import { LeafletStampScreen, NavTop } from '@/components';

import LeafletPageClient from './LeafletPageClient';

export default function LeafletPage() {
  return (
    <main className="bg-[var(--color-black)]">
      <NavTop variant="main" showLeafletStampQrMenu />
      <Suspense fallback={<LeafletStampScreen progressCount={0} />}>
        <LeafletPageClient />
      </Suspense>
    </main>
  );
}
