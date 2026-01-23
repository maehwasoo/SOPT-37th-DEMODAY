import { Suspense } from 'react';

import { LeafletStampScreen, NavTop } from '@/components';

import LeafletPageClient from './LeafletPageClient';

export default function LeafletPage() {
  return (
    <main className="bg-[var(--color-black)]">
      <NavTop variant="main" />
      <Suspense fallback={<LeafletStampScreen progressCount={0} />}>
        <LeafletPageClient />
      </Suspense>
    </main>
  );
}
