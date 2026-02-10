// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Script from 'next/script';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Creative Pluz - Digital Experience Agency',
  description: 'Premium creative agency specializing in branding, design, and digital experiences',
  // ✅ Add verification here
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        {/* ✅ Google Search Console Verification */}
        {process.env.GOOGLE_VERIFICATION_CODE && (
          <meta
            name="google-site-verification"
            content={process.env.GOOGLE_VERIFICATION_CODE}
          />
        )}

        {/* ✅ Bing Webmaster Tools */}
        {process.env.BING_VERIFICATION_CODE && (
          <meta
            name="msvalidate.01"
            content={process.env.BING_VERIFICATION_CODE}
          />
        )}
      </head>

      <body suppressHydrationWarning className={`${inter.variable} bg-brand-dark text-white selection:bg-brand-primary selection:text-black`}>
        {/* Cloudinary Script */}
        <Script
          src="https://upload-widget.cloudinary.com/global/all.js"
          strategy="afterInteractive"
        />

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}

        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}