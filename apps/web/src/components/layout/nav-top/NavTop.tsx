import Image from 'next/image';

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
            onClick={onBack}
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
      <div className="relative h-[16px] w-[286px]">
        <Image
          src="/assets/figma/main/img_logo.png"
          alt="SYSTEM UPDATE : SUNRISE"
          fill
          className="object-contain"
          sizes="286px"
        />
      </div>
    </header>
  );
}
