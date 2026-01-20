'use client';

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

import Link, { type LinkProps } from 'next/link';

export type ButtonShape = 'square' | 'round';

type ButtonBaseProps = {
  shape?: ButtonShape;
  leftIcon?: ReactNode;
  children: ReactNode;
  className?: string;
};

type ButtonAsButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLinkProps = ButtonBaseProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof ButtonBaseProps | 'href' | 'children' | 'type'
  > & {
    href: LinkProps['href'];
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export default function Button(props: ButtonProps) {
  const {
    shape = 'square',
    leftIcon,
    className,
    children,
    ...restProps
  } = props;

  const baseClassName =
    'head_b_18 inline-flex items-center justify-center gap-[8px] h-[56px] text-[var(--color-white)] bg-[var(--color-37demo-red)] active:bg-[var(--color-37demo-red-80)] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]';

  const shapeClassName =
    shape === 'round'
      ? 'rounded-[50px] px-[24px] py-[16px] w-fit'
      : 'rounded-[4px] w-full';

  const mergedClassName = [baseClassName, shapeClassName, className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {leftIcon ? (
        <span
          aria-hidden
          className="grid h-[24px] w-[24px] shrink-0 place-items-center"
        >
          {leftIcon}
        </span>
      ) : null}
      {children}
    </>
  );

  if ('href' in restProps && restProps.href !== undefined) {
    const { href, ...anchorProps } = restProps;

    return (
      <Link href={href} {...anchorProps} className={mergedClassName}>
        {content}
      </Link>
    );
  }

  // internal props stripping
  const { type = 'button', ...buttonProps } = restProps;

  return (
    <button {...buttonProps} className={mergedClassName} type={type}>
      {content}
    </button>
  );
}
