'use client';

import { useEffect, type ReactElement } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import FadeInView from '@/components/common/FadeInView';
import {
  AndroidIcon,
  DesignIcon,
  IosIcon,
  PlanningIcon,
  ServerIcon,
  SunriseIcon,
  WebIcon,
} from '@/components/icons';
import { Footer, NavTop } from '@/components/layout';
import { TagProduct } from '@/components/ui';
import type { Product, ProductPlatform, ProductRoleKey } from '@/data/products';
import { trackEvent } from '@/lib/ga';

type ProductDetailPageClientProps = {
  product: Product;
};

const PLATFORM_LABEL: Record<ProductPlatform, string> = {
  mobile_app: '모바일 앱',
  mobile_web: '모바일 웹',
  desktop_web: '데스크탑 웹',
};

const ROLE_META: Record<
  ProductRoleKey,
  { label: string; iconClassName: string; icon: ReactElement }
> = {
  planning: {
    label: '기획',
    iconClassName:
      'pt-[2.78px] pr-[5.6px] pb-[2.78px] pl-[5.12px] text-[var(--color-37demo-red)]',
    icon: <PlanningIcon width="100%" height="100%" className="size-full" />,
  },
  design: {
    label: '디자인',
    iconClassName:
      'pt-[6.8px] pr-[1.9px] pb-[6.6px] pl-[2px] text-[var(--color-37demo-red)]',
    icon: <DesignIcon width="100%" height="100%" className="size-full" />,
  },
  ios: {
    label: 'iOS',
    iconClassName:
      'pt-[3.8px] pr-[3.79px] pb-[3.06px] pl-[3.6px] text-[var(--color-37demo-red)]',
    icon: <IosIcon width="100%" height="100%" className="size-full" />,
  },
  android: {
    label: '안드로이드',
    iconClassName:
      'pt-[3.6px] pr-[4.86px] pb-[4.32px] pl-[4.8px] text-[var(--color-37demo-red)]',
    icon: <AndroidIcon width="100%" height="100%" className="size-full" />,
  },
  web: {
    label: '웹',
    iconClassName:
      'pt-[5.9px] pr-[1.56px] pb-[6.03px] pl-[1.61px] text-[var(--color-37demo-red)]',
    icon: <WebIcon width="100%" height="100%" className="size-full" />,
  },
  server: {
    label: '서버',
    iconClassName:
      'pt-[2.4px] pr-[7.2px] pb-[2.5px] pl-[7.4px] text-[var(--color-37demo-red)]',
    icon: <ServerIcon width="100%" height="100%" className="size-full" />,
  },
};

export default function ProductDetailPageClient({
  product,
}: ProductDetailPageClientProps) {
  const router = useRouter();

  const platformLabel = PLATFORM_LABEL[product.platform];
  const memberRows = product.memberRows;

  useEffect(() => {
    trackEvent('product_detail_view', {
      product_id: product.teamKey,
      track: product.track,
      platform: product.platform,
    });
  }, [product.platform, product.teamKey, product.track]);

  return (
    <div className="mx-auto w-full max-w-[var(--app-max-width)] bg-[var(--color-black)]">
      <div className="fixed top-0 left-1/2 z-50 w-full max-w-[var(--app-max-width)] -translate-x-1/2 bg-[var(--color-black-overlay)] pt-[var(--safe-area-top)] backdrop-blur-md">
        <NavTop
          variant="sub"
          title={product.title}
          onBack={() => router.back()}
        />
      </div>

      <div className="flex flex-col gap-[48px] pt-[calc(80px+var(--safe-area-top))]">
        <main className="flex flex-col gap-[24px] px-[16px] py-0">
          {/* title */}
          <section className="flex flex-col gap-[16px]">
            <div className="relative aspect-[343/191] w-full">
              {product.thumbnailSrc ? (
                <Image
                  src={product.thumbnailSrc}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 440px) calc(100vw - 32px), 408px"
                  priority
                />
              ) : (
                <div className="h-full w-full bg-[var(--color-gray-800)]" />
              )}
            </div>

            <div className="flex w-full flex-col items-start gap-[12px] rounded-[2px] bg-[var(--color-gray-900)] p-[12px]">
              <div className="flex w-full flex-col items-start gap-[16px]">
                <div className="flex items-center gap-[8px]">
                  <p className="head_b_20 text-[var(--color-white)]">
                    {product.title}
                  </p>
                  <div className="flex items-center gap-[6px]">
                    <TagProduct>{product.category}</TagProduct>
                    <TagProduct>{platformLabel}</TagProduct>
                  </div>
                </div>

                <div className="flex w-full items-center justify-center border-b border-solid border-[var(--color-gray-800)] px-0 pt-0 pb-[16px]">
                  <p className="body_r_14 flex-1 text-[var(--color-white)]">
                    {product.description}
                  </p>
                </div>
              </div>

              {memberRows.length ? (
                <div className="flex w-full items-end gap-[16px]">
                  <div className="flex flex-none flex-col items-start">
                    {memberRows.map((row) => {
                      const meta = ROLE_META[row.role];

                      return (
                        <div
                          key={row.role}
                          className="flex items-end gap-[2px]"
                          aria-label={meta.label}
                        >
                          <span
                            aria-hidden
                            className={[
                              'h-[24px] w-[24px] shrink-0',
                              meta.iconClassName,
                            ].join(' ')}
                          >
                            {meta.icon}
                          </span>
                          <p className="body_r_14 text-[var(--color-gray-300)]">
                            {meta.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="body_r_14 flex min-w-0 flex-1 flex-col items-start gap-[4px] text-[var(--color-gray-300)]">
                    {memberRows.map((row) => {
                      const membersText = row.members.join(' ');

                      return (
                        <p key={row.role} className="w-full">
                          {membersText || '\u00A0'}
                        </p>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>

            <a
              href="/leaflet"
              className="relative h-[100px] w-full rounded-[2px] bg-[var(--color-37demo-red-20)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]"
              aria-label="온라인 리플렛 페이지로 이동"
              onClick={() => {
                trackEvent('leaflet_entry_click', {
                  source: 'product_detail_cta',
                  product_id: product.teamKey,
                });
              }}
            >
              <div className="absolute top-[14px] right-[78px] left-[16px] flex flex-col items-start">
                <div className="flex items-center gap-[8px]">
                  <span className="h-[24px] w-[24px] text-[var(--color-37demo-red)]">
                    <SunriseIcon />
                  </span>
                  <p className="title_m_12 text-[var(--color-37demo-red)]">
                    Loading SUNRISE...
                  </p>
                </div>

                <div className="head_b_16 mt-0 break-keep text-[var(--color-white)]">
                  <p className="mb-0">
                    온라인 리플렛을 통해 부스별 도장을 찍고
                  </p>
                  <p>이벤트에 응모해 보세요!</p>
                </div>
              </div>

              <div className="absolute top-1/2 right-[22px] flex h-[56px] w-[56px] -translate-y-1/2 items-center justify-end pr-[9px] text-[var(--color-37demo-red)]">
                <svg
                  width={10}
                  height={18}
                  viewBox="0 0 23.3333 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M2.3926 42L23.3333 21L2.3926 0L0 2.39945L18.548 21L0 39.6005L2.3926 42Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </a>
          </section>

          {/* detail image */}
          {product.detailImageSrc ? (
            <FadeInView>
              <div aria-label="상세 이미지 영역">
                <img
                  src={product.detailImageSrc}
                  alt={`${product.title} 상세 이미지`}
                  className="h-auto w-full"
                  loading="lazy"
                />
              </div>
            </FadeInView>
          ) : null}
        </main>

        <Footer />
      </div>
    </div>
  );
}
