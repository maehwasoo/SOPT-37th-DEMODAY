'use client';

import { useRef, useState, type CSSProperties, type PointerEvent } from 'react';

import Link from 'next/link';

import { QrIcon, SunriseIcon } from '@/components/icons';
import { ProgressBar } from '@/components/ui';

const SUNRISE_TEXT_MASK_SRC = '/assets/leaflet/icons/sunrise-text-mask.svg';
const DONE_BOTTOM_GRADIENT_SRC =
  '/assets/leaflet/patterns/leaflet-done-background.png';

const COMPLETE_PANEL_TRANSLATE_Y_PX = 256;
const COMPLETE_PANEL_SNAP_THRESHOLD_PX = COMPLETE_PANEL_TRANSLATE_Y_PX / 2;

type LeafletBottomPanelProgressProps = {
  current: number;
  total: number;
};

type LeafletBottomPanelCompleteProps = {
  handleDown?: boolean;
  onHandleDownChange?: (nextHandleDown: boolean) => void;
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
  onHandleDownChange,
}: LeafletBottomPanelCompleteProps) {
  const [dragging, setDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [dragTranslateY, setDragTranslateY] = useState<number | null>(null);

  const currentTranslateY =
    dragTranslateY ?? (handleDown ? COMPLETE_PANEL_TRANSLATE_Y_PX : 0);

  const translateYRef = useRef(0);

  const pointerStartYRef = useRef(0);
  const translateYStartRef = useRef(0);

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    setHasInteracted(true);
    setDragging(true);
    pointerStartYRef.current = event.clientY;
    translateYRef.current = currentTranslateY;
    translateYStartRef.current = currentTranslateY;
    setDragTranslateY(currentTranslateY);
  };

  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;

    const deltaY = event.clientY - pointerStartYRef.current;
    const nextTranslateY = Math.min(
      COMPLETE_PANEL_TRANSLATE_Y_PX,
      Math.max(0, translateYStartRef.current + deltaY)
    );
    translateYRef.current = nextTranslateY;
    setDragTranslateY(nextTranslateY);
  };

  const endDrag = () => {
    if (!dragging) return;

    setDragging(false);

    const translateY = translateYRef.current;
    const nextHandleDown = translateY > COMPLETE_PANEL_SNAP_THRESHOLD_PX;
    const snappedTranslateY = nextHandleDown
      ? COMPLETE_PANEL_TRANSLATE_Y_PX
      : 0;
    translateYRef.current = snappedTranslateY;
    setDragTranslateY(snappedTranslateY);
    onHandleDownChange?.(nextHandleDown);
  };

  const shouldPlayIntroAnimation =
    !handleDown && !hasInteracted && dragTranslateY === null;

  return (
    <div
      className={[
        'shadow_top relative h-[428px] w-full overflow-hidden rounded-tl-[32px] rounded-tr-[32px] bg-[var(--color-black)]',
        dragging
          ? 'transition-none'
          : 'transition-transform duration-[260ms] ease-out motion-reduce:transition-none',
        handleDown
          ? 'translate-y-[256px]'
          : shouldPlayIntroAnimation
            ? 'leaflet_bottom_panel_slide_up'
            : 'translate-y-0',
      ].join(' ')}
      style={{
        touchAction: 'none',
        ...(dragTranslateY === null
          ? {}
          : { transform: `translate3d(0, ${dragTranslateY}px, 0)` }),
      }}
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {/* bottom gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-[98px] w-full"
      >
        <img
          alt=""
          className="h-full w-full object-fill"
          src={DONE_BOTTOM_GRADIENT_SRC}
        />
      </div>

      {/* handle */}
      <div
        aria-hidden
        className="absolute top-[8px] left-1/2 z-20 h-[4px] w-[100px] -translate-x-1/2 rounded-[10px] bg-[var(--color-gray-900)]"
      />

      {/* title */}
      <div className="absolute top-[20px] left-1/2 z-20 flex w-[311px] -translate-x-1/2 flex-col items-center">
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

      {/* sun */}
      <div
        aria-hidden
        className="absolute top-[96px] left-1/2 z-0 h-[311px] w-[311px] -translate-x-1/2 rounded-[500px] bg-[var(--color-37demo-red)] shadow-[0px_0px_16px_0px_var(--color-37demo-red)]"
      />

      {/* sunrise text */}
      <div className="absolute top-[338px] left-1/2 z-20 h-[42px] w-[312px] -translate-x-1/2 shadow-[0px_0px_16px_0px_var(--color-37demo-red)]">
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

  return (
    <LeafletBottomPanelComplete
      handleDown={props.handleDown}
      onHandleDownChange={props.onHandleDownChange}
    />
  );
}
