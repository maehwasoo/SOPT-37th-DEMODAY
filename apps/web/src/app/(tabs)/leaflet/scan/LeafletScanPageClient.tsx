'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import NavTop from '@/components/layout/nav-top/NavTop';
import { trackEvent } from '@/lib/ga';

type ScanStatus = 'idle' | 'scanning' | 'unsupported' | 'error';

function extractLeafletCode(value: string, origin: string): string | null {
  const text = value.trim();
  if (!text) return null;

  // Absolute URL
  if (text.includes('://')) {
    try {
      const url = new URL(text);
      return url.searchParams.get('code')?.trim() || text;
    } catch {
      return text;
    }
  }

  // Relative URL (/leaflet?code=...) or any path-like string
  if (text.startsWith('/') || text.includes('?')) {
    try {
      const url = new URL(text, origin);
      return url.searchParams.get('code')?.trim() || text;
    } catch {
      return text;
    }
  }

  // Plain code
  return text;
}

export default function LeafletScanPageClient() {
  const router = useRouter();

  const [status, setStatus] = useState<ScanStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsRef = useRef<{ stop: () => void } | null>(null);
  const scannedRef = useRef(false);

  const origin = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return window.location.origin;
  }, []);

  useEffect(() => {
    router.prefetch('/login');
    router.prefetch('/leaflet');
  }, [router]);

  const goLeafletWithCode = useCallback(
    (raw: string) => {
      const code = extractLeafletCode(raw, origin);
      if (!code) return;

      trackEvent('leaflet_scan_success', { method: 'camera' });
      router.replace(`/leaflet?code=${encodeURIComponent(code)}`);
    },
    [origin, router]
  );

  useEffect(() => {
    let cancelled = false;

    const start = async () => {
      setErrorMessage(null);

      if (typeof window === 'undefined') return;
      if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
        trackEvent('leaflet_scan_unsupported', { reason: 'insecure_context' });
        setStatus('unsupported');
        setErrorMessage('카메라는 HTTPS 환경에서만 사용할 수 있습니다.');
        return;
      }

      const video = videoRef.current;
      if (!video) return;

      setStatus('scanning');
      trackEvent('leaflet_scan_start');

      try {
        const { BrowserQRCodeReader } = await import('@zxing/browser');
        const reader = new BrowserQRCodeReader();

        const controls = await reader.decodeFromVideoDevice(
          undefined,
          video,
          (result, error, controls) => {
            if (cancelled) return;
            controlsRef.current = controls;

            if (result && !scannedRef.current) {
              scannedRef.current = true;
              controls.stop();
              goLeafletWithCode(result.getText());
              return;
            }

            // ignore scan errors while scanning
            void error;
          }
        );

        if (cancelled) {
          controls.stop();
          return;
        }

        controlsRef.current = controls;
      } catch (error) {
        if (cancelled) return;
        trackEvent('leaflet_scan_error');
        setStatus('error');
        setErrorMessage(
          '카메라 스캔을 시작할 수 없습니다. 카메라 권한을 확인해 주세요.'
        );
        void error;
      }
    };

    void start();

    return () => {
      cancelled = true;
      controlsRef.current?.stop();
    };
  }, [goLeafletWithCode]);

  return (
    <main className="bg-[var(--color-black)] pt-[var(--safe-area-top)]">
      <NavTop
        variant="sub"
        title="기록 스캔"
        onBack={() => {
          controlsRef.current?.stop();
          router.back();
        }}
      />

      <div className="px-[16px] pt-[16px]">
        <div className="flex flex-col gap-[12px]">
          <p className="body_r_14 text-[var(--color-gray-200)]">
            카메라로 QR을 스캔하면 자동으로 리플렛에 기록됩니다.
          </p>

          <div className="overflow-hidden rounded-[12px] bg-[var(--color-gray-900)] p-[12px]">
            <div className="relative aspect-square w-full overflow-hidden rounded-[8px] bg-[var(--color-black)]">
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                muted
                playsInline
              />

              {status !== 'scanning' ? (
                <div className="absolute inset-0 flex items-center justify-center px-[16px] text-center">
                  <p className="body_r_14 text-[var(--color-gray-200)]">
                    {errorMessage ?? '카메라를 준비 중입니다.'}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
