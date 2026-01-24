'use client';

import type { ReactNode } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { trackEvent } from '@/lib/ga';

import {
  HomeFilledIcon,
  HomeOutlineIcon,
  LeafletFilledIcon,
  LeafletOutlineIcon,
  OpenLinkIcon,
  ProductsFilledIcon,
  ProductsOutlineIcon,
} from '../../icons';

type NavBottomTab = 'home' | 'product' | 'leaflet' | 'homepage';
type NavBottomActiveTab = Exclude<NavBottomTab, 'homepage'>;

const OFFICIAL_HOMEPAGE_URL = 'https://www.sopt.org/';

type NavBottomProps = {
  // active tab key
  active?: NavBottomActiveTab;
  // navigation handler
  onNavigate?: (tab: NavBottomTab) => void;
};

function resolveActiveTab(pathname: string): NavBottomActiveTab | null {
  if (pathname.startsWith('/products')) return 'product';
  if (pathname.startsWith('/leaflet')) return 'leaflet';
  if (pathname === '/') return 'home';
  return null;
}

function NavBottomButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={[
        'flex h-full w-full min-w-0 flex-col items-center justify-center gap-0 px-[8px] text-center',
        active
          ? 'text-[var(--color-37demo-red)]'
          : 'text-[var(--color-gray-500)]',
      ].join(' ')}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
    >
      <span className="h-[20px] w-[20px] shrink-0">{icon}</span>
      <span className="title_m_12 leading-[1] whitespace-normal">{label}</span>
    </button>
  );
}

export default function NavBottom({ active, onNavigate }: NavBottomProps) {
  const pathname = usePathname();
  const router = useRouter();

  const resolvedActive = active ?? resolveActiveTab(pathname);

  const navigate = (tab: NavBottomTab) => {
    trackEvent('nav_click', { tab });

    if (onNavigate) {
      onNavigate(tab);
      return;
    }

    switch (tab) {
      case 'home':
        router.push('/');
        return;
      case 'product':
        router.push('/products');
        return;
      case 'leaflet':
        router.push('/leaflet');
        return;
      case 'homepage':
        trackEvent('outbound_click', {
          url: OFFICIAL_HOMEPAGE_URL,
          source: 'nav_bottom',
        });
        window.open(OFFICIAL_HOMEPAGE_URL, '_blank', 'noopener,noreferrer');
        return;
      default:
        return;
    }
  };

  return (
    <nav
      className="shadow_top grid h-[var(--nav-bottom-height)] grid-cols-4 px-[16px]"
      aria-label="하단 탭 내비게이션"
    >
      <NavBottomButton
        active={resolvedActive === 'home'}
        icon={
          resolvedActive === 'home' ? (
            <HomeFilledIcon width={20} height={20} />
          ) : (
            <HomeOutlineIcon width={20} height={20} />
          )
        }
        label="홈"
        onClick={() => navigate('home')}
      />
      <NavBottomButton
        active={resolvedActive === 'product'}
        icon={
          resolvedActive === 'product' ? (
            <ProductsFilledIcon width={20} height={20} />
          ) : (
            <ProductsOutlineIcon width={20} height={20} />
          )
        }
        label="프로덕트"
        onClick={() => navigate('product')}
      />
      <NavBottomButton
        active={resolvedActive === 'leaflet'}
        icon={
          resolvedActive === 'leaflet' ? (
            <LeafletFilledIcon width={20} height={20} />
          ) : (
            <LeafletOutlineIcon width={20} height={20} />
          )
        }
        label="리플렛"
        onClick={() => navigate('leaflet')}
      />
      <NavBottomButton
        active={false}
        icon={<OpenLinkIcon width={20} height={20} />}
        label="공식홈페이지"
        onClick={() => navigate('homepage')}
      />
    </nav>
  );
}
