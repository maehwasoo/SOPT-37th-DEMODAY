import type { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export default function ArrowRightIcon({
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
        d="M14.0254 21L23 12L14.0254 3L13 4.02834L20.9491 12L13 19.9717L14.0254 21Z"
        fill="currentColor"
      />
    </svg>
  );
}
