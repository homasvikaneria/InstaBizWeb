import { cn } from '../../lib/cn';

/**
 * Status pill. Colour is backed by a text label and a dot, never colour alone —
 * so the state is still readable to colour-blind users and in greyscale print.
 */
const TONES = {
  Pending: { chip: 'bg-amber-50 text-amber-800 ring-amber-200', dot: 'bg-amber-500' },
  Contacted: { chip: 'bg-accent-50 text-accent-800 ring-accent-200', dot: 'bg-accent-600' },
  Resolved: { chip: 'bg-emerald-50 text-emerald-800 ring-emerald-200', dot: 'bg-emerald-600' },
};

export default function StatusBadge({ status, className }) {
  const tone = TONES[status] ?? TONES.Pending;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset',
        tone.chip,
        className
      )}
    >
      <span aria-hidden="true" className={cn('h-1.5 w-1.5 rounded-full', tone.dot)} />
      {status || 'Pending'}
    </span>
  );
}
