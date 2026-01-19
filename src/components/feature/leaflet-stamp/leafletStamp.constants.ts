export type LeafletStampKey =
  | 'amp'
  | 'carena'
  | 'cherrish'
  | 'clustar'
  | 'snappin'
  | 'comfit'
  | 'flint'
  | 'kareer'
  | 'smashing'
  | 'kiero'
  | 'poti'
  | 'makers';

export type LeafletStamp = {
  key: LeafletStampKey;
  label: string;
};

export const LEAFLET_STAMPS: LeafletStamp[] = [
  { key: 'amp', label: 'AMP' },
  { key: 'carena', label: 'CareNA' },
  { key: 'cherrish', label: 'Cherrish' },
  { key: 'clustar', label: 'cluSTAR' },
  { key: 'snappin', label: 'Snappin’' },
  { key: 'comfit', label: 'Comfit' },
  { key: 'flint', label: 'Flint' },
  { key: 'kareer', label: 'Kareer' },
  { key: 'smashing', label: '스매싱' },
  { key: 'kiero', label: '키어로' },
  { key: 'poti', label: '포티' },
  { key: 'makers', label: 'Makers' },
];
