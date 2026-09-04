'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getPaginationRange } from '../../lib/adminConstants';
import { cn } from '../../lib/cn';

export default function Pagination({ currentPage, totalPages, startIndex, endIndex, totalCount, onPageChange }) {
  const range = getPaginationRange(currentPage, totalPages);

  return (
    <nav
      className="flex flex-col items-center justify-between gap-3 sm:flex-row"
      aria-label="Enquiry pagination"
    >
      <p className="text-sm text-ink-600" aria-live="polite">
        Showing{' '}
        <span className="font-medium text-ink-900">
          {totalCount === 0 ? 0 : startIndex + 1}–{endIndex}
        </span>{' '}
        of <span className="font-medium text-ink-900">{totalCount}</span>
      </p>

      {totalPages > 1 ? (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="grid h-8 w-8 place-items-center rounded-md border border-ink-200 bg-white text-ink-600 transition-colors hover:bg-ink-50 disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>

          {range.map((page) =>
            typeof page === 'string' ? (
              <span key={page} className="px-1.5 text-sm text-ink-400" aria-hidden="true">
                …
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={page === currentPage ? 'page' : undefined}
                aria-label={`Page ${page}`}
                className={cn(
                  'h-8 min-w-8 rounded-md px-2 text-sm font-medium transition-colors',
                  page === currentPage
                    ? 'bg-ink-950 text-white'
                    : 'border border-ink-200 bg-white text-ink-700 hover:bg-ink-50'
                )}
              >
                {page}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="grid h-8 w-8 place-items-center rounded-md border border-ink-200 bg-white text-ink-600 transition-colors hover:bg-ink-50 disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </nav>
  );
}
