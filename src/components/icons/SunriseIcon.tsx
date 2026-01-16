import type { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export default function SunriseIcon({
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
      <path d="M12 5V11.0085" stroke="currentColor" strokeLinejoin="round" />
      <path
        d="M6.55419 10.4922L8.43981 12.4598"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M4 15.9916H6.66667"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M17.3334 15.9916H20"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M17.4699 10.5189L15.7577 12.3393"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path d="M20 18.6582H4" stroke="currentColor" strokeLinejoin="round" />
      <path
        d="M9.33337 7.66667L12 5L14.6667 7.66667"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M14.6667 15.9915C14.6667 15.2843 14.3858 14.606 13.8857 14.1059C13.3856 13.6058 12.7073 13.3248 12 13.3248C11.2928 13.3248 10.6145 13.6058 10.1144 14.1059C9.61433 14.606 9.33337 15.2843 9.33337 15.9915"
        stroke="currentColor"
      />
    </svg>
  );
}
