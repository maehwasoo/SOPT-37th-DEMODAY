export type NavBottomBtnState = 'active' | 'inactive' | 'pressed';

type NavBottomBtnProps = {
  state?: NavBottomBtnState;
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function HomeIconOutline({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 15.7885"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 14.7885H4.69225V8.904H9.30775V14.7885H13V5.7885L7 1.25L1 5.7885V14.7885ZM0 15.7885V5.2885L7 0L14 5.2885V15.7885H8.30775V9.904H5.69225V15.7885H0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function HomeIconFilled({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 15.7885"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 15.7885V5.2885L7 0L14 5.2885V15.7885H8.30775V9.904H5.69225V15.7885H0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function NavBottomBtn({
  state = 'inactive',
  label = '홈',
  onClick,
}: NavBottomBtnProps) {
  const isActive = state === 'active';
  const isPressed = state === 'pressed';

  const colorClassName = isActive
    ? 'text-[var(--color-37demo-red)]'
    : isPressed
      ? 'text-[var(--color-gray-800)]'
      : 'text-[var(--color-gray-500)]';

  const cursorClassName = isActive ? '' : 'cursor-pointer';

  return (
    <button
      type="button"
      className={[
        'flex w-[68px] flex-col items-center gap-px px-[22px] py-[12px]',
        'border-0 bg-transparent',
        colorClassName,
        cursorClassName,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-current={isActive ? 'page' : undefined}
      onClick={onClick}
    >
      {isActive ? (
        <HomeIconFilled className="size-[24px]" />
      ) : (
        <HomeIconOutline className="size-[24px]" />
      )}
      <span className="title_m_12 text-center">{label}</span>
    </button>
  );
}
