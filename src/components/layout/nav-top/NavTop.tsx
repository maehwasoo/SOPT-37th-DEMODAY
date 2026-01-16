import { ArrowLeftIcon } from '@/components/icons';
import { TouchArea } from '@/components/ui';

export type NavTopProps =
  | {
      variant?: 'main';
      className?: string;
    }
  | {
      variant: 'sub';
      title: string;
      onBack?: () => void;
      className?: string;
    };

export default function NavTop(props: NavTopProps) {
  if (props.variant === 'sub') {
    const onBack = props.onBack;

    return (
      <header
        className={[
          'shadow_bottom bg-[var(--color-black)] p-[6px]',
          props.className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="flex w-full items-center gap-[4px]">
          <TouchArea
            aria-label="뒤로가기"
            className="text-[var(--color-white)]"
            icon={<ArrowLeftIcon />}
            onClick={onBack ? () => onBack() : undefined}
          />
          <p className="title_m_18 text-[var(--color-white)]">{props.title}</p>
        </div>
      </header>
    );
  }

  return (
    <header
      className={[
        'shadow_bottom flex h-[56px] w-full items-center justify-center bg-[var(--color-black)]',
        props.className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="black_bk_20 text-center">SYSTEM UPDATE : SUNRISE</div>
    </header>
  );
}
