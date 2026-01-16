import type { ReactNode } from 'react';

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

type NavBottomProps = {
  // active tab key
  active?: NavBottomActiveTab;
  // navigation handler
  onNavigate?: (tab: NavBottomTab) => void;
};

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
        'flex w-[68px] flex-col items-center gap-px px-[22px] py-[12px] text-center',
        active
          ? 'text-[var(--color-37demo-red)]'
          : 'text-[var(--color-gray-500)]',
      ].join(' ')}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
    >
      <span className="h-[24px] w-[24px]">{icon}</span>
      <span className="title_m_12 whitespace-nowrap">{label}</span>
    </button>
  );
}

export default function NavBottom({
  active = 'home',
  onNavigate,
}: NavBottomProps) {
  return (
    <nav
      className="shadow_top flex h-[80px] items-start justify-center bg-[var(--color-black)] px-[32px] py-[7px]"
      aria-label="하단 탭 내비게이션"
    >
      <div className="flex items-center gap-[10px]">
        <NavBottomButton
          active={active === 'home'}
          icon={active === 'home' ? <HomeFilledIcon /> : <HomeOutlineIcon />}
          label="홈"
          onClick={() => onNavigate?.('home')}
        />
        <NavBottomButton
          active={active === 'product'}
          icon={
            active === 'product' ? (
              <ProductsFilledIcon />
            ) : (
              <ProductsOutlineIcon />
            )
          }
          label="프로덕트"
          onClick={() => onNavigate?.('product')}
        />
        <NavBottomButton
          active={active === 'leaflet'}
          icon={
            active === 'leaflet' ? (
              <LeafletFilledIcon />
            ) : (
              <LeafletOutlineIcon />
            )
          }
          label="리플렛"
          onClick={() => onNavigate?.('leaflet')}
        />
        <NavBottomButton
          active={false}
          icon={<OpenLinkIcon />}
          label="공식홈페이지"
          onClick={() => onNavigate?.('homepage')}
        />
      </div>
    </nav>
  );
}
