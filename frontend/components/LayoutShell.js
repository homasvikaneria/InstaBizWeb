'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <div className="flex-grow flex flex-col min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
