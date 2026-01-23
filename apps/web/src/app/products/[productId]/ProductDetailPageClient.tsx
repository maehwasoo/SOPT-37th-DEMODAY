'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  AndroidIcon,
  ArrowRightIcon,
  DesignIcon,
  IosIcon,
  PlanningIcon,
  ServerIcon,
  SunriseIcon,
} from '@/components/icons';
import { Footer, NavTop } from '@/components/layout';
import { TagProduct } from '@/components/ui';
import type { Product, ProductPlatform } from '@/mocks/products';

type ProductDetailPageClientProps = {
  product: Product;
};

const PLATFORM_LABEL: Record<ProductPlatform, string> = {
  mobile_app: '모바일 앱',
  mobile_web: '모바일 웹',
  desktop_web: '데스크탑 웹',
};

const PRODUCT_DETAIL_DESCRIPTION =
  '작품 상세 설명입니다. 저희서비스는 샬랴샬라해서 얄라쿵디더헝쿵작품 상세 설명입니다. 저희서비스는 샬랴샬라해서 얄라쿵디더헝쿵작품 상세 설명입니다. 저희서비스는 샬랴샬라해서 공백포함102자';

const TEAM_ROWS = [
  {
    key: 'planning',
    label: '기획',
    iconClassName:
      'pt-[2.78px] pr-[5.6px] pb-[2.78px] pl-[5.12px] text-[var(--color-37demo-red)]',
    icon: <PlanningIcon width="100%" height="100%" className="size-full" />,
    members: '김솝트, 최윤아',
  },
  {
    key: 'design',
    label: '디자인',
    iconClassName:
      'pt-[6.8px] pr-[1.9px] pb-[6.6px] pl-[2px] text-[var(--color-37demo-red)]',
    icon: <DesignIcon width="100%" height="100%" className="size-full" />,
    members: '김솝트, 하수정',
  },
  {
    key: 'android',
    label: '안드로이드',
    iconClassName:
      'pt-[3.6px] pr-[4.86px] pb-[4.32px] pl-[4.8px] text-[var(--color-37demo-red)]',
    icon: <AndroidIcon width="100%" height="100%" className="size-full" />,
    members: '김솝트, 박동민, 박동민, 박동민',
  },
  {
    key: 'ios',
    label: 'iOS',
    iconClassName:
      'pt-[3.8px] pr-[3.79px] pb-[3.06px] pl-[3.6px] text-[var(--color-37demo-red)]',
    icon: <IosIcon width="100%" height="100%" className="size-full" />,
    members: '김솝트, 이명진, 이명진, 이명진',
  },
  {
    key: 'server',
    label: '서버',
    iconClassName:
      'pt-[2.4px] pr-[7.2px] pb-[2.5px] pl-[7.4px] text-[var(--color-37demo-red)]',
    icon: <ServerIcon width="100%" height="100%" className="size-full" />,
    members: '김솝트, 전재연',
  },
] as const;

export default function ProductDetailPageClient({
  product,
}: ProductDetailPageClientProps) {
  const router = useRouter();

  const platformLabel = PLATFORM_LABEL[product.platform];

  return (
    <div className="mx-auto w-full max-w-[var(--app-max-width)] bg-[var(--color-black)]">
      <div className="fixed top-0 left-1/2 z-50 w-full max-w-[var(--app-max-width)] -translate-x-1/2 bg-[var(--color-black)] pt-[var(--safe-area-top)]">
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
              <Image
                src={product.thumbnailSrc}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 440px) calc(100vw - 32px), 408px"
                priority
              />
            </div>

            <div className="flex h-[272px] w-full flex-col items-start gap-[12px] rounded-[2px] bg-[var(--color-gray-900)] p-[12px]">
              <div className="flex w-full flex-col items-start gap-[16px]">
                <div className="flex items-center gap-[8px]">
                  <p className="head_b_20 text-[var(--color-white)]">
                    {product.title}
                  </p>
                  <div className="flex items-start gap-[6px]">
                    <TagProduct>{product.category}</TagProduct>
                    <TagProduct>{platformLabel}</TagProduct>
                  </div>
                </div>

                <div className="flex w-full items-center justify-center border-b border-solid border-[var(--color-gray-800)] px-0 pt-0 pb-[12px]">
                  <p className="body_r_14 h-[60px] flex-1 text-[var(--color-white)]">
                    {PRODUCT_DETAIL_DESCRIPTION}
                  </p>
                </div>
              </div>

              <div className="flex items-end gap-[16px]">
                <div className="flex w-[79px] flex-col items-start">
                  {TEAM_ROWS.map((row) => (
                    <div
                      key={row.key}
                      className="flex items-end gap-[2px]"
                      aria-label={row.label}
                    >
                      <span
                        aria-hidden
                        className={[
                          'h-[24px] w-[24px] shrink-0',
                          row.iconClassName,
                        ].join(' ')}
                      >
                        {row.icon}
                      </span>
                      <p className="body_r_14 text-[var(--color-gray-300)]">
                        {row.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="body_r_14 flex w-[147px] flex-col items-start gap-[4px] text-[var(--color-gray-300)]">
                  {TEAM_ROWS.map((row) => (
                    <p key={row.key} className="w-full">
                      {row.members}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <a
              href="/leaflet"
              className="relative h-[100px] w-full rounded-[2px] bg-[var(--color-37demo-red-20)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]"
              aria-label="온라인 리플렛 페이지로 이동"
            >
              <div className="absolute top-[14px] left-[16px] flex w-[228px] flex-col items-start">
                <div className="flex items-center gap-[8px]">
                  <span className="h-[24px] w-[24px] text-[var(--color-37demo-red)]">
                    <SunriseIcon />
                  </span>
                  <p className="title_m_12 text-[var(--color-37demo-red)]">
                    Loading SUNRISE...
                  </p>
                </div>

                <div className="head_b_16 mt-0 text-[var(--color-white)]">
                  <p className="mb-0">
                    온라인 리플렛을 통해 부스별 도장을 찍고
                  </p>
                  <p>이벤트에 응모해 보세요!</p>
                </div>
              </div>

              <div className="absolute top-1/2 right-[22px] flex h-[56px] w-[56px] -translate-y-1/2 items-center justify-center text-[var(--color-37demo-red)]">
                <ArrowRightIcon width={10} height={18} />
              </div>
            </a>
          </section>

          {/* detail image */}
          <div
            className="h-[1190px] w-full bg-[var(--color-gray-200)]"
            aria-label="상세 이미지 영역"
          />
        </main>

        <Footer />
      </div>
    </div>
  );
}
