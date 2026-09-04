'use client';

import { useId } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';

const CONTROL_BASE =
  'w-full rounded-lg border bg-white text-ink-900 placeholder:text-ink-400 ' +
  'transition-[border-color,box-shadow] duration-150 ' +
  'focus:outline-none focus-visible:outline-none ' +
  'disabled:bg-ink-50 disabled:text-ink-500 disabled:cursor-not-allowed';

function controlState(hasError) {
  return hasError
    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
    : 'border-ink-200 hover:border-ink-300 focus:border-accent-600 focus:ring-2 focus:ring-accent-600/18';
}

/**
 * Label + control + error, wired together with matching ids.
 *
 * `aria-invalid` and `aria-describedby` are set from the error so screen
 * readers announce the specific problem, not just "invalid entry".
 */
export function Field({ label, error, hint, required, children, className, htmlFor }) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink-800">
        {label}
        {required ? (
          <span className="text-red-600 ml-0.5" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-ink-400">Optional</span>
        )}
      </label>
      {children}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="flex items-start gap-1.5 text-sm text-red-600"
        >
          <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="text-xs text-ink-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function TextInput({ id, error, className, ...props }) {
  const fallbackId = useId();
  const inputId = id || fallbackId;
  return (
    <input
      id={inputId}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? `${inputId}-error` : undefined}
      className={cn(CONTROL_BASE, controlState(error), 'h-11 px-3.5 text-sm', className)}
      {...props}
    />
  );
}

export function TextArea({ id, error, className, rows = 5, ...props }) {
  const fallbackId = useId();
  const inputId = id || fallbackId;
  return (
    <textarea
      id={inputId}
      rows={rows}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? `${inputId}-error` : undefined}
      className={cn(CONTROL_BASE, controlState(error), 'px-3.5 py-3 text-sm resize-y', className)}
      {...props}
    />
  );
}

/**
 * Native <select> with a custom chevron.
 * Kept native rather than a custom listbox: it is keyboard- and
 * screen-reader-correct for free, and uses the OS picker on mobile.
 */
export function Select({ id, error, className, children, ...props }) {
  const fallbackId = useId();
  const inputId = id || fallbackId;
  return (
    <div className="relative">
      <select
        id={inputId}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={cn(
          CONTROL_BASE,
          controlState(error),
          'h-11 pl-3.5 pr-10 text-sm appearance-none cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
        aria-hidden="true"
      />
    </div>
  );
}
