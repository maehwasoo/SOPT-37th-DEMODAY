'use client';

import Button from '@/components/ui/Button/Button';
import { trackEvent } from '@/lib/ga';

export default function HomeCtaButton() {
  return (
    <Button
      href="/products"
      onClick={() => {
        trackEvent('cta_click', { cta: 'home_view_products' });
      }}
    >
      서비스 보러가기
    </Button>
  );
}
