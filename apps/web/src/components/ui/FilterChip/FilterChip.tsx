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
    'body_r_14 inline-flex cursor-pointer items-center justify-center h-[28px] rounded-[40px] px-[16px] py-[4px] whitespace-nowrap border border-transparent disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]';

  const stateClassName = active
    ? 'bg-[var(--color-37demo-red-40)] text-[var(--color-white)] border-[var(--color-37demo-red)]'
    : 'bg-[var(--color-gray-900)] text-[var(--color-gray-500)] active:bg-[var(--color-black)] active:border-[var(--color-gray-700)]';

  const mergedClassName = [baseClassName, stateClassName, className]
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
