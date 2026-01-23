import { ArrowLeftIcon } from '@/components/icons';
import { TouchArea } from '@/components/ui';

import LeafletStampQrMenu from './components/LeafletStampQrMenu.client';

export type NavTopProps =
  | {
      variant?: 'main';
      className?: string;
      showLeafletStampQrMenu?: boolean;
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
          'shadow_bottom bg-[var(--color-black-overlay)] p-[6px] backdrop-blur-md',
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

  const showQr = Boolean(props.showLeafletStampQrMenu);

  return (
    <header
      className={[
        'shadow_bottom relative h-[56px] w-full bg-[var(--color-black-overlay)] backdrop-blur-md',
        showQr ? '' : 'flex items-center justify-center',
        props.className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <img
        alt="SYSTEM UPDATE : SUNRISE"
        src="/assets/leaflet/icons/sunrise-text-mask.svg"
        className={
          showQr
            ? 'absolute top-1/2 left-[24px] h-[14.0996px] -translate-y-1/2'
            : 'h-[38.5px] w-[286px]'
        }
      />

      {showQr ? <LeafletStampQrMenu /> : null}
    </header>
  );
}
