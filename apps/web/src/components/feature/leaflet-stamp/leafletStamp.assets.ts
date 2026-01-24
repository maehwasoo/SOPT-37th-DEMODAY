const STAMP_ASSET_ROOT = '/assets/leaflet/stamps';

export const LEAFLET_STAMP_ASSETS = {
  // stamp frames
  stampMask: `${STAMP_ASSET_ROOT}/stamp-mask.svg`,
  stampOutlineDefault: `${STAMP_ASSET_ROOT}/stamp-outline-default.svg`,
  stampOutlineComplete: `${STAMP_ASSET_ROOT}/stamp-outline-complete.svg`,
  stampBaseDefault: `${STAMP_ASSET_ROOT}/stamp-base-default.svg`,
  stampBaseDefaultMakers: `${STAMP_ASSET_ROOT}/stamp-base-default-makers.svg`,
  stampBaseComplete: `${STAMP_ASSET_ROOT}/stamp-base-complete.svg`,

  // common layers
  ampLayer1: `${STAMP_ASSET_ROOT}/amp-layer-1.webp`,
  ampLayer2: `${STAMP_ASSET_ROOT}/amp-layer-2.webp`,

  // logos
  carena: `${STAMP_ASSET_ROOT}/logo-carena.webp`,
  cherrish1: `${STAMP_ASSET_ROOT}/logo-cherrish-1.webp`,
  cherrish2: `${STAMP_ASSET_ROOT}/logo-cherrish-2.webp`,
  clustar: `${STAMP_ASSET_ROOT}/logo-clustar.webp`,
  snappin1: `${STAMP_ASSET_ROOT}/logo-snappin-1.webp`,
  snappin2: `${STAMP_ASSET_ROOT}/logo-snappin-2.webp`,
  comfit: `${STAMP_ASSET_ROOT}/logo-comfit.webp`,
  flint1: `${STAMP_ASSET_ROOT}/logo-flint-1.webp`,
  flint2: `${STAMP_ASSET_ROOT}/logo-flint-2.webp`,
  kareer1: `${STAMP_ASSET_ROOT}/logo-kareer-1.webp`,
  kareer2: `${STAMP_ASSET_ROOT}/logo-kareer-2.webp`,
  smashing: `${STAMP_ASSET_ROOT}/logo-smashing.webp`,
  kiero1: `${STAMP_ASSET_ROOT}/logo-kiero-1.webp`,
  kiero2: `${STAMP_ASSET_ROOT}/logo-kiero-2.webp`,
  kiero3: `${STAMP_ASSET_ROOT}/logo-kiero-3.webp`,
  poti1: `${STAMP_ASSET_ROOT}/logo-poti-1.webp`,
  poti2: `${STAMP_ASSET_ROOT}/logo-poti-2.webp`,
  makers: `${STAMP_ASSET_ROOT}/logo-makers.webp`,

  // symbols
  symbolA: `${STAMP_ASSET_ROOT}/stamp-symbol-a.svg`,
  symbolB: `${STAMP_ASSET_ROOT}/stamp-symbol-b.svg`,
  symbolC: `${STAMP_ASSET_ROOT}/stamp-symbol-c.svg`,
} as const;

export const LEAFLET_STAMP_SYMBOLS = [
  LEAFLET_STAMP_ASSETS.symbolA,
  LEAFLET_STAMP_ASSETS.symbolB,
  LEAFLET_STAMP_ASSETS.symbolC,
] as const;
