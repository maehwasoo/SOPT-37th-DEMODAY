import type { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export default function QrIcon({
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
        d="M5.77734 18.2227H9.33301V14.5H11.1113V20H4V14.5H5.77734V18.2227ZM16.4443 20H14.667V18.2227H16.4443V20ZM20 20H18.2227V18.2227H20V20ZM14.667 18.2227H12.8887V16.4443H14.667V18.2227ZM18.2227 18.2227H16.4443V16.4443H18.2227V18.2227ZM16.4443 16.4443H14.667V14.5H16.4443V16.4443ZM20 16.4443H18.2227V14.5H20V16.4443ZM23 12H1V10.5H23V12ZM11.1113 8H9.33301V5.77734H5.77734V8H4V4H11.1113V8ZM20 8H18.2227V5.77734H14.667V8H12.8887V4H20V8Z"
        fill="currentColor"
      />
    </svg>
  );
}
