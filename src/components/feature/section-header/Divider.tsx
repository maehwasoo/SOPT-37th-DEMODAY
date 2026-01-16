import type { HTMLAttributes } from 'react';

import {
  AndroidIcon,
  DesignIcon,
  IosIcon,
  PlanningIcon,
  ServerIcon,
  WebIcon,
} from '@/components/icons';

type DividerProps = {
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

function DividerDotLine() {
  return (
    <svg
      width={92}
      height={2}
      viewBox="0 0 92 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="1" cy="1" r="1" fill="currentColor" />
      <circle cx="7" cy="1" r="1" fill="currentColor" />
      <circle cx="13" cy="1" r="1" fill="currentColor" />
      <circle cx="19" cy="1" r="1" fill="currentColor" />
      <circle cx="25" cy="1" r="1" fill="currentColor" />
      <circle cx="31" cy="1" r="1" fill="currentColor" />
      <circle cx="37" cy="1" r="1" fill="currentColor" />
      <circle cx="43" cy="1" r="1" fill="currentColor" />
      <circle cx="49" cy="1" r="1" fill="currentColor" />
      <circle cx="55" cy="1" r="1" fill="currentColor" />
      <circle cx="61" cy="1" r="1" fill="currentColor" />
      <circle cx="67" cy="1" r="1" fill="currentColor" />
      <circle cx="73" cy="1" r="1" fill="currentColor" />
      <circle cx="79" cy="1" r="1" fill="currentColor" />
      <circle cx="85" cy="1" r="1" fill="currentColor" />
      <circle cx="91" cy="1" r="1" fill="currentColor" />
    </svg>
  );
}

export default function Divider({ className, ...props }: DividerProps) {
  const baseClassName =
    'flex items-center justify-center gap-[8px] text-[var(--color-37demo-red)]';

  const mergedClassName = [baseClassName, className].filter(Boolean).join(' ');

  return (
    <div className={mergedClassName} {...props}>
      <DividerDotLine />
      <div className="flex items-center gap-px">
        <PlanningIcon />
        <DesignIcon />
        <AndroidIcon />
        <IosIcon />
        <WebIcon />
        <ServerIcon />
      </div>
      <DividerDotLine />
    </div>
  );
}
