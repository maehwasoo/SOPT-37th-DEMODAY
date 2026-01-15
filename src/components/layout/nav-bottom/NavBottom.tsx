import type { ReactNode } from 'react';

type NavBottomTab = 'home' | 'product' | 'leaflet' | 'homepage';
type NavBottomActiveTab = Exclude<NavBottomTab, 'homepage'>;

type NavBottomProps = {
  // active tab key
  active?: NavBottomActiveTab;
  // navigation handler
  onNavigate?: (tab: NavBottomTab) => void;
};

function HomeIcon({ active }: { active: boolean }) {
  return active ? (
    <svg
      aria-hidden
      viewBox="0 0 14 15.7885"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 15.7885V5.2885L7 0L14 5.2885V15.7885H8.30775V9.904H5.69225V15.7885H0Z"
        fill="currentColor"
      />
    </svg>
  ) : (
    <svg
      aria-hidden
      viewBox="0 0 14 15.7885"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 14.7885H4.69225V8.904H9.30775V14.7885H13V5.7885L7 1.25L1 5.7885V14.7885ZM0 15.7885V5.2885L7 0L14 5.2885V15.7885H8.30775V9.904H5.69225V15.7885H0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ProductIcon({ active }: { active: boolean }) {
  return active ? (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 7V0H7V7H0ZM0 16V9H7V16H0ZM9 7V0H16V7H9ZM9 16V9H16V16H9Z"
        fill="currentColor"
      />
    </svg>
  ) : (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 7V0H7V7H0ZM0 16V9H7V16H0ZM9 7V0H16V7H9ZM9 16V9H16V16H9ZM1 6H6V1H1V6ZM10 6H15V1H10V6ZM10 15H15V10H10V15ZM1 15H6V10H1V15Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LeafletIcon({ active }: { active: boolean }) {
  return active ? (
    <svg
      aria-hidden
      viewBox="0 0 16 15.846"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 15.846L5 13.746L1.04225 15.2767C0.785917 15.3717 0.548083 15.3439 0.32875 15.1932C0.109583 15.0426 0 14.8307 0 14.5575V2.32675C0 2.14858 0.0432501 1.98583 0.12975 1.8385C0.21625 1.691 0.34225 1.58842 0.50775 1.53075L5 0L11 2.1L14.9578 0.569249C15.2141 0.474249 15.4519 0.492499 15.6712 0.623999C15.8904 0.755332 16 0.951166 16 1.2115V13.596C16 13.787 15.9471 13.9531 15.8413 14.0943C15.7356 14.2353 15.5937 14.3346 15.4155 14.3923L11 15.846ZM10.5 14.6267V2.92675L5.5 1.18075V12.8807L10.5 14.6267Z"
        fill="currentColor"
      />
    </svg>
  ) : (
    <svg
      aria-hidden
      viewBox="0 0 16 15.846"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 15.846L5 13.746L1.04225 15.2767C0.785917 15.3717 0.548083 15.3439 0.32875 15.1932C0.109583 15.0426 0 14.8307 0 14.5575V2.32675C0 2.14858 0.0432501 1.98583 0.12975 1.8385C0.21625 1.691 0.34225 1.58842 0.50775 1.53075L5 0L11 2.1L14.9578 0.569249C15.2141 0.474249 15.4519 0.492499 15.6712 0.623999C15.8904 0.755332 16 0.951166 16 1.2115V13.596C16 13.787 15.9471 13.9531 15.8413 14.0943C15.7356 14.2353 15.5937 14.3346 15.4155 14.3923L11 15.846ZM10.5 14.6267V2.92675L5.5 1.18075V12.8807L10.5 14.6267ZM11.5 14.6267L15 13.473V1.623L11.5 2.92675V14.6267ZM1 14.223L4.5 12.8807V1.18075L1 2.373V14.223Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.6155 16C1.15517 16 0.770833 15.8458 0.4625 15.5375C0.154167 15.2292 0 14.8448 0 14.3845V1.6155C0 1.15517 0.154167 0.770833 0.4625 0.4625C0.770833 0.154167 1.15517 0 1.6155 0H7.23075V1H1.6155C1.4615 1 1.32042 1.06408 1.19225 1.19225C1.06408 1.32042 1 1.4615 1 1.6155V14.3845C1 14.5385 1.06408 14.6796 1.19225 14.8078C1.32042 14.9359 1.4615 15 1.6155 15H14.3845C14.5385 15 14.6796 14.9359 14.8078 14.8078C14.9359 14.6796 15 14.5385 15 14.3845V8.76925H16V14.3845C16 14.8448 15.8458 15.2292 15.5375 15.5375C15.2292 15.8458 14.8448 16 14.3845 16H1.6155ZM5.7385 10.9692L5.03075 10.2615L14.2923 1H10V0H16V6H15V1.70775L5.7385 10.9692Z"
        fill="currentColor"
      />
    </svg>
  );
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
        'flex w-[68px] flex-col items-center gap-px px-[22px] py-[12px] text-center',
        active ? 'text-[var(--color-37demo-red)]' : 'text-[var(--color-gray-500)]',
      ].join(' ')}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
    >
      <span className="h-[24px] w-[24px]">{icon}</span>
      <span className="title_m_12">{label}</span>
    </button>
  );
}

export default function NavBottom({ active = 'home', onNavigate }: NavBottomProps) {
  return (
    <nav
      className="shadow_top flex h-[80px] items-start justify-center bg-[var(--color-black)] px-[32px] py-[7px]"
      aria-label="하단 탭 내비게이션"
    >
      <div className="flex items-center gap-[10px]">
        <NavBottomButton
          active={active === 'home'}
          icon={<HomeIcon active={active === 'home'} />}
          label="홈"
          onClick={() => onNavigate?.('home')}
        />
        <NavBottomButton
          active={active === 'product'}
          icon={<ProductIcon active={active === 'product'} />}
          label="프로덕트"
          onClick={() => onNavigate?.('product')}
        />
        <NavBottomButton
          active={active === 'leaflet'}
          icon={<LeafletIcon active={active === 'leaflet'} />}
          label="리플렛"
          onClick={() => onNavigate?.('leaflet')}
        />
        <NavBottomButton
          active={false}
          icon={<ExternalLinkIcon />}
          label="공식홈페이지"
          onClick={() => onNavigate?.('homepage')}
        />
      </div>
    </nav>
  );
}
