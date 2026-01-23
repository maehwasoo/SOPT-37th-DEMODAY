import type { LeafletStamp } from './leafletStamp.constants';
import LeafletStampTile from './LeafletStampTile';

type LeafletStampGridProps = {
  stamps: LeafletStamp[];
  completedKeys: Set<LeafletStamp['key']>;
};

export default function LeafletStampGrid({
  stamps,
  completedKeys,
}: LeafletStampGridProps) {
  return (
    <div className="grid w-full max-w-[302px] grid-cols-4 grid-rows-3 gap-[10px]">
      {stamps.map((stamp) => (
        <LeafletStampTile
          key={stamp.key}
          stamp={stamp}
          completed={completedKeys.has(stamp.key)}
        />
      ))}
    </div>
  );
}
