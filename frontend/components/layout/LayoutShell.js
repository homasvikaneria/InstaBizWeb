'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Chooses the chrome for the current route.
 *
 * /admin is a separate application surface: it gets no marketing navbar or
 * footer, which is what keeps the public site and the admin panel visually
 * distinct while still sharing one design system.
 */
export default function LayoutShell({ children }) {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return children;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink-950 focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
