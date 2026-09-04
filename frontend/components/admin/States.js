import { Inbox, SearchX, AlertTriangle, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';

/** Loading skeleton. Mirrors the real table's column rhythm to avoid a jump. */
export function TableSkeleton({ rows = 6 }) {
  return (
    <div
      className="overflow-hidden rounded-xl border border-ink-200 bg-white"
      role="status"
      aria-label="Loading enquiries"
    >
      <div className="hidden border-b border-ink-200 bg-ink-50 px-4 py-3 lg:block">
        <div className="grid grid-cols-8 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-3 rounded bg-ink-200/70" />
          ))}
        </div>
      </div>
      <div className="divide-y divide-ink-100">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-4 py-4">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-8">
              {Array.from({ length: 8 }).map((_, cellIndex) => (
                <div
                  key={cellIndex}
                  className="h-3.5 animate-pulse rounded bg-ink-100"
                  style={{
                    animationDelay: `${(rowIndex * 8 + cellIndex) * 25}ms`,
                    width: cellIndex % 3 === 0 ? '85%' : '65%',
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Loading enquiries…</span>
    </div>
  );
}

function Shell({ icon: Icon, tone = 'neutral', title, body, children }) {
  return (
    <div className="rounded-xl border border-ink-200 bg-white px-6 py-14 text-center">
      <span
        className={
          tone === 'danger'
            ? 'mx-auto grid h-12 w-12 place-items-center rounded-full bg-red-50 text-red-600'
            : 'mx-auto grid h-12 w-12 place-items-center rounded-full bg-ink-100 text-ink-500'
        }
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-ink-950">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-ink-600">{body}</p>
      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}

/** No enquiries exist at all. */
export function EmptyState() {
  return (
    <Shell
      icon={Inbox}
      title="No enquiries yet"
      body="When someone submits the enquiry form on the public site, it will appear here."
    >
      <Button href="/contact" variant="secondary" size="sm">
        Open the enquiry form
      </Button>
    </Shell>
  );
}

/** Enquiries exist, but the current filters match none of them. */
export function NoResultsState({ onReset }) {
  return (
    <Shell
      icon={SearchX}
      title="No enquiries match your filters"
      body="Try a different search term, or clear the filters to see everything again."
    >
      <Button variant="secondary" size="sm" onClick={onReset}>
        Clear filters
      </Button>
    </Shell>
  );
}

/** The list request failed. */
export function ErrorState({ message, onRetry }) {
  return (
    <Shell
      icon={AlertTriangle}
      tone="danger"
      title="Could not load enquiries"
      body={message || 'Something went wrong while contacting the server.'}
    >
      <Button variant="secondary" size="sm" onClick={onRetry}>
        <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
        Try again
      </Button>
    </Shell>
  );
}
