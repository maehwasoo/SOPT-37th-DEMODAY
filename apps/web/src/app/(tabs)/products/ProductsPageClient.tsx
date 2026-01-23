'use client';

import { useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import ProductCard from '@/components/feature/product-card/ProductCard';
import FilterChip from '@/components/ui/FilterChip/FilterChip';
import Tabs, { type TabsValue } from '@/components/ui/Tabs/Tabs';
import { trackEvent } from '@/lib/ga';
import { MOCK_PRODUCTS } from '@/mocks/products';

const PLATFORM_FILTERS = [
  { value: 'all', label: '전체' },
  { value: 'mobile_app', label: '모바일 앱' },
  { value: 'mobile_web', label: '모바일 웹' },
  { value: 'desktop_web', label: '데스크탑 웹' },
] as const;

type PlatformFilter = (typeof PLATFORM_FILTERS)[number]['value'];

export default function ProductsPageClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabsValue>('all');
  const [activePlatform, setActivePlatform] = useState<PlatformFilter>('all');

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchTab = activeTab === 'all' || product.track === activeTab;
      const matchPlatform =
        activePlatform === 'all' || product.platform === activePlatform;

      return matchTab && matchPlatform;
    });
  }, [activePlatform, activeTab]);

  return (
    <>
      {/* filters */}
      <section className="shadow_bottom sticky top-0 z-40 flex flex-col items-center gap-[16px] bg-[var(--color-black-overlay)] px-0 pt-[calc(var(--safe-area-top)+8px)] pb-[16px] backdrop-blur-md">
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
            trackEvent('product_filter_change', { filter: 'track', value });
          }}
        />
        <div className="flex w-full flex-wrap items-center gap-[8px] px-[16px]">
          {PLATFORM_FILTERS.map((item) => (
            <FilterChip
              key={item.value}
              active={activePlatform === item.value}
              onClick={() => {
                setActivePlatform(item.value);
                trackEvent('product_filter_change', {
                  filter: 'platform',
                  value: item.value,
                });
              }}
              type="button"
            >
              {item.label}
            </FilterChip>
          ))}
        </div>
      </section>

      {/* contents */}
      <section className="flex flex-col gap-[8px] px-[16px] pt-[14px]">
        <p className="body_r_14 leading-[1.45] tracking-[-0.14px] text-[var(--color-gray-400)]">
          총 {filteredProducts.length}개의 서비스
        </p>
        <div className="grid w-full grid-cols-2 gap-x-[17px] gap-y-[16px]">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              thumbnailSrc={product.thumbnailSrc}
              thumbnailAlt={product.title}
              title={product.title}
              category={product.category}
              description={product.description}
              onClick={() => {
                trackEvent('product_select', {
                  product_id: product.id,
                  track: product.track,
                  platform: product.platform,
                });
                router.push(`/products/${product.id}`);
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}
