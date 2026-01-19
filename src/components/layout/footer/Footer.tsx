'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/leaflet')) {
    return null;
  }

  return (
    <footer className="px-20 py-16">
      <p className="caption_r_10 text-[var(--color-white-70)]">© DIVE SOPT</p>
    </footer>
  );
}
