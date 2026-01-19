import NavBottom from '@/components/layout/nav-bottom/NavBottom';

import LeafletBottomPanel from './LeafletBottomPanel';
import { LEAFLET_STAMPS } from './leafletStamp.constants';
import LeafletStampDetailCard from './LeafletStampDetailCard';
import LeafletStampGrid from './LeafletStampGrid';

export type LeafletStampScreenProps = {
  progressCount: number;
  totalCount?: number;
  handleDown?: boolean;
};

function getCompletedKeys(progressCount: number) {
  const completedCount = Math.max(
    0,
    Math.min(progressCount, LEAFLET_STAMPS.length)
  );

  return new Set(LEAFLET_STAMPS.slice(0, completedCount).map((s) => s.key));
}

export default function LeafletStampScreen({
  progressCount,
  totalCount = 12,
  handleDown,
}: LeafletStampScreenProps) {
  const completedKeys = getCompletedKeys(progressCount);
  const isComplete = progressCount >= totalCount;

  return (
    <section className="relative h-[611px] w-[375px] bg-[var(--color-black)]">
      <div className="px-[23px] pt-[25px]">
        <div className="flex flex-col items-center gap-[24px]">
          <LeafletStampDetailCard />
          {!isComplete || handleDown ? (
            <LeafletStampGrid
              stamps={LEAFLET_STAMPS}
              completedKeys={completedKeys}
            />
          ) : null}
        </div>
      </div>

      {/* bottom sheets */}
      <div className="absolute bottom-[80px] left-0 w-full">
        {isComplete ? (
          <LeafletBottomPanel mode="complete" handleDown={handleDown} />
        ) : (
          <LeafletBottomPanel
            mode="progress"
            current={progressCount}
            total={totalCount}
          />
        )}
      </div>

      {/* bottom navigation */}
      <div className="absolute bottom-0 left-0 w-full">
        <NavBottom active="leaflet" />
      </div>
    </section>
  );
}
