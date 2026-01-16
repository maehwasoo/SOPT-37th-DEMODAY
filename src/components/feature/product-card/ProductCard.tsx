'use client';

import type { ButtonHTMLAttributes } from 'react';

export type ProductCardProps = {
  thumbnailSrc: string;
  thumbnailAlt?: string;
  title: string;
  category: string;
  description: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export default function ProductCard({
  thumbnailSrc,
  thumbnailAlt = '',
  title,
  category,
  description,
  className,
  type = 'button',
  ...props
}: ProductCardProps) {
  const baseClassName = [
    'flex w-[163px] flex-col items-center gap-[10px] overflow-hidden rounded-[2px]',
    'border-0 px-0 pb-[6px] pt-0',
    'cursor-pointer text-left',
    'bg-[var(--color-gray-900)] active:bg-[var(--color-black)] active:opacity-80',
    'disabled:cursor-not-allowed disabled:opacity-40',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]',
  ].join(' ');

  const mergedClassName = [baseClassName, className].filter(Boolean).join(' ');

  return (
    <button className={mergedClassName} type={type} {...props}>
      {/* thumbnail */}
      <div className="h-[92px] w-full shrink-0">
        <img
          alt={thumbnailAlt}
          className="size-full object-cover"
          src={thumbnailSrc}
        />
      </div>

      {/* content */}
      <div className="flex w-[139px] shrink-0 flex-col items-start gap-[8px]">
        <div className="flex w-full shrink-0 items-center gap-[8px]">
          <p className="head_b_16 text-[var(--color-white)]">{title}</p>
          <span className="body_r_12 shrink-0 rounded-[2px] bg-[var(--color-black)] px-[8px] py-[2px] text-[var(--color-gray-300)]">
            {category}
          </span>
        </div>
        <p className="body_r_14 h-[40px] w-full shrink-0 overflow-hidden text-[#d9e0e1]">
          {description}
        </p>
      </div>
    </button>
  );
}
