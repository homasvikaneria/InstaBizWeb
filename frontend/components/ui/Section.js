import { cn } from '../../lib/cn';

/** Page gutter + max width. Every section's content sits inside one of these. */
export function Container({ className, children, size = 'default' }) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-8',
        size === 'wide' ? 'max-w-[88rem]' : 'max-w-[76rem]',
        size === 'narrow' && 'max-w-[52rem]',
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Vertical rhythm for page sections.
 * `tone` also sets the correct text colour, so dark sections never inherit
 * light-surface body colour by accident.
 */
export function Section({ className, children, tone = 'light', id, ...props }) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-20 sm:py-24 lg:py-28',
        tone === 'light' && 'bg-white text-ink-900',
        tone === 'muted' && 'bg-ink-50 text-ink-900',
        tone === 'dark' && 'bg-ink-950 text-white',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

/** Small uppercase category label that opens a section. */
export function Eyebrow({ children, tone = 'light', className }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em]',
        tone === 'dark' ? 'text-accent-300' : 'text-accent-700',
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'h-1 w-1 rounded-full',
          tone === 'dark' ? 'bg-accent-400' : 'bg-accent-600'
        )}
      />
      {children}
    </p>
  );
}

/**
 * Section heading block. Renders a real <h2> for the headline so the document
 * outline matches the visual hierarchy — the eyebrow is a <p>, not a heading.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'left',
  className,
  as: Heading = 'h2',
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        align === 'center' ? 'max-w-3xl mx-auto' : 'max-w-2xl',
        className
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <Heading
        className={cn(
          'text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-semibold',
          tone === 'dark' ? 'text-white' : 'text-ink-900'
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            'text-base sm:text-lg leading-relaxed',
            tone === 'dark' ? 'text-ink-300' : 'text-ink-600'
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/** Hairline separator that fades at both ends. */
export function Rule({ className, tone = 'light' }) {
  return (
    <div
      aria-hidden="true"
      className={cn('h-px w-full', tone === 'dark' ? 'bg-white/10' : 'rule-x', className)}
    />
  );
}
