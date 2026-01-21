import type { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export default function HomeFilledIcon({
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
        d="M5 19.9994V9.49944L12 4.21094L19 9.49944V19.9994H13.3077V14.1149H10.6923V19.9994H5Z"
        fill="currentColor"
      />
    </svg>
  );
}
