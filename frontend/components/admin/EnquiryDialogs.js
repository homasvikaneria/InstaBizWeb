'use client';

import { Loader2, AlertCircle, Trash2 } from 'lucide-react';
import Modal from './Modal';
import Button from '../ui/Button';
import StatusBadge from './StatusBadge';
import { Field, TextInput, TextArea, Select } from '../ui/Field';
import { SERVICE_VALUES } from '../../lib/adminConstants';

function formatDateTime(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function ApiError({ message }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="mb-4 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden="true" />
      <p className="text-sm text-red-800">{message}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* View                                                                        */
/* -------------------------------------------------------------------------- */

export function ViewEnquiryDialog({ open, onClose, enquiry, loading, error, onEdit }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={loading ? 'Loading enquiry…' : `Enquiry #${enquiry?.id ?? ''}`}
      description={enquiry ? `Submitted ${formatDateTime(enquiry.createdAt)}` : undefined}
      size="lg"
      footer={
        enquiry && !loading ? (
          <>
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button size="sm" onClick={() => onEdit(enquiry)}>
              Edit enquiry
            </Button>
          </>
        ) : (
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        )
      }
    >
      {loading ? (
        <div className="space-y-3 py-4" role="status" aria-label="Loading enquiry details">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 animate-pulse rounded bg-ink-100" style={{ width: `${90 - i * 8}%` }} />
          ))}
        </div>
      ) : error ? (
        <ApiError message={error} />
      ) : enquiry ? (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={enquiry.status} />
            <span className="rounded-md bg-ink-100 px-2 py-1 text-xs text-ink-700">
              {enquiry.service}
            </span>
          </div>

          <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            {[
              { label: 'Full Name', value: enquiry.fullName },
              { label: 'Company', value: enquiry.companyName },
              {
                label: 'Email',
                value: (
                  <a href={`mailto:${enquiry.email}`} className="rounded text-accent-700 hover:underline">
                    {enquiry.email}
                  </a>
                ),
              },
              {
                label: 'Phone',
                value: (
                  <a href={`tel:${enquiry.phone}`} className="rounded text-accent-700 hover:underline">
                    {enquiry.phone}
                  </a>
                ),
              },
              { label: 'Created', value: formatDateTime(enquiry.createdAt) },
              { label: 'Last updated', value: formatDateTime(enquiry.updatedAt) },
            ].map((row) => (
              <div key={row.label}>
                <dt className="text-xs font-medium uppercase tracking-[0.06em] text-ink-500">
                  {row.label}
                </dt>
                <dd className="mt-1 text-sm text-ink-900">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.06em] text-ink-500">Message</p>
            <div className="mt-2 whitespace-pre-wrap rounded-lg border border-ink-200 bg-ink-50 p-4 text-sm leading-relaxed text-ink-800">
              {enquiry.message}
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}

/* -------------------------------------------------------------------------- */
/* Edit                                                                        */
/* -------------------------------------------------------------------------- */

export function EditEnquiryDialog({
  open,
  onClose,
  formData,
  errors,
  apiError,
  submitting,
  onChange,
  onSubmit,
  enquiryId,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Edit enquiry #${enquiryId ?? ''}`}
      description="Changes are saved to the database immediately."
      size="lg"
      closeOnBackdrop={!submitting}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button size="sm" onClick={onSubmit} disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                Saving…
              </>
            ) : (
              'Save changes'
            )}
          </Button>
        </>
      }
    >
      <ApiError message={apiError} />

      <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full Name" required htmlFor="edit-fullName" error={errors.fullName}>
          <TextInput
            id="edit-fullName"
            value={formData.fullName}
            error={errors.fullName}
            disabled={submitting}
            onChange={(event) => onChange('fullName', event.target.value)}
          />
        </Field>

        <Field label="Email Address" required htmlFor="edit-email" error={errors.email}>
          <TextInput
            id="edit-email"
            type="email"
            value={formData.email}
            error={errors.email}
            disabled={submitting}
            onChange={(event) => onChange('email', event.target.value)}
          />
        </Field>

        <Field label="Phone Number" required htmlFor="edit-phone" error={errors.phone}>
          <TextInput
            id="edit-phone"
            type="tel"
            value={formData.phone}
            error={errors.phone}
            disabled={submitting}
            onChange={(event) => onChange('phone', event.target.value)}
          />
        </Field>

        <Field label="Company Name" required htmlFor="edit-companyName" error={errors.companyName}>
          <TextInput
            id="edit-companyName"
            value={formData.companyName}
            error={errors.companyName}
            disabled={submitting}
            onChange={(event) => onChange('companyName', event.target.value)}
          />
        </Field>

        <Field
          label="Service"
          required
          htmlFor="edit-service"
          error={errors.service}
          className="sm:col-span-2"
        >
          <Select
            id="edit-service"
            value={formData.service}
            error={errors.service}
            disabled={submitting}
            onChange={(event) => onChange('service', event.target.value)}
          >
            <option value="" disabled>
              Select a service…
            </option>
            {SERVICE_VALUES.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Message"
          required
          htmlFor="edit-message"
          error={errors.message}
          className="sm:col-span-2"
        >
          <TextArea
            id="edit-message"
            rows={5}
            value={formData.message}
            error={errors.message}
            disabled={submitting}
            onChange={(event) => onChange('message', event.target.value)}
          />
        </Field>

        {/* Enables Enter-to-submit without a visible duplicate button. */}
        <button type="submit" className="sr-only" tabIndex={-1} aria-hidden="true">
          Save changes
        </button>
      </form>
    </Modal>
  );
}

/* -------------------------------------------------------------------------- */
/* Delete                                                                      */
/* -------------------------------------------------------------------------- */

export function DeleteEnquiryDialog({ open, onClose, item, submitting, apiError, onConfirm }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete this enquiry?"
      size="sm"
      closeOnBackdrop={!submitting}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={onConfirm} disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                Deleting…
              </>
            ) : (
              <>
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                Delete
              </>
            )}
          </Button>
        </>
      }
    >
      <ApiError message={apiError} />
      <p className="text-sm leading-relaxed text-ink-700">
        This permanently removes the enquiry from{' '}
        <strong className="font-semibold text-ink-950">{item?.fullName}</strong>
        {item?.companyName ? ` at ${item.companyName}` : ''}. This cannot be undone.
      </p>
      {item ? (
        <div className="mt-4 rounded-lg border border-ink-200 bg-ink-50 p-3 text-sm">
          <p className="font-mono text-[11px] text-ink-400">#{item.id}</p>
          <p className="mt-1 text-ink-800">{item.email}</p>
          <p className="text-ink-600">{item.service}</p>
        </div>
      ) : null}
    </Modal>
  );
}
