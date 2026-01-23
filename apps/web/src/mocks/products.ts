export type ProductTrack = 'appjam' | 'makers';
export type ProductPlatform = 'mobile_app' | 'mobile_web' | 'desktop_web';

export type Product = {
  id: number;
  title: string;
  category: string;
  description: string;
  thumbnailSrc: string;
  track: ProductTrack;
  platform: ProductPlatform;
};

export const MOCK_PRODUCTS: readonly Product[] = [
  {
    id: 1,
    title: '프로덕트 01',
    category: '카테고리',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: '/assets/figma/main/img_branding_main.webp',
    track: 'appjam',
    platform: 'mobile_app',
  },
  {
    id: 2,
    title: '프로덕트 02',
    category: '카테고리',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: '/assets/figma/main/img_branding_main.webp',
    track: 'appjam',
    platform: 'mobile_web',
  },
  {
    id: 3,
    title: '프로덕트 03',
    category: '카테고리',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: '/assets/figma/main/img_branding_main.webp',
    track: 'appjam',
    platform: 'desktop_web',
  },
  {
    id: 4,
    title: '프로덕트 04',
    category: '카테고리',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: '/assets/figma/main/img_branding_main.webp',
    track: 'appjam',
    platform: 'mobile_app',
  },
  {
    id: 5,
    title: '프로덕트 05',
    category: '카테고리',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: '/assets/figma/main/img_branding_main.webp',
    track: 'appjam',
    platform: 'mobile_web',
  },
  {
    id: 6,
    title: '프로덕트 06',
    category: '카테고리',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: '/assets/figma/main/img_branding_main.webp',
    track: 'appjam',
    platform: 'desktop_web',
  },
  {
    id: 7,
    title: '프로덕트 07',
    category: '카테고리',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: '/assets/figma/main/img_branding_main.webp',
    track: 'makers',
    platform: 'mobile_app',
  },
  {
    id: 8,
    title: '프로덕트 08',
    category: '카테고리',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: '/assets/figma/main/img_branding_main.webp',
    track: 'makers',
    platform: 'mobile_web',
  },
  {
    id: 9,
    title: '프로덕트 09',
    category: '카테고리',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: '/assets/figma/main/img_branding_main.webp',
    track: 'makers',
    platform: 'desktop_web',
  },
  {
    id: 10,
    title: '프로덕트 10',
    category: '카테고리',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: '/assets/figma/main/img_branding_main.webp',
    track: 'makers',
    platform: 'mobile_app',
  },
  {
    id: 11,
    title: '프로덕트 11',
    category: '카테고리',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: '/assets/figma/main/img_branding_main.webp',
    track: 'appjam',
    platform: 'mobile_app',
  },
  {
    id: 12,
    title: '프로덕트 12',
    category: '카테고리',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: '/assets/figma/main/img_branding_main.webp',
    track: 'makers',
    platform: 'desktop_web',
  },
] as const;
