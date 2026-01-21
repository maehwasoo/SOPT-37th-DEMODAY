'use client';

import { useMemo, useState } from 'react';

import { FilterChip, Footer, ProductCard, Tabs } from '@/components';
import type { TabsValue } from '@/components';
import { MOCK_PRODUCTS } from '@/mocks/products';

const PLATFORM_FILTERS = [
  { value: 'all', label: '전체' },
  { value: 'mobile_app', label: '모바일 앱' },
  { value: 'mobile_web', label: '모바일 웹' },
  { value: 'desktop_web', label: '데스크탑 웹' },
] as const;

type PlatformFilter = (typeof PLATFORM_FILTERS)[number]['value'];

export default function ProductsPage() {
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
    <main className="bg-[var(--color-black)]">
      {/* filters */}
      <section className="shadow_bottom sticky top-0 z-40 flex flex-col items-center gap-[16px] bg-[var(--color-black)] px-0 pt-[8px] pb-[16px]">
        <Tabs value={activeTab} onValueChange={setActiveTab} />
        <div className="flex w-[343px] items-center gap-[8px]">
          {PLATFORM_FILTERS.map((item) => (
            <FilterChip
              key={item.value}
              active={activePlatform === item.value}
              onClick={() => setActivePlatform(item.value)}
              type="button"
            >
              {item.label}
            </FilterChip>
          ))}
        </div>
      </section>

      {/* contents + footer */}
      <div className="flex flex-col gap-[48px] pt-[14px]">
        <section className="flex flex-col gap-[8px] px-[16px]">
          <p className="body_r_14 text-[var(--color-gray-400)]">
            총 {filteredProducts.length}개의 서비스
          </p>
          <div className="grid w-[343px] grid-cols-2 gap-x-[17px] gap-y-[16px]">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                thumbnailSrc={product.thumbnailSrc}
                thumbnailAlt={product.title}
                title={product.title}
                category={product.category}
                description={product.description}
              />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
