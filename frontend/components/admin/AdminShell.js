'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Inbox, LogOut, Menu, X, ExternalLink, RefreshCw } from 'lucide-react';
import Logo from '../layout/Logo';
import { cn } from '../../lib/cn';

/**
 * Admin application chrome.
 *
 * Shares the public site's tokens (ink/accent, Inter, radii) so the two read as
 * one brand, but deliberately diverges in form: dark rail, denser type, muted
 * working surface — an application, not a marketing page.
 */
export default function AdminShell({ admin, onLogout, onRefresh, refreshing, children }) {
  const [navOpen, setNavOpen] = useState(false);

  const initials = (admin?.name || 'Admin')
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const sidebar = (
    <div className="flex h-full flex-col bg-ink-950">
      <div className="flex h-16 items-center border-b border-white/10 px-5">
        <Logo tone="dark" href="/admin/dashboard" showTagline={false} />
        <span className="ml-2.5 rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-300">
          Admin
        </span>
      </div>

      <nav className="flex-1 space-y-1 p-3" aria-label="Admin sections">
        <span
          aria-current="page"
          className="flex items-center gap-3 rounded-lg bg-white/10 px-3 py-2.5 text-sm font-medium text-white"
        >
          <Inbox className="h-4 w-4 text-accent-300" aria-hidden="true" />
          Enquiries
        </span>
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          View public site
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-ink-50 text-ink-900">
      {/* Fixed rail on large screens */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 lg:block">{sidebar}</aside>

      {/* Off-canvas rail below lg */}
      {navOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink-950/50"
            onClick={() => setNavOpen(false)}
            aria-hidden="true"
          />
          <div className="relative h-full w-60 shadow-panel">
            <button
              type="button"
              onClick={() => setNavOpen(false)}
              aria-label="Close menu"
              className="absolute -right-11 top-3 grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            {sidebar}
          </div>
        </div>
      ) : null}

      <div className="lg:pl-60">
        <header className="sticky top-0 z-30 border-b border-ink-200 bg-white/90 backdrop-blur-md">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button
              type="button"
              onClick={() => setNavOpen(true)}
              aria-label="Open menu"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900 lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-[0.9375rem] font-semibold text-ink-950">Enquiries</h1>
              <p className="truncate text-xs text-ink-500">
                Manage submissions from the public enquiry form
              </p>
            </div>

            {onRefresh ? (
              <button
                type="button"
                onClick={onRefresh}
                disabled={refreshing}
                className="hidden h-9 items-center gap-2 rounded-lg border border-ink-200 bg-white px-3 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50 disabled:opacity-60 sm:inline-flex"
              >
                <RefreshCw
                  className={cn('h-3.5 w-3.5', refreshing && 'animate-spin')}
                  aria-hidden="true"
                />
                Refresh
              </button>
            ) : null}

            <div className="flex items-center gap-3 border-l border-ink-200 pl-3">
              <div className="hidden text-right sm:block">
                <p className="text-xs font-medium leading-tight text-ink-900">
                  {admin?.name || 'Administrator'}
                </p>
                <p className="max-w-[14rem] truncate text-[11px] leading-tight text-ink-500">
                  {admin?.email}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink-950 text-xs font-semibold text-white"
              >
                {initials}
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="grid h-9 w-9 place-items-center rounded-lg text-ink-500 transition-colors hover:bg-red-50 hover:text-red-700"
                aria-label="Sign out"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
