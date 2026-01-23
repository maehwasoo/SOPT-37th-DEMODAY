import type { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export default function ArrowLeftIcon({
  width = 24,
  height = 24,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
  ...props
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ?? (ariaLabel ? undefined : true)}
      {...props}
    >
      <path
        d="M9.97457 21L1 12L9.97457 3L11 4.02834L3.05086 12L11 19.9717L9.97457 21Z"
        fill="currentColor"
      />
    </svg>
  );
}
