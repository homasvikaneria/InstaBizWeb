import { SERVICE_OPTIONS } from './services';

/**
 * Admin-side constants.
 *
 * Service values are derived from the same catalogue the public form uses, so
 * the edit dialog can never offer a value the backend whitelist would reject.
 */
export const SERVICE_VALUES = SERVICE_OPTIONS.map((option) => option.value);

/** Must match ALLOWED_STATUSES in backend/src/validators/enquiryValidator.js. */
export const STATUS_OPTIONS = ['Pending', 'Contacted', 'Resolved'];

export const ALL_SERVICES_LABEL = 'All Services';
export const ALL_STATUSES_LABEL = 'All Statuses';

export const PAGE_SIZE = 10;

/**
 * Page numbers to render, collapsing long ranges with ellipses.
 * e.g. 1 … 4 5 6 … 20
 */
export function getPaginationRange(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let start = Math.max(2, currentPage - 1);
  let end = Math.min(totalPages - 1, currentPage + 1);

  if (currentPage <= 3) {
    start = 2;
    end = 4;
  } else if (currentPage >= totalPages - 2) {
    start = totalPages - 3;
    end = totalPages - 1;
  }

  const range = [1];
  if (start > 2) range.push('ellipsis-left');
  for (let i = start; i <= end; i += 1) range.push(i);
  if (end < totalPages - 1) range.push('ellipsis-right');
  range.push(totalPages);

  return range;
}
