'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonShape = 'square' | 'round';

export type ButtonProps = {
  shape?: ButtonShape;
  leftIcon?: ReactNode;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  shape = 'square',
  leftIcon,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  const baseClassName =
    'head_b_18 inline-flex items-center justify-center gap-[8px] h-[56px] text-[var(--color-white)] bg-[var(--color-37demo-red)] active:bg-[var(--color-37demo-red-80)] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]';

  const shapeClassName =
    shape === 'round'
      ? 'rounded-[50px] px-[24px] py-[16px] w-fit'
      : 'rounded-[4px] w-full';

  const mergedClassName = [baseClassName, shapeClassName, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={mergedClassName} type={type} {...props}>
      {leftIcon ? (
        <span
          aria-hidden
          className="grid h-[24px] w-[24px] shrink-0 place-items-center"
        >
          {leftIcon}
        </span>
      ) : null}
      {children}
    </button>
  );
}
