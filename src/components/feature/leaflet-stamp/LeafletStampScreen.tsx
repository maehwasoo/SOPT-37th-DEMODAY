import LeafletBottomPanel from './LeafletBottomPanel';
import { LEAFLET_STAMPS } from './leafletStamp.constants';
import type { LeafletStampKey } from './leafletStamp.constants';
import LeafletStampDetailCard from './LeafletStampDetailCard';
import LeafletStampGrid from './LeafletStampGrid';

export type LeafletStampScreenProps = {
  progressCount: number;
  totalCount?: number;
  handleDown?: boolean;
  // completed stamp keys
  completedStampKeys?: readonly LeafletStampKey[];
};

function getCompletedKeysFromCount(progressCount: number) {
  const completedCount = Math.max(
    0,
    Math.min(progressCount, LEAFLET_STAMPS.length)
  );

  return new Set(LEAFLET_STAMPS.slice(0, completedCount).map((s) => s.key));
}

function getCompletedKeysFromKeys(
  completedStampKeys: readonly LeafletStampKey[]
) {
  const knownKeys = new Set(LEAFLET_STAMPS.map((s) => s.key));
  return new Set(completedStampKeys.filter((key) => knownKeys.has(key)));
}

export default function LeafletStampScreen({
  progressCount,
  totalCount = LEAFLET_STAMPS.length,
  handleDown,
  completedStampKeys,
}: LeafletStampScreenProps) {
  const completedKeys = completedStampKeys
    ? getCompletedKeysFromKeys(completedStampKeys)
    : getCompletedKeysFromCount(progressCount);

  const resolvedProgressCount = completedStampKeys
    ? completedKeys.size
    : progressCount;

  const isComplete = resolvedProgressCount >= totalCount;

  return (
    <section className="relative h-[531px] w-full bg-[var(--color-black)]">
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
      <div className="absolute bottom-0 left-0 w-full">
        {isComplete ? (
          <LeafletBottomPanel mode="complete" handleDown={handleDown} />
        ) : (
          <LeafletBottomPanel
            mode="progress"
            current={resolvedProgressCount}
            total={totalCount}
          />
        )}
      </div>
    </section>
  );
}
