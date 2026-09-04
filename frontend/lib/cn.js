/**
 * Minimal class-name joiner.
 *
 * Deliberately not `clsx` + `tailwind-merge`: the components here never pass
 * conflicting utilities for the same property, so a 40-byte join does the job
 * that two dependencies would otherwise do.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
