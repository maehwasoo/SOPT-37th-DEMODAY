import LeafletStampScreen from '@/components/feature/leaflet-stamp/LeafletStampScreen';

// Legacy leaflet route wrapper
export default function LegacyLeafletPage() {
  return (
    <main className="mx-auto w-[375px]">
      <LeafletStampScreen progressCount={0} />
    </main>
  );
}
