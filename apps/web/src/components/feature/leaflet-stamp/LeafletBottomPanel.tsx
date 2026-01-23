import type { CSSProperties } from 'react';

import Link from 'next/link';

import { QrIcon, SunriseIcon } from '@/components/icons';
import { ProgressBar } from '@/components/ui';

const SUNRISE_CIRCLE_SRC = '/assets/leaflet/patterns/sunrise-circle.webp';
const SUNRISE_TEXT_MASK_SRC = '/assets/leaflet/icons/sunrise-text-mask.svg';

type LeafletBottomPanelProgressProps = {
  current: number;
  total: number;
};

type LeafletBottomPanelCompleteProps = {
  handleDown?: boolean;
};

type LeafletBottomPanelProps =
  | ({ mode: 'progress' } & LeafletBottomPanelProgressProps)
  | ({ mode: 'complete' } & LeafletBottomPanelCompleteProps);

function getSunriseTextMaskStyle(): CSSProperties {
  return {
    WebkitMaskImage: `url('${SUNRISE_TEXT_MASK_SRC}')`,
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskSize: '312px 42px',
    WebkitMaskPosition: '0px 0px',
    maskImage: `url('${SUNRISE_TEXT_MASK_SRC}')`,
    maskRepeat: 'no-repeat',
    maskSize: '312px 42px',
    maskPosition: '0px 0px',
  };
}

function LeafletBottomPanelProgress({
  current,
  total,
}: LeafletBottomPanelProgressProps) {
  return (
    <div className="shadow_top flex h-[172px] w-full flex-col items-center gap-[24px] overflow-hidden rounded-tl-[32px] rounded-tr-[32px] bg-[var(--color-black)] px-0 pt-[8px] pb-0">
      <div className="flex w-[311px] flex-col items-start gap-[12px]">
        <div className="flex w-full items-end justify-between">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-[8px]">
              <span className="h-[24px] w-[24px] text-[var(--color-37demo-red)]">
                <SunriseIcon />
              </span>
              <p className="title_m_12 text-[var(--color-37demo-red)]">
                Loading SUNRISE...
              </p>
            </div>
            <p className="head_b_16 text-[var(--color-white)]">
              DIVE SOPT 데모데이 업데이트 진행중...
            </p>
          </div>
          <p className="black_bk_20 text-[var(--color-37demo-red)]">
            {current}/{total}
          </p>
        </div>

        <div className="w-full">
          <ProgressBar
            max={total}
            min={0}
            trackClassName="bg-[var(--color-gray-800)]"
            value={current}
          />
        </div>
      </div>

      <Link
        href="/leaflet/scan"
        className="relative h-[74px] w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]"
      >
        <span
          aria-hidden
          className="absolute top-0 left-1/2 h-[375px] w-[375px] -translate-x-1/2 rounded-[500px] bg-[var(--color-37demo-red)] shadow-[0px_0px_16px_0px_var(--color-37demo-red)]"
        />
        <span className="absolute top-[16px] left-1/2 w-[78px] -translate-x-1/2">
          <span className="flex flex-col items-center gap-[4px]">
            <span className="h-[24px] w-[24px] text-[var(--color-white)]">
              <QrIcon />
            </span>
            <span className="head_b_16 text-center whitespace-nowrap text-[var(--color-white)]">
              기록 스캔하기
            </span>
          </span>
        </span>
      </Link>
    </div>
  );
}

function LeafletBottomPanelComplete({
  handleDown,
}: LeafletBottomPanelCompleteProps) {
  return (
    <div
      className={[
        'shadow_top relative h-[428px] w-full overflow-hidden rounded-tl-[32px] rounded-tr-[32px] bg-[var(--color-black)]',
        handleDown ? 'translate-y-[256px]' : 'leaflet_bottom_panel_slide_up',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* handle */}
      <div
        aria-hidden
        className="absolute top-[8px] left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-[10px] bg-[var(--color-gray-900)]"
      />

      {/* title */}
      <div className="absolute top-[20px] left-1/2 flex w-[311px] -translate-x-1/2 flex-col items-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-[8px]">
            <span className="h-[24px] w-[24px] text-[var(--color-37demo-red)]">
              <SunriseIcon />
            </span>
            <p className="head_b_14 text-[var(--color-37demo-red)]">
              SYSTEM UPDATE COMPLETE
            </p>
          </div>
          <p className="black_bk_20 text-center text-[var(--color-white)]">
            DIVE SOPT 데모데이 업데이트 완료
          </p>
        </div>
      </div>

      {/* sunrise circles */}
      <div
        aria-hidden
        className="absolute top-[330px] left-0 h-[98px] w-full overflow-hidden"
      >
        <div className="absolute top-0 left-[-232.05px] h-[114.874px] w-[852.233px] opacity-15">
          <img
            alt=""
            className="h-full w-full object-cover"
            src={SUNRISE_CIRCLE_SRC}
          />
        </div>
        <div className="absolute top-[12.61px] left-[-161.03px] h-[95.728px] w-[710.194px] opacity-25">
          <img
            alt=""
            className="h-full w-full object-cover"
            src={SUNRISE_CIRCLE_SRC}
          />
        </div>
        <div className="absolute top-[23.62px] left-[-101.85px] h-[79.773px] w-[591.828px] opacity-50">
          <img
            alt=""
            className="h-full w-full object-cover"
            src={SUNRISE_CIRCLE_SRC}
          />
        </div>
      </div>

      {/* sun */}
      <div
        aria-hidden
        className="absolute top-[96px] left-1/2 h-[311px] w-[311px] -translate-x-1/2 rounded-[500px] bg-[var(--color-37demo-red)] shadow-[0px_0px_16px_0px_var(--color-37demo-red)]"
      />

      {/* sunrise text */}
      <div className="absolute top-[338px] left-1/2 h-[42px] w-[312px] -translate-x-1/2 shadow-[0px_0px_16px_0px_var(--color-37demo-red)]">
        <div className="absolute inset-0" style={getSunriseTextMaskStyle()}>
          <div
            aria-hidden
            className="absolute inset-0 bg-[var(--color-white)] blur-[1.315px]"
          />
        </div>
      </div>
    </div>
  );
}

export default function LeafletBottomPanel(props: LeafletBottomPanelProps) {
  if (props.mode === 'progress') {
    return (
      <LeafletBottomPanelProgress current={props.current} total={props.total} />
    );
  }

  return <LeafletBottomPanelComplete handleDown={props.handleDown} />;
}
