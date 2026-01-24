import { TEAM_LIST, type TeamKey, type TeamTrack } from './teams';

export type ProductTrack = TeamTrack;
export type ProductPlatform = 'mobile_app' | 'mobile_web' | 'desktop_web';

export type ProductRoleKey =
  | 'planning'
  | 'design'
  | 'web'
  | 'ios'
  | 'android'
  | 'server';

export type ProductMemberRow = {
  role: ProductRoleKey;
  members: string[];
};

export type Product = {
  teamKey: TeamKey;
  title: string;
  category: string;
  description: string;
  thumbnailSrc: string | null;
  detailImageSrc: string | null;
  track: ProductTrack;
  platform: ProductPlatform;
  memberRows: readonly ProductMemberRow[];
};

const PRODUCT_ASSET_BASE = '/assets/product_detail';

const THUMBNAIL_SRC_BY_TEAM_KEY: Record<TeamKey, string | null> = {
  smashing: null,
  carena: `${PRODUCT_ASSET_BASE}/thumb/carena.webp`,
  kiero: `${PRODUCT_ASSET_BASE}/thumb/kiero.webp`,
  comfit: `${PRODUCT_ASSET_BASE}/thumb/comfit.webp`,
  amp: `${PRODUCT_ASSET_BASE}/thumb/amp.webp`,
  snappin: `${PRODUCT_ASSET_BASE}/thumb/snappin.webp`,
  cherrish: `${PRODUCT_ASSET_BASE}/thumb/cherrish.webp`,
  clustar: `${PRODUCT_ASSET_BASE}/thumb/clustar.webp`,
  flint: `${PRODUCT_ASSET_BASE}/thumb/flint.webp`,
  poti: `${PRODUCT_ASSET_BASE}/thumb/poti.webp`,
  kareer: `${PRODUCT_ASSET_BASE}/thumb/kareer.webp`,
  makers: null,
};

const DETAIL_IMAGE_SRC_BY_TEAM_KEY: Record<TeamKey, string | null> = {
  smashing: null,
  carena: `${PRODUCT_ASSET_BASE}/detail/carena.webp`,
  kiero: `${PRODUCT_ASSET_BASE}/detail/kiero.webp`,
  comfit: `${PRODUCT_ASSET_BASE}/detail/comfit.webp`,
  amp: `${PRODUCT_ASSET_BASE}/detail/amp.webp`,
  snappin: `${PRODUCT_ASSET_BASE}/detail/snappin.webp`,
  cherrish: `${PRODUCT_ASSET_BASE}/detail/cherrish.webp`,
  clustar: `${PRODUCT_ASSET_BASE}/detail/clustar.webp`,
  flint: `${PRODUCT_ASSET_BASE}/detail/flint.webp`,
  poti: `${PRODUCT_ASSET_BASE}/detail/poti.webp`,
  kareer: `${PRODUCT_ASSET_BASE}/detail/kareer.webp`,
  makers: null,
};

const PRODUCT_INFO_BY_TEAM_KEY = {
  smashing: {
    platform: 'mobile_app',
    memberRows: [
      { role: 'planning', members: ['조동현', '전유선'] },
      { role: 'design', members: ['김나령', '김유민'] },
      { role: 'ios', members: ['이진재', '이승준', '홍준범'] },
      { role: 'android', members: ['한유빈', '신형철', '공승준', '이지민'] },
      { role: 'server', members: ['이유빈', '김민경'] },
    ],
  },
  carena: {
    platform: 'mobile_web',
    memberRows: [
      { role: 'planning', members: ['김세윤'] },
      { role: 'design', members: ['김경아'] },
      { role: 'web', members: ['지민재', '박원', '임지성', '김어진'] },
      { role: 'server', members: ['변희민', '박경민'] },
    ],
  },
  kiero: {
    platform: 'mobile_app',
    memberRows: [
      { role: 'planning', members: ['최근영', '임상헌'] },
      { role: 'design', members: ['정인화', '박소이'] },
      { role: 'ios', members: ['한현서', '신혜연', '안치욱', '정윤아'] },
      { role: 'android', members: ['성규현', '손민성', '손주완', '최승재'] },
      { role: 'server', members: ['정원준', '백세희'] },
    ],
  },
  comfit: {
    platform: 'desktop_web',
    memberRows: [
      { role: 'planning', members: ['장윤서'] },
      { role: 'design', members: ['전한나', '진유빈'] },
      { role: 'web', members: ['오수빈', '정유진', '이채영', '배정민'] },
      { role: 'server', members: ['정지환', '추상윤'] },
    ],
  },
  amp: {
    platform: 'mobile_web',
    memberRows: [
      { role: 'planning', members: ['홍가연', '정윤지'] },
      { role: 'design', members: ['안세은', '공준석'] },
      { role: 'web', members: ['임지수', '박진석', '박소현', '임나은'] },
      { role: 'server', members: ['김동찬', '최민영', '이채유'] },
    ],
  },
  snappin: {
    platform: 'mobile_web',
    memberRows: [
      { role: 'planning', members: ['김가현', '배성진'] },
      { role: 'design', members: ['오윤서', '신혜연'] },
      { role: 'web', members: ['장민수', '양승혜', '권동희', '송민하'] },
      { role: 'server', members: ['조성하', '김소연'] },
    ],
  },
  cherrish: {
    platform: 'mobile_app',
    memberRows: [
      { role: 'planning', members: ['허예진'] },
      { role: 'design', members: ['이승민', '이지수'] },
      { role: 'ios', members: ['공수민', '이나연', '어재선', '송성용'] },
      { role: 'android', members: ['유수현', '정소희', '김나현', '남궁혜민'] },
      { role: 'server', members: ['조서영', '김규일'] },
    ],
  },
  clustar: {
    platform: 'desktop_web',
    memberRows: [
      { role: 'planning', members: ['조민경', '최서현'] },
      { role: 'design', members: ['유준현', '유혜민'] },
      { role: 'web', members: ['백지연', '최윤하', '조혜린', '임서준'] },
      { role: 'server', members: ['조효동', '구본탁'] },
    ],
  },
  flint: {
    platform: 'mobile_app',
    memberRows: [
      { role: 'planning', members: ['김가영', '박하영'] },
      { role: 'design', members: ['곽은진', '이지은', '이한비'] },
      { role: 'ios', members: ['임소은', '진소은', '김호성'] },
      {
        role: 'android',
        members: ['박찬미', '김종우', '김나현', '임차민', '김준서'],
      },
      { role: 'server', members: ['문호주', '곽재민'] },
    ],
  },
  poti: {
    platform: 'mobile_app',
    memberRows: [
      { role: 'planning', members: ['구나영', '방민혁'] },
      { role: 'design', members: ['이수민', '김채연'] },
      { role: 'ios', members: ['김수민', '김나연', '박정환', '이서현'] },
      { role: 'android', members: ['손예림', '전도연', '이지현', '천민재'] },
      { role: 'server', members: ['박시현', '임채륜'] },
    ],
  },
  kareer: {
    platform: 'desktop_web',
    memberRows: [
      { role: 'planning', members: ['봉윤서', '홍승원'] },
      { role: 'design', members: ['박민주', '한다현'] },
      { role: 'web', members: ['이훈진', '김윤지', '장정훈', '손하은'] },
      { role: 'server', members: ['김도훈', '권형미'] },
    ],
  },
  makers: {
    platform: 'mobile_app',
    memberRows: [
      { role: 'planning', members: [] },
      { role: 'design', members: [] },
      { role: 'ios', members: [] },
      { role: 'android', members: [] },
      { role: 'server', members: [] },
    ],
  },
} satisfies Record<
  TeamKey,
  { platform: ProductPlatform; memberRows: ProductMemberRow[] }
>;

export const PRODUCTS: readonly Product[] = TEAM_LIST.map((team) => ({
  teamKey: team.key,
  title: team.displayName,
  category: team.category,
  description: team.shortDescription,
  thumbnailSrc: THUMBNAIL_SRC_BY_TEAM_KEY[team.key],
  detailImageSrc: DETAIL_IMAGE_SRC_BY_TEAM_KEY[team.key],
  track: team.track,
  platform: PRODUCT_INFO_BY_TEAM_KEY[team.key].platform,
  memberRows: PRODUCT_INFO_BY_TEAM_KEY[team.key].memberRows,
}));
