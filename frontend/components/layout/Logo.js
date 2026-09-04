import Link from 'next/link';
import { cn } from '../../lib/cn';

/**
 * Wordmark + monogram. The mark is inline SVG (two offset chevrons suggesting
 * flow / forward motion) rather than a letter in a rounded box.
 */
export default function Logo({ tone = 'light', href = '/', showTagline = true, className }) {
  const dark = tone === 'dark';

  const content = (
    <>
      <span
        className={cn(
          'grid h-9 w-9 shrink-0 place-items-center rounded-lg',
          dark ? 'bg-white/10 ring-1 ring-white/15' : 'bg-ink-950'
        )}
      >
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
          <path
            d="M4 7.5 10.5 4l6.5 3.5"
            stroke={dark ? '#a3adfd' : '#8286f9'}
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 12.5 13.5 9l6.5 3.5"
            stroke="#ffffff"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 19.5 10.5 16l6.5 3.5"
            stroke={dark ? '#ffffff' : '#ffffff'}
            strokeOpacity="0.45"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-[1.0625rem] font-semibold tracking-[-0.02em]',
            dark ? 'text-white' : 'text-ink-950'
          )}
        >
          InstaBizWeb
        </span>
        {showTagline ? (
          <span
            className={cn(
              'mt-1 text-[0.625rem] font-medium uppercase tracking-[0.12em]',
              dark ? 'text-ink-400' : 'text-ink-500'
            )}
          >
            Digital Solutions
          </span>
        ) : null}
      </span>
    </>
  );

  if (!href) {
    return <div className={cn('flex items-center gap-2.5', className)}>{content}</div>;
  }

  return (
    <Link
      href={href}
      aria-label="InstaBizWeb — home"
      className={cn('flex items-center gap-2.5 rounded-lg', className)}
    >
      {content}
    </Link>
  );
}
