'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Logo from './Logo';
import { Container } from '../ui/Section';
import { cn } from '../../lib/cn';

const NAV_LINKS = [
  { name: 'Services', href: '/services' },
  { name: 'Why Us', href: '/why-choose-us' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  // Border + shadow only appear once the page has moved, so the nav sits flush
  // against the hero at rest.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Drawer behaviour: lock background scroll, Escape to close, and keep Tab
  // inside the panel while it is open.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const isActive = (href) => pathname === href;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-white/85 backdrop-blur-md transition-[border-color,box-shadow] duration-200',
        scrolled ? 'border-b border-ink-200/80 shadow-xs' : 'border-b border-transparent'
      )}
    >
      <Container size="wide">
        <div className="flex h-16 items-center justify-between gap-6">
          <Logo />

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={cn(
                  'relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150',
                  isActive(link.href)
                    ? 'text-ink-950'
                    : 'text-ink-600 hover:text-ink-950 hover:bg-ink-100/70'
                )}
              >
                {link.name}
                {isActive(link.href) ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent-600"
                  />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex">
            <Button href="/contact" size="sm">
              Book a Consultation
            </Button>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            className="grid h-10 w-10 place-items-center rounded-lg text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-950 md:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="md:hidden">
          <div
            className="fixed inset-0 top-16 z-40 bg-ink-950/25"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={panelRef}
            id="mobile-nav"
            className="relative z-50 border-b border-ink-200 bg-white shadow-lg"
          >
            <Container>
              <nav className="flex flex-col py-3" aria-label="Mobile">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={cn(
                      'flex items-center justify-between rounded-lg px-3 py-3 text-[0.9375rem] font-medium transition-colors',
                      isActive(link.href)
                        ? 'bg-accent-50 text-accent-800'
                        : 'text-ink-700 hover:bg-ink-50 hover:text-ink-950'
                    )}
                  >
                    {link.name}
                    <ArrowRight className="h-4 w-4 opacity-40" aria-hidden="true" />
                  </Link>
                ))}
                <div className="mt-3 border-t border-ink-100 pt-4 pb-2">
                  <Button href="/contact" size="md" className="w-full">
                    Book a Consultation
                  </Button>
                </div>
              </nav>
            </Container>
          </div>
        </div>
      ) : null}
    </header>
  );
}
