import type { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export default function ProductsFilledIcon({
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
        d="M4 11V4H11V11H4ZM4 20V13H11V20H4ZM13 11V4H20V11H13ZM13 20V13H20V20H13Z"
        fill="currentColor"
      />
    </svg>
  );
}
