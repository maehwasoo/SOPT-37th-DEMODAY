import type { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export default function LeafletOutlineIcon({
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
        d="M15 19.9241L9 17.8241L5.04225 19.3549C4.78592 19.4499 4.54808 19.422 4.32875 19.2714C4.10958 19.1207 4 18.9088 4 18.6356V6.40488C4 6.22671 4.04325 6.06396 4.12975 5.91662C4.21625 5.76912 4.34225 5.66654 4.50775 5.60887L9 4.07812L15 6.17813L18.9578 4.64737C19.2141 4.55237 19.4519 4.57062 19.6712 4.70212C19.8904 4.83346 20 5.02929 20 5.28962V17.6741C20 17.8651 19.9471 18.0312 19.8413 18.1724C19.7356 18.3134 19.5937 18.4127 19.4155 18.4704L15 19.9241ZM14.5 18.7049V7.00488L9.5 5.25887V16.9589L14.5 18.7049ZM15.5 18.7049L19 17.5511V5.70112L15.5 7.00488V18.7049ZM5 18.3011L8.5 16.9589V5.25887L5 6.45112V18.3011Z"
        fill="currentColor"
      />
    </svg>
  );
}
