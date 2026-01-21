import { LeafletStampScreen, NavTop } from '@/components';

export default function LeafletPage() {
  return (
    <main className="bg-[var(--color-black)]">
      <NavTop variant="main" />
      <LeafletStampScreen progressCount={0} />
    </main>
  );
}
