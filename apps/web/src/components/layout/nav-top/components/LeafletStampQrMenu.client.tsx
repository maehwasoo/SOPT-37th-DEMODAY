'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { QrIcon } from '@/components/icons';
import { TouchArea } from '@/components/ui';
import { ApiError, leafletStampCodeApi } from '@/lib/api';
import { trackEvent } from '@/lib/ga';

type Status = 'idle' | 'loading' | 'ready' | 'error';

export default function LeafletStampQrMenu() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [stampKey, setStampKey] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  const rootRef = useRef<HTMLDivElement | null>(null);

  const downloadable = useMemo(() => Boolean(qrDataUrl), [qrDataUrl]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setStatus('loading');

      try {
        const response = await leafletStampCodeApi();
        if (cancelled) return;

        setStampKey(response.stampKey);

        const qrValue = `${window.location.origin}/leaflet?code=${encodeURIComponent(response.code)}`;
        const QRCode = await import('qrcode');
        const dataUrl = await QRCode.toDataURL(qrValue, {
          width: 512,
          margin: 0,
          color: { dark: '#000000', light: '#FFFFFF' },
        });

        if (cancelled) return;
        setQrDataUrl(dataUrl);
        setStatus('ready');
      } catch (error) {
        if (cancelled) return;

        // not logged in or not eligible (e.g. external)
        if (
          error instanceof ApiError &&
          (error.status === 401 || error.status === 404)
        ) {
          setStatus('error');
          return;
        }

        setStatus('error');
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onMouseDown = (event: MouseEvent) => {
      const root = rootRef.current;
      if (!root) return;

      if (event.target instanceof Node && !root.contains(event.target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const onDownload = () => {
    if (!qrDataUrl) return;

    trackEvent('leaflet_qr_download', { stamp_key: stampKey ?? undefined });

    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = stampKey ? `leaflet-${stampKey}-qr.png` : 'leaflet-qr.png';
    a.click();
  };

  if (status === 'error' || status === 'idle') return null;

  return (
    <div ref={rootRef} className="absolute top-0 right-0 h-full">
      <TouchArea
        aria-label="기록 인증 QR 코드"
        className="absolute top-1/2 right-[20px] -translate-y-1/2 text-[var(--color-white)]"
        icon={<QrIcon />}
        onClick={() => {
          const nextOpen = !open;
          setOpen(nextOpen);
          trackEvent(
            nextOpen ? 'leaflet_qr_menu_open' : 'leaflet_qr_menu_close'
          );
        }}
      />

      {open ? (
        <div
          className={[
            'shadow_bottom absolute top-[56px] right-0 z-[70] h-[219px] w-[167px] overflow-hidden',
            'flex flex-col items-center gap-[16px] bg-[var(--color-black)] px-[16px] pt-[12px] pb-[16px]',
            'rounded-bl-[32px]',
          ].join(' ')}
          role="dialog"
          aria-label="기록 인증 QR 코드"
        >
          <div className="flex w-full items-center gap-[8px]">
            <QrIcon className="h-[24px] w-[24px] text-[var(--color-white)]" />
            <p className="head_b_16 text-[var(--color-white)]">
              기록 인증 QR코드
            </p>
          </div>

          <div className="flex size-[94px] items-center justify-center bg-[var(--color-white)] p-[2px]">
            {qrDataUrl ? (
              <img
                alt="기록 인증 QR 코드"
                className="size-full"
                src={qrDataUrl}
              />
            ) : (
              <div className="size-full animate-pulse bg-[var(--color-gray-200)]" />
            )}
          </div>

          <button
            type="button"
            className={[
              'head_b_16 h-[41px] w-[135px] rounded-[100px] text-center',
              'bg-[var(--color-37demo-red)] text-[var(--color-white)]',
              !downloadable ? 'cursor-not-allowed opacity-50' : '',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={onDownload}
            disabled={!downloadable}
          >
            QR 다운로드
          </button>
        </div>
      ) : null}
    </div>
  );
}
