'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  LEAFLET_STAMPS,
  type LeafletStampKey,
} from '@/components/feature/leaflet-stamp/leafletStamp.constants';
import LeafletStampScreen from '@/components/feature/leaflet-stamp/LeafletStampScreen';
import {
  ApiError,
  isApiAvailable,
  leafletClaimApi,
  leafletProgressApi,
} from '@/lib/api';
import { trackEvent } from '@/lib/ga';

type ToastState = {
  variant: 'info' | 'error';
  message: string;
  actionLabel?: string;
} | null;

function isLeafletStampKey(value: string): value is LeafletStampKey {
  const known = new Set(LEAFLET_STAMPS.map((s) => s.key));
  return known.has(value as LeafletStampKey);
}

const LEAFLET_API_AVAILABLE = isApiAvailable();

export default function LeafletPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    router.prefetch('/login');
    router.prefetch('/leaflet/scan');
  }, [router]);

  const [pendingCode, setPendingCode] = useState(() => {
    const raw = searchParams.get('code') ?? '';
    return raw.trim();
  });

  const [progress, setProgress] = useState<{
    totalCount: number;
    completedCount: number;
    completedStampKeys: string[];
  } | null>(null);

  const [toast, setToast] = useState<ToastState>(null);
  const retryRef = useRef<(() => void) | null>(null);

  const [loading, setLoading] = useState(false);
  const [completeHandleDown, setCompleteHandleDown] = useState(false);

  const nextPath = useMemo(() => {
    if (pendingCode) {
      return `${pathname}?code=${encodeURIComponent(pendingCode)}`;
    }
    return pathname;
  }, [pathname, pendingCode]);

  const showToast = useCallback((value: ToastState, autoHideMs = 2500) => {
    setToast(value);
    if (!value) return;

    window.setTimeout(() => {
      setToast((current) => (current === value ? null : current));
    }, autoHideMs);
  }, []);

  const redirectToLogin = useCallback(() => {
    trackEvent('auth_redirect', { source: 'leaflet' });
    router.replace(`/login?next=${encodeURIComponent(nextPath)}`);
  }, [nextPath, router]);

  const loadProgress = useCallback(async () => {
    const response = await leafletProgressApi();
    setProgress(response);
  }, []);

  const claim = useCallback(async () => {
    const code = pendingCode;
    if (!code) return;

    const response = await leafletClaimApi({ code });
    setProgress(response);
    if (response.completedCount >= response.totalCount) {
      setCompleteHandleDown(false);
    }

    trackEvent('leaflet_claim', { status: 'success' });

    setPendingCode('');
    router.replace('/leaflet');
  }, [pendingCode, router]);

  const run = useCallback(async () => {
    setLoading(true);
    retryRef.current = null;

    try {
      if (pendingCode) {
        await claim();
        return;
      }

      await loadProgress();
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        trackEvent('leaflet_claim', { status: 'unauthorized' });
        redirectToLogin();
        return;
      }

      if (
        error instanceof ApiError &&
        error.status === 409 &&
        error.errorCode === 'LEAFLET_CLAIM_DUPLICATE'
      ) {
        trackEvent('leaflet_claim', { status: 'duplicate' });
        showToast({ variant: 'info', message: '이미 적립된 기록입니다.' });
        setPendingCode('');
        router.replace('/leaflet');
        await loadProgress();
        return;
      }

      if (
        error instanceof ApiError &&
        error.status === 404 &&
        error.errorCode === 'LEAFLET_CODE_NOT_FOUND'
      ) {
        trackEvent('leaflet_claim', { status: 'not_found' });
        showToast({
          variant: 'error',
          message: '유효하지 않은 QR 코드입니다.',
        });
        setPendingCode('');
        router.replace('/leaflet');
        await loadProgress();
        return;
      }

      trackEvent('leaflet_claim', { status: 'error' });
      retryRef.current = () => {
        setToast(null);
        void run();
      };

      showToast({
        variant: 'error',
        message: '네트워크가 원활하지 않습니다. 다시 시도해 주세요.',
        actionLabel: '재시도',
      });
    } finally {
      setLoading(false);
    }
  }, [claim, loadProgress, pendingCode, redirectToLogin, router, showToast]);

  useEffect(() => {
    if (!LEAFLET_API_AVAILABLE) {
      setProgress({
        totalCount: LEAFLET_STAMPS.length,
        completedCount: 0,
        completedStampKeys: [],
      });

      showToast({
        variant: 'info',
        message: '현재 기록 적립이 종료되었습니다.',
      });

      if (pendingCode) {
        setPendingCode('');

        const url = new URL(window.location.href);
        url.searchParams.delete('code');
        window.history.replaceState(
          null,
          '',
          `${url.pathname}${url.search}${url.hash}`
        );
      }

      return;
    }

    void run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const completedStampKeys = useMemo(() => {
    if (!progress) return undefined;
    return progress.completedStampKeys.filter(isLeafletStampKey);
  }, [progress]);

  const isComplete = Boolean(
    progress && progress.completedCount >= progress.totalCount
  );

  return (
    <>
      <LeafletStampScreen
        progressCount={progress?.completedCount ?? 0}
        totalCount={progress?.totalCount}
        handleDown={isComplete ? completeHandleDown : undefined}
        onHandleDownChange={isComplete ? setCompleteHandleDown : undefined}
        completedStampKeys={completedStampKeys}
      />

      {/* toast */}
      {toast ? (
        <div className="fixed bottom-[calc(var(--nav-bottom-height)+12px)] left-1/2 z-[60] w-[calc(100%-32px)] max-w-[calc(var(--app-max-width)-32px)] -translate-x-1/2">
          <div
            className={[
              'shadow_top flex items-center justify-between gap-[12px] rounded-[8px] border px-[16px] py-[12px]',
              toast.variant === 'error'
                ? 'border-[var(--color-37demo-red-40)] bg-[var(--color-black)]'
                : 'border-[var(--color-gray-800)] bg-[var(--color-black)]',
            ].join(' ')}
            role="status"
          >
            <p className="body_r_14 text-[var(--color-white)]">
              {toast.message}
            </p>

            {toast.actionLabel && retryRef.current ? (
              <button
                type="button"
                className={[
                  'head_b_14 shrink-0 rounded-[4px] px-[10px] py-[8px]',
                  'bg-[var(--color-gray-900)] text-[var(--color-white)]',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]',
                ].join(' ')}
                onClick={() => retryRef.current?.()}
                disabled={loading}
              >
                {toast.actionLabel}
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
