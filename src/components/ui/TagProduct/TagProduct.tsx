import type { HTMLAttributes, ReactNode } from 'react';

export type TagProductProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children'>;

export default function TagProduct({
  children,
  className,
  ...props
}: TagProductProps) {
  // Category tag
  const baseClassName =
    'body_r_12 inline-flex items-center justify-center whitespace-nowrap rounded-[2px] bg-[var(--color-black)] px-[8px] py-[2px] text-[var(--color-gray-300)]';

  const mergedClassName = [baseClassName, className].filter(Boolean).join(' ');

  return (
    <span className={mergedClassName} {...props}>
      {children}
    </span>
  );
}
