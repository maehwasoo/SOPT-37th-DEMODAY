'use client';

import { useMemo, type CSSProperties } from 'react';

import {
  LEAFLET_STAMP_ASSETS,
  LEAFLET_STAMP_SYMBOLS,
} from './leafletStamp.assets';
import type { LeafletStamp, LeafletStampKey } from './leafletStamp.constants';

type LeafletStampTileProps = {
  stamp: LeafletStamp;
  completed: boolean;
};

function getStampMaskStyle(): CSSProperties {
  return {
    WebkitMaskImage: `url('${LEAFLET_STAMP_ASSETS.stampMask}')`,
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskSize: '100% 100%',
    WebkitMaskPosition: '0px 0px',
    maskImage: `url('${LEAFLET_STAMP_ASSETS.stampMask}')`,
    maskRepeat: 'no-repeat',
    maskSize: '100% 100%',
    maskPosition: '0px 0px',
  };
}

function StampLogoLayers({ stampKey }: { stampKey: LeafletStampKey }) {
  // Logo layers
  switch (stampKey) {
    case 'amp':
      return (
        <>
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={LEAFLET_STAMP_ASSETS.ampLayer1}
          />
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={LEAFLET_STAMP_ASSETS.ampLayer2}
          />
        </>
      );

    case 'carena':
      return (
        <>
          <div className="absolute inset-0 bg-[var(--color-white)]" />
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={LEAFLET_STAMP_ASSETS.carena}
          />
        </>
      );

    case 'cherrish':
      return (
        <>
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={LEAFLET_STAMP_ASSETS.cherrish1}
          />
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={LEAFLET_STAMP_ASSETS.cherrish2}
          />
        </>
      );

    case 'clustar':
      return (
        <>
          <div className="absolute inset-0 bg-[var(--color-white)]" />
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt=""
              className="absolute top-[12.46%] left-[12.5%] h-3/4 w-3/4"
              src={LEAFLET_STAMP_ASSETS.clustar}
            />
          </div>
        </>
      );

    case 'snappin':
      return (
        <>
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={LEAFLET_STAMP_ASSETS.snappin1}
          />
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={LEAFLET_STAMP_ASSETS.snappin2}
          />
        </>
      );

    case 'comfit':
      return (
        <>
          <div className="absolute inset-0 bg-[var(--color-white)]" />
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={LEAFLET_STAMP_ASSETS.comfit}
          />
        </>
      );

    case 'flint':
      return (
        <>
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={LEAFLET_STAMP_ASSETS.flint1}
          />
          <div className="absolute inset-0 bg-[var(--color-white)]" />
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={LEAFLET_STAMP_ASSETS.flint2}
          />
        </>
      );

    case 'kareer':
      return (
        <>
          <div className="absolute inset-0 bg-[var(--color-white)]" />
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={LEAFLET_STAMP_ASSETS.kareer1}
          />
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={LEAFLET_STAMP_ASSETS.kareer2}
          />
        </>
      );

    case 'smashing':
      return (
        <>
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt=""
              className="absolute top-[10.62%] left-[10.67%] h-[78.65%] w-[78.65%]"
              src={LEAFLET_STAMP_ASSETS.smashing}
            />
          </div>
        </>
      );

    case 'kiero':
      return (
        <>
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={LEAFLET_STAMP_ASSETS.kiero1}
          />
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={LEAFLET_STAMP_ASSETS.kiero2}
          />
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={LEAFLET_STAMP_ASSETS.kiero3}
          />
        </>
      );

    case 'poti':
      return (
        <>
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={LEAFLET_STAMP_ASSETS.poti1}
          />
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={LEAFLET_STAMP_ASSETS.poti2}
          />
        </>
      );

    case 'makers':
      return (
        <>
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt=""
              className="absolute top-[13.24%] left-[11.03%] h-[64.71%] w-[77.93%]"
              src={LEAFLET_STAMP_ASSETS.makers}
            />
          </div>
        </>
      );
  }
}

function getRandomCompletedSymbolSrc() {
  const index = Math.floor(Math.random() * LEAFLET_STAMP_SYMBOLS.length);
  return LEAFLET_STAMP_SYMBOLS[index] ?? LEAFLET_STAMP_SYMBOLS[0];
}

export default function LeafletStampTile({
  stamp,
  completed,
}: LeafletStampTileProps) {
  const baseSrc = completed
    ? LEAFLET_STAMP_ASSETS.stampBaseComplete
    : stamp.key === 'makers'
      ? LEAFLET_STAMP_ASSETS.stampBaseDefaultMakers
      : LEAFLET_STAMP_ASSETS.stampBaseDefault;

  const symbolSrc = useMemo(() => {
    if (!completed) return LEAFLET_STAMP_SYMBOLS[0];
    return getRandomCompletedSymbolSrc();
  }, [completed, stamp.key]);

  return (
    <div
      className="relative aspect-square w-full"
      data-name={`leaflet_stamp_${stamp.key}`}
    >
      {/* stamp base */}
      <img alt="" className="absolute inset-0 h-full w-full" src={baseSrc} />

      {/* logo area */}
      <div aria-hidden className="absolute inset-0" style={getStampMaskStyle()}>
        <StampLogoLayers stampKey={stamp.key} />
      </div>

      {/* bottom gradient */}
      <div aria-hidden className="absolute inset-0" style={getStampMaskStyle()}>
        <div
          aria-hidden
          className={[
            'absolute bottom-0 left-0 w-full',
            completed ? 'h-[52.94%]' : 'h-[58.82%]',
            'bg-gradient-to-b from-[rgba(40,44,45,0)]',
            completed ? 'to-[rgba(40,44,45,0.8)]' : 'to-[rgba(40,44,45,0.9)]',
          ].join(' ')}
        />
      </div>

      {/* completed overlay */}
      {completed ? (
        <>
          <div
            aria-hidden
            className="absolute inset-0 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
            style={getStampMaskStyle()}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[rgba(255,89,118,0.4)] backdrop-blur-[4px]"
            style={getStampMaskStyle()}
          />
          <div
            aria-hidden
            className="absolute top-[8.82%] left-1/2 h-[55.88%] w-[55.88%] -translate-x-1/2"
          >
            <img
              alt=""
              className="h-full w-full object-contain"
              src={symbolSrc}
            />
          </div>
        </>
      ) : null}

      {/* label */}
      <div className="head_b_14 absolute inset-x-0 top-[79.41%] -translate-y-1/2 text-center [font-size:clamp(12px,3.8vw,14px)] whitespace-nowrap text-[var(--color-white)]">
        {stamp.label}
      </div>
    </div>
  );
}
