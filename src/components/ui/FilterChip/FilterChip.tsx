'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type FilterChipProps = {
  active: boolean;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-pressed' | 'children'>;

export default function FilterChip({
  active,
  className,
  children,
  type = 'button',
  ...props
}: FilterChipProps) {
  const baseClassName =
    'title_m_12 inline-flex items-center justify-center rounded-[50px] border border-current px-[22px] py-[12px] bg-transparent disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]';

  const stateClassName = active
    ? 'text-[var(--color-37demo-red)]'
    : 'text-[var(--color-gray-500)]';

  const pressedClassName = 'active:text-[var(--color-gray-800)]';

  const mergedClassName = [
    baseClassName,
    stateClassName,
    pressedClassName,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      aria-pressed={active}
      className={mergedClassName}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
