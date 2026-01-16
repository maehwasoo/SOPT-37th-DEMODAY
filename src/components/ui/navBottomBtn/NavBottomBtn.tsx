'use client';

import { HomeFilledIcon, HomeOutlineIcon } from '@/components/icons';

export type NavBottomBtnState = 'active' | 'inactive' | 'pressed';

type NavBottomBtnProps = {
  state?: NavBottomBtnState;
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function NavBottomBtn({
  state = 'inactive',
  label = '홈',
  onClick,
}: NavBottomBtnProps) {
  const isActive = state === 'active';
  const isPressed = state === 'pressed';

  const colorClassName = isActive
    ? 'text-[var(--color-37demo-red)]'
    : isPressed
      ? 'text-[var(--color-gray-800)]'
      : 'text-[var(--color-gray-500)]';

  const cursorClassName = isActive ? '' : 'cursor-pointer';

  return (
    <button
      type="button"
      className={[
        'flex w-[68px] flex-col items-center gap-px px-[22px] py-[12px]',
        'border-0 bg-transparent',
        colorClassName,
        cursorClassName,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-current={isActive ? 'page' : undefined}
      onClick={onClick}
    >
      {isActive ? (
        <HomeFilledIcon width={24} height={24} />
      ) : (
        <HomeOutlineIcon width={24} height={24} />
      )}
      <span className="title_m_12 text-center">{label}</span>
    </button>
  );
}
