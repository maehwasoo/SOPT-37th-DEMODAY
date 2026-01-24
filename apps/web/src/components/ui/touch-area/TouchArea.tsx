import {
  cloneElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type SVGProps,
} from 'react';

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  icon: ReactElement<SVGProps<SVGSVGElement>>;
  'aria-label': string;
};

export default function TouchArea({
  icon,
  className,
  type = 'button',
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={[
        'inline-flex size-[44px] items-center justify-center p-[10px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {cloneElement(icon, { width: 24, height: 24 })}
    </button>
  );
}
