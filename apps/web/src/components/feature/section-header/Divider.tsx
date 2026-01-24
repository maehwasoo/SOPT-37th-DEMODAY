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
        <span className="h-[16px] w-[16px] shrink-0 pt-[1.85px] pr-[3.73px] pb-[1.85px] pl-[3.41px]">
          <PlanningIcon width="100%" height="100%" className="size-full" />
        </span>
        <span className="h-[16px] w-[16px] shrink-0 pt-[4.53px] pr-[1.27px] pb-[4.4px] pl-[1.33px]">
          <DesignIcon width="100%" height="100%" className="size-full" />
        </span>
        <span className="h-[16px] w-[16px] shrink-0 pt-[2.4px] pr-[3.24px] pb-[2.88px] pl-[3.2px]">
          <AndroidIcon width="100%" height="100%" className="size-full" />
        </span>
        <span className="h-[16px] w-[16px] shrink-0 pt-[2.53px] pr-[2.53px] pb-[2.04px] pl-[2.4px]">
          <IosIcon width="100%" height="100%" className="size-full" />
        </span>
        <span className="h-[16px] w-[16px] shrink-0 pt-[3.93px] pr-[1.04px] pb-[4.02px] pl-[1.07px]">
          <WebIcon width="100%" height="100%" className="size-full" />
        </span>
        <span className="h-[16px] w-[16px] shrink-0 pt-[1.6px] pr-[4.8px] pb-[1.67px] pl-[4.93px]">
          <ServerIcon width="100%" height="100%" className="size-full" />
        </span>
      </div>
      <DividerDotLine />
    </div>
  );
}
