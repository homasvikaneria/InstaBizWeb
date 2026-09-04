'use client';

import { Search, X, SlidersHorizontal } from 'lucide-react';
import { Select } from '../ui/Field';
import {
  SERVICE_VALUES,
  STATUS_OPTIONS,
  ALL_SERVICES_LABEL,
  ALL_STATUSES_LABEL,
} from '../../lib/adminConstants';

/** Search + service/status filters + reset. */
export default function Toolbar({
  searchQuery,
  onSearchChange,
  selectedService,
  onServiceChange,
  selectedStatus,
  onStatusChange,
  isFilterActive,
  onReset,
  resultCount,
  totalCount,
}) {
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-3 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <label htmlFor="enquiry-search" className="sr-only">
            Search enquiries
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
            aria-hidden="true"
          />
          <input
            id="enquiry-search"
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search name, email, phone, company, service…"
            className="h-10 w-full rounded-lg border border-ink-200 bg-white pl-9 pr-9 text-sm text-ink-900 placeholder:text-ink-400 transition-[border-color,box-shadow] hover:border-ink-300 focus:border-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-600/18"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <div className="sm:w-52">
            <label htmlFor="filter-service" className="sr-only">
              Filter by service
            </label>
            <Select
              id="filter-service"
              value={selectedService}
              onChange={(event) => onServiceChange(event.target.value)}
              className="h-10"
            >
              <option value={ALL_SERVICES_LABEL}>{ALL_SERVICES_LABEL}</option>
              {SERVICE_VALUES.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </Select>
          </div>

          <div className="sm:w-44">
            <label htmlFor="filter-status" className="sr-only">
              Filter by status
            </label>
            <Select
              id="filter-status"
              value={selectedStatus}
              onChange={(event) => onStatusChange(event.target.value)}
              className="h-10"
            >
              <option value={ALL_STATUSES_LABEL}>{ALL_STATUSES_LABEL}</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {isFilterActive ? (
        <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-ink-100 pt-3">
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-500">
            <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
            Filters active
          </span>
          <span className="text-xs text-ink-600" aria-live="polite">
            Showing <strong className="font-semibold text-ink-900">{resultCount}</strong> of{' '}
            {totalCount}
          </span>
          <button
            type="button"
            onClick={onReset}
            className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-accent-700 transition-colors hover:bg-accent-50"
          >
            <X className="h-3 w-3" aria-hidden="true" />
            Clear all
          </button>
        </div>
      ) : null}
    </div>
  );
}
