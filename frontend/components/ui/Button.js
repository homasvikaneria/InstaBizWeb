import Link from 'next/link';
import { cn } from '../../lib/cn';

const VARIANTS = {
  primary:
    'bg-accent-600 text-white shadow-sm hover:bg-accent-700 active:bg-accent-800 border border-transparent',
  secondary:
    'bg-white text-ink-900 border border-ink-200 hover:border-ink-300 hover:bg-ink-50 active:bg-ink-100 shadow-xs',
  ghost:
    'bg-transparent text-ink-700 border border-transparent hover:bg-ink-100 hover:text-ink-900 active:bg-ink-200',
  // On dark sections: white fill reads as the primary action against ink-950.
  inverse:
    'bg-white text-ink-950 border border-transparent shadow-sm hover:bg-ink-100 active:bg-ink-200',
  outlineInverse:
    'bg-white/5 text-white border border-white/15 hover:bg-white/10 hover:border-white/25 active:bg-white/15 backdrop-blur-sm',
  danger:
    'bg-red-600 text-white border border-transparent shadow-sm hover:bg-red-700 active:bg-red-800',
};

const SIZES = {
  sm: 'h-9 px-3.5 text-sm gap-1.5 rounded-md',
  md: 'h-11 px-5 text-sm gap-2 rounded-lg',
  lg: 'h-12 px-6 text-base gap-2 rounded-lg',
};

/**
 * The single button primitive for the whole app.
 * Renders an <a> when `href` is passed, otherwise a real <button>.
 */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  disabled = false,
  ...props
}) {
  const classes = cn(
    'inline-flex items-center justify-center font-medium whitespace-nowrap',
    'transition-[background-color,border-color,color,box-shadow,transform] duration-150',
    'active:translate-y-px disabled:pointer-events-none disabled:opacity-55',
    VARIANTS[variant],
    SIZES[size],
    className
  );

  if (href) {
    const external = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');
    if (external) {
      return (
        <a href={href} className={classes} {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
