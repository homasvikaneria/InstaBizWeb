import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import LayoutShell from '../components/layout/LayoutShell';

/**
 * Self-hosted by next/font at build time — no render-blocking request to
 * Google Fonts, no layout shift, and no third-party origin at runtime.
 */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const SITE_NAME = 'InstaBizWeb';
const TAGLINE = 'Digital Solutions for Business Growth';
const DESCRIPTION =
  'InstaBizWeb is a technology partner for website development, web and mobile apps, custom software, CRM, ERP and Odoo, business process automation, AI automation, API and system integration, and digital marketing.';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} — ${TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'website development',
    'web and mobile app development',
    'custom software development',
    'CRM solutions',
    'ERP and Odoo solutions',
    'business process automation',
    'AI automation',
    'API and system integration',
    'digital marketing',
  ],
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
    url: siteUrl,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#0b0d12',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      {/*
        suppressHydrationWarning covers a real-world case we cannot control:
        browser extensions (ColorZilla's `cz-shortcut-listen`, Grammarly's
        `data-gr-*`, password managers) inject attributes onto <body> before
        React hydrates, which React then reports as a mismatch.

        It suppresses warnings for this element's own attributes and text only —
        one level deep — so genuine mismatches inside the tree are still
        reported. It is not a blanket silencer.
      */}
      <body
        className="min-h-screen bg-white font-sans text-ink-900 antialiased"
        suppressHydrationWarning
      >
        <AuthProvider>
          <LayoutShell>{children}</LayoutShell>
        </AuthProvider>
      </body>
    </html>
  );
}
