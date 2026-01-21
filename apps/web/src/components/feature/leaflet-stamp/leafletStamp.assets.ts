import type { LeafletStampKey } from './leafletStamp.constants';

const STAMP_ASSET_ROOT = '/assets/leaflet/stamps';

export const LEAFLET_STAMP_ASSETS = {
  // stamp frames
  stampMask: `${STAMP_ASSET_ROOT}/stamp-mask.svg`,
  stampBaseDefault: `${STAMP_ASSET_ROOT}/stamp-base-default.svg`,
  stampBaseDefaultMakers: `${STAMP_ASSET_ROOT}/stamp-base-default-makers.svg`,
  stampBaseComplete: `${STAMP_ASSET_ROOT}/stamp-base-complete.svg`,

  // common layers
  ampLayer1: `${STAMP_ASSET_ROOT}/amp-layer-1.png`,
  ampLayer2: `${STAMP_ASSET_ROOT}/amp-layer-2.png`,

  // logos
  carena: `${STAMP_ASSET_ROOT}/logo-carena.png`,
  cherrish1: `${STAMP_ASSET_ROOT}/logo-cherrish-1.png`,
  cherrish2: `${STAMP_ASSET_ROOT}/logo-cherrish-2.png`,
  clustar: `${STAMP_ASSET_ROOT}/logo-clustar.png`,
  snappin1: `${STAMP_ASSET_ROOT}/logo-snappin-1.png`,
  snappin2: `${STAMP_ASSET_ROOT}/logo-snappin-2.png`,
  comfit: `${STAMP_ASSET_ROOT}/logo-comfit.png`,
  flint1: `${STAMP_ASSET_ROOT}/logo-flint-1.png`,
  flint2: `${STAMP_ASSET_ROOT}/logo-flint-2.png`,
  kareer1: `${STAMP_ASSET_ROOT}/logo-kareer-1.png`,
  kareer2: `${STAMP_ASSET_ROOT}/logo-kareer-2.png`,
  smashing: `${STAMP_ASSET_ROOT}/logo-smashing.png`,
  kiero1: `${STAMP_ASSET_ROOT}/logo-kiero-1.png`,
  kiero2: `${STAMP_ASSET_ROOT}/logo-kiero-2.png`,
  kiero3: `${STAMP_ASSET_ROOT}/logo-kiero-3.png`,
  poti1: `${STAMP_ASSET_ROOT}/logo-poti-1.png`,
  poti2: `${STAMP_ASSET_ROOT}/logo-poti-2.png`,
  makers: `${STAMP_ASSET_ROOT}/logo-makers.png`,

  // symbols
  symbolA: `${STAMP_ASSET_ROOT}/stamp-symbol-a.svg`,
  symbolB: `${STAMP_ASSET_ROOT}/stamp-symbol-b.svg`,
  symbolC: `${STAMP_ASSET_ROOT}/stamp-symbol-c.svg`,
} as const;

export const LEAFLET_STAMP_SYMBOL_BY_KEY: Record<LeafletStampKey, string> = {
  amp: LEAFLET_STAMP_ASSETS.symbolA,
  carena: LEAFLET_STAMP_ASSETS.symbolA,
  cherrish: LEAFLET_STAMP_ASSETS.symbolB,
  clustar: LEAFLET_STAMP_ASSETS.symbolC,
  snappin: LEAFLET_STAMP_ASSETS.symbolB,
  comfit: LEAFLET_STAMP_ASSETS.symbolB,
  flint: LEAFLET_STAMP_ASSETS.symbolC,
  kareer: LEAFLET_STAMP_ASSETS.symbolA,
  smashing: LEAFLET_STAMP_ASSETS.symbolC,
  kiero: LEAFLET_STAMP_ASSETS.symbolA,
  poti: LEAFLET_STAMP_ASSETS.symbolB,
  makers: LEAFLET_STAMP_ASSETS.symbolC,
};
