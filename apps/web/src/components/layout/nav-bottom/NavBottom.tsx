'use client';

import type { ReactNode } from 'react';

import { usePathname, useRouter } from 'next/navigation';

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
        'flex w-full min-w-0 flex-col items-center gap-px px-[8px] py-[12px] text-center',
        active
          ? 'text-[var(--color-37demo-red)]'
          : 'text-[var(--color-gray-500)]',
      ].join(' ')}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
    >
      <span className="h-[24px] w-[24px] shrink-0">{icon}</span>
      <span className="title_m_12 leading-[1.2] whitespace-normal">
        {label}
      </span>
    </button>
  );
}

export default function NavBottom({ active, onNavigate }: NavBottomProps) {
  const pathname = usePathname();
  const router = useRouter();

  const resolvedActive = active ?? resolveActiveTab(pathname);

  const navigate = (tab: NavBottomTab) => {
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
        window.open(OFFICIAL_HOMEPAGE_URL, '_blank', 'noopener,noreferrer');
        return;
      default:
        return;
    }
  };

  return (
    <nav
      className="shadow_top grid h-[var(--nav-bottom-height)] grid-cols-4 bg-[var(--color-black)] px-[16px]"
      aria-label="하단 탭 내비게이션"
    >
      <NavBottomButton
        active={resolvedActive === 'home'}
        icon={
          resolvedActive === 'home' ? <HomeFilledIcon /> : <HomeOutlineIcon />
        }
        label="홈"
        onClick={() => navigate('home')}
      />
      <NavBottomButton
        active={resolvedActive === 'product'}
        icon={
          resolvedActive === 'product' ? (
            <ProductsFilledIcon />
          ) : (
            <ProductsOutlineIcon />
          )
        }
        label="프로덕트"
        onClick={() => navigate('product')}
      />
      <NavBottomButton
        active={resolvedActive === 'leaflet'}
        icon={
          resolvedActive === 'leaflet' ? (
            <LeafletFilledIcon />
          ) : (
            <LeafletOutlineIcon />
          )
        }
        label="리플렛"
        onClick={() => navigate('leaflet')}
      />
      <NavBottomButton
        active={false}
        icon={<OpenLinkIcon />}
        label="공식홈페이지"
        onClick={() => navigate('homepage')}
      />
    </nav>
  );
}
