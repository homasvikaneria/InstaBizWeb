'use client';

import { Eye, Pencil, Trash2, Loader2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { STATUS_OPTIONS } from '../../lib/adminConstants';
import { cn } from '../../lib/cn';

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

function RowActions({ item, onView, onEdit, onDelete }) {
  const actions = [
    { label: 'View', icon: Eye, onClick: () => onView(item.id), tone: 'hover:text-accent-700' },
    { label: 'Edit', icon: Pencil, onClick: () => onEdit(item), tone: 'hover:text-accent-700' },
    { label: 'Delete', icon: Trash2, onClick: () => onDelete(item), tone: 'hover:text-red-700' },
  ];
  return (
    <div className="flex items-center justify-end gap-1">
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          onClick={action.onClick}
          title={`${action.label} enquiry #${item.id}`}
          aria-label={`${action.label} enquiry from ${item.fullName}`}
          className={cn(
            'grid h-8 w-8 place-items-center rounded-md text-ink-500 transition-colors hover:bg-ink-100',
            action.tone
          )}
        >
          <action.icon className="h-4 w-4" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}

function StatusSelect({ item, updating, onStatusChange }) {
  return (
    // The native select sits invisibly over the badge: it keeps full keyboard
    // and screen-reader behaviour while the badge provides the visual. The
    // wrapper carries the focus ring, since the transparent select cannot.
    <div className="relative inline-flex items-center rounded-full focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent-600">
      <label className="sr-only" htmlFor={`status-${item.id}`}>
        Status for enquiry from {item.fullName}
      </label>
      <select
        id={`status-${item.id}`}
        value={item.status || 'Pending'}
        disabled={updating}
        onChange={(event) => onStatusChange(item, event.target.value)}
        className="cursor-pointer appearance-none rounded-full border-0 bg-transparent py-0 pl-0 pr-5 text-xs font-medium text-transparent focus:ring-0 disabled:cursor-wait"
        style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0 }}
      >
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      {updating ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 px-2.5 py-1 text-xs text-ink-600">
          <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
          Saving…
        </span>
      ) : (
        <StatusBadge status={item.status} className="pointer-events-none" />
      )}
    </div>
  );
}

/** Desktop table. Below `lg` the dashboard renders EnquiryCards instead. */
export default function EnquiryTable({
  items,
  updatingStatusId,
  onStatusChange,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="hidden overflow-hidden rounded-xl border border-ink-200 bg-white lg:block">
      <table className="w-full border-collapse text-sm">
        <caption className="sr-only">
          Enquiries submitted through the public contact form
        </caption>
        <thead>
          <tr className="border-b border-ink-200 bg-ink-50 text-left">
            {['Name', 'Email', 'Phone', 'Company', 'Service', 'Status', 'Date', ''].map(
              (heading, index) => (
                <th
                  key={heading || 'actions'}
                  scope="col"
                  className={cn(
                    'px-4 py-3 text-xs font-semibold uppercase tracking-[0.06em] text-ink-500',
                    index === 7 && 'text-right'
                  )}
                >
                  {heading || <span className="sr-only">Actions</span>}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {items.map((item) => (
            <tr key={item.id} className="transition-colors hover:bg-ink-50/70">
              <td className="px-4 py-3">
                <p className="font-medium text-ink-950">{item.fullName}</p>
                <p className="font-mono text-[11px] text-ink-400">#{item.id}</p>
              </td>
              <td className="px-4 py-3">
                <a
                  href={`mailto:${item.email}`}
                  className="rounded text-ink-600 transition-colors hover:text-accent-700"
                >
                  {item.email}
                </a>
              </td>
              <td className="px-4 py-3">
                <a
                  href={`tel:${item.phone}`}
                  className="rounded whitespace-nowrap text-ink-600 transition-colors hover:text-accent-700"
                >
                  {item.phone}
                </a>
              </td>
              <td className="px-4 py-3 text-ink-600">{item.companyName}</td>
              <td className="px-4 py-3">
                <span className="whitespace-nowrap rounded-md bg-ink-100 px-2 py-1 text-xs text-ink-700">
                  {item.service}
                </span>
              </td>
              <td className="px-4 py-3">
                <StatusSelect
                  item={item}
                  updating={updatingStatusId === item.id}
                  onStatusChange={onStatusChange}
                />
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <p className="text-ink-700">{formatDate(item.createdAt)}</p>
                <p className="text-[11px] text-ink-400">{formatTime(item.createdAt)}</p>
              </td>
              <td className="px-4 py-3">
                <RowActions item={item} onView={onView} onEdit={onEdit} onDelete={onDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Mobile / tablet presentation.
 *
 * A horizontally scrolling table is unusable on a phone, so below `lg` each
 * enquiry becomes a self-contained card carrying the same seven fields.
 */
export function EnquiryCards({
  items,
  updatingStatusId,
  onStatusChange,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <ul className="space-y-3 lg:hidden">
      {items.map((item) => (
        <li key={item.id} className="rounded-xl border border-ink-200 bg-white p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-medium text-ink-950">{item.fullName}</p>
              <p className="truncate text-sm text-ink-600">{item.companyName}</p>
            </div>
            <StatusSelect
              item={item}
              updating={updatingStatusId === item.id}
              onStatusChange={onStatusChange}
            />
          </div>

          <dl className="mt-3 space-y-1.5 border-t border-ink-100 pt-3 text-sm">
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-xs text-ink-500">Email</dt>
              <dd className="min-w-0 flex-1 truncate">
                <a
                  href={`mailto:${item.email}`}
                  className="rounded text-ink-700 hover:text-accent-700"
                >
                  {item.email}
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-xs text-ink-500">Phone</dt>
              <dd className="flex-1">
                <a href={`tel:${item.phone}`} className="rounded text-ink-700 hover:text-accent-700">
                  {item.phone}
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-xs text-ink-500">Service</dt>
              <dd className="flex-1 text-ink-700">{item.service}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-xs text-ink-500">Date</dt>
              <dd className="flex-1 text-ink-700">
                {formatDate(item.createdAt)}
                <span className="ml-1.5 text-ink-400">{formatTime(item.createdAt)}</span>
              </dd>
            </div>
          </dl>

          <div className="mt-3 flex items-center justify-between border-t border-ink-100 pt-3">
            <span className="font-mono text-[11px] text-ink-400">#{item.id}</span>
            <RowActions item={item} onView={onView} onEdit={onEdit} onDelete={onDelete} />
          </div>
        </li>
      ))}
    </ul>
  );
}
