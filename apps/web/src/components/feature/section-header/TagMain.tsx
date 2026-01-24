import type { HTMLAttributes, ReactNode } from 'react';

export type TagMainProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLHeadingElement>, 'children'>;

export default function TagMain({
  children,
  className,
  ...props
}: TagMainProps) {
  const baseClassName =
    'head_b_18 flex items-center justify-center bg-[var(--color-gray-900)] px-[12px] py-[4px] text-[var(--color-white)]';

  const mergedClassName = [baseClassName, className].filter(Boolean).join(' ');

  return (
    <h2 className={mergedClassName} {...props}>
      {children}
    </h2>
  );
}
