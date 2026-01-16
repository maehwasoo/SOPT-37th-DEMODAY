'use client';

import type { HTMLAttributes } from 'react';

export type ProgressBarProps = {
  value: number;
  min?: number;
  max?: number;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export default function ProgressBar({
  value,
  min = 0,
  max = 100,
  className,
  ...props
}: ProgressBarProps) {
  const denominator = max - min;
  const ratio = denominator > 0 ? (value - min) / denominator : 0;
  const percent = Math.min(Math.max(ratio, 0), 1) * 100;

  const clampedValue = Math.min(Math.max(value, min), max);

  const mergedClassName = ['relative h-[8px] w-full', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      {...props}
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={clampedValue}
      className={mergedClassName}
      role="progressbar"
    >
      <div
        aria-hidden
        className="absolute inset-0 rounded-[25px] bg-[var(--color-gray-900)]"
      />
      <div
        aria-hidden
        className="absolute top-0 left-0 h-full rounded-[25px] bg-[var(--color-37demo-red)] shadow-[0px_0px_8px_0px_var(--color-37demo-red)]"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
