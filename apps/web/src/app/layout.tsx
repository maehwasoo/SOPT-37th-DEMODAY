import Script from 'next/script';

import type { Metadata, Viewport } from 'next';

import GaRouteTracker from '@/components/analytics/GaRouteTracker';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'DIVE SOPT 데모데이',
  description: '37기 DIVE SOPT 데모데이',
  openGraph: {
    title: 'DIVE SOPT 데모데이',
    description: '37기 DIVE SOPT 데모데이',
    images: ['/assets/figma/main/img_branding_main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DIVE SOPT 데모데이',
    description: '37기 DIVE SOPT 데모데이',
    images: ['/assets/figma/main/img_branding_main.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="ko">
      <head>
        <meta
          name="format-detection"
          content="telephone=no,email=no,address=no"
        />
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { send_page_view: false });
              `}
            </Script>
          </>
        ) : null}
      </head>
      <body className="antialiased">
        <GaRouteTracker gaId={gaId} />
        {children}
      </body>
    </html>
  );
}
