'use client';

import { useCallback, useMemo, useState } from 'react';

import type { TabsValue } from '@/components';
import { FilterChip, ProductCard, Tabs } from '@/components';

type ProductTrack = 'appjam' | 'makers';
type ProductPlatform = 'mobileApp' | 'mobileWeb' | 'desktopWeb';

type Product = {
  id: string;
  track: ProductTrack;
  platform: ProductPlatform;
  title: string;
  category: string;
  description: string;
  thumbnailSrc: string;
};

type PlatformFilter = 'all' | ProductPlatform;

const THUMBNAIL_PLACEHOLDER_SRC =
  '/assets/figma/products/thumbnail_placeholder.svg';

const MOCK_PRODUCTS: readonly Product[] = [
  {
    id: 'p1',
    track: 'appjam',
    platform: 'mobileApp',
    title: '{프로덕트명}',
    category: '{카테고리}',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: THUMBNAIL_PLACEHOLDER_SRC,
  },
  {
    id: 'p2',
    track: 'appjam',
    platform: 'mobileWeb',
    title: '{프로덕트명}',
    category: '{카테고리}',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: THUMBNAIL_PLACEHOLDER_SRC,
  },
  {
    id: 'p3',
    track: 'appjam',
    platform: 'desktopWeb',
    title: '{프로덕트명}',
    category: '{카테고리}',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: THUMBNAIL_PLACEHOLDER_SRC,
  },
  {
    id: 'p4',
    track: 'makers',
    platform: 'mobileApp',
    title: '{프로덕트명}',
    category: '{카테고리}',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: THUMBNAIL_PLACEHOLDER_SRC,
  },
  {
    id: 'p5',
    track: 'makers',
    platform: 'mobileWeb',
    title: '{프로덕트명}',
    category: '{카테고리}',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: THUMBNAIL_PLACEHOLDER_SRC,
  },
  {
    id: 'p6',
    track: 'makers',
    platform: 'desktopWeb',
    title: '{프로덕트명}',
    category: '{카테고리}',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: THUMBNAIL_PLACEHOLDER_SRC,
  },
  {
    id: 'p7',
    track: 'appjam',
    platform: 'mobileApp',
    title: '{프로덕트명}',
    category: '{카테고리}',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: THUMBNAIL_PLACEHOLDER_SRC,
  },
  {
    id: 'p8',
    track: 'appjam',
    platform: 'mobileWeb',
    title: '{프로덕트명}',
    category: '{카테고리}',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: THUMBNAIL_PLACEHOLDER_SRC,
  },
  {
    id: 'p9',
    track: 'appjam',
    platform: 'desktopWeb',
    title: '{프로덕트명}',
    category: '{카테고리}',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: THUMBNAIL_PLACEHOLDER_SRC,
  },
  {
    id: 'p10',
    track: 'makers',
    platform: 'mobileApp',
    title: '{프로덕트명}',
    category: '{카테고리}',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: THUMBNAIL_PLACEHOLDER_SRC,
  },
  {
    id: 'p11',
    track: 'makers',
    platform: 'mobileWeb',
    title: '{프로덕트명}',
    category: '{카테고리}',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: THUMBNAIL_PLACEHOLDER_SRC,
  },
  {
    id: 'p12',
    track: 'makers',
    platform: 'desktopWeb',
    title: '{프로덕트명}',
    category: '{카테고리}',
    description: '프로젝트 설명입니다. 공백 포함 최대 23자까지 가능',
    thumbnailSrc: THUMBNAIL_PLACEHOLDER_SRC,
  },
] as const;

const PLATFORM_FILTERS: readonly { value: PlatformFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'mobileApp', label: '모바일 앱' },
  { value: 'mobileWeb', label: '모바일 웹' },
  { value: 'desktopWeb', label: '데스크탑 웹' },
] as const;

function isTrackMatch(tab: TabsValue, product: Product) {
  if (tab === 'all') return true;
  if (tab === 'appjam') return product.track === 'appjam';
  return product.track === 'makers';
}

function isPlatformMatch(filter: PlatformFilter, product: Product) {
  if (filter === 'all') return true;
  return product.platform === filter;
}

export default function ProductsPage() {
  const [tab, setTab] = useState<TabsValue>('all');
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>('all');

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(
      (product) =>
        isTrackMatch(tab, product) && isPlatformMatch(platformFilter, product)
    );
  }, [tab, platformFilter]);

  const handleTabChange = useCallback((nextTab: TabsValue) => {
    setTab(nextTab);
  }, []);

  return (
    <main className="bg-[var(--color-black)]">
      <div className="shadow_bottom sticky top-0 z-40 bg-[var(--color-black)]">
        <div className="flex flex-col items-center gap-[16px] pt-[8px] pb-[16px]">
          <Tabs value={tab} onValueChange={handleTabChange} />
          <div className="flex w-[343px] items-center gap-[8px]">
            {PLATFORM_FILTERS.map((filter) => (
              <FilterChip
                key={filter.value}
                active={platformFilter === filter.value}
                onClick={() => setPlatformFilter(filter.value)}
              >
                {filter.label}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[48px] pt-[14px]">
        <section className="flex flex-col gap-[8px] px-[16px]">
          <p className="body_r_14 text-[var(--color-gray-400)]">
            총 {filteredProducts.length}개의 서비스
          </p>
          <div className="grid w-[343px] grid-cols-2 gap-x-[17px] gap-y-[16px]">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                category={product.category}
                description={product.description}
                thumbnailSrc={product.thumbnailSrc}
                title={product.title}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
