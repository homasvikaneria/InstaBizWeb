'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { Field, TextInput, TextArea, Select } from '../ui/Field';
import Button from '../ui/Button';
import { SERVICE_OPTIONS } from '../../lib/services';
import { createEnquiryApi } from '../../lib/api';

const MESSAGE_LIMIT = 2000;

/**
 * Public enquiry form.
 *
 * Flow: this form → POST /api/enquiries → PostgreSQL.
 * Nothing is written to localStorage and there is no mock path — a failed
 * request surfaces as a failure, it does not silently "succeed".
 *
 * Client validation mirrors the server rules in
 * backend/src/validators/enquiryValidator.js. The server is still the
 * authority: field-level errors it returns are rendered below.
 */
export default function EnquiryForm() {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverError, setServerError] = useState(null);
  const statusRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      service: '',
      message: '',
    },
  });

  const messageValue = watch('message') || '';

  const onSubmit = async (values) => {
    setStatus('submitting');
    setServerError(null);

    try {
      await createEnquiryApi(values);
      setStatus('success');
      reset();
      // Move focus to the confirmation so screen-reader users are told it worked.
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch (error) {
      setStatus('error');
      setServerError(error.message || 'Something went wrong. Please try again.');
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  };

  if (status === 'success') {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8 text-center sm:p-10"
      >
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-6 w-6 text-emerald-700" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-ink-950">
          Thanks — your enquiry has been received.
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-ink-600">
          We&apos;ll review your requirements and get back to you.
        </p>
        <Button
          variant="secondary"
          size="md"
          className="mt-7"
          onClick={() => setStatus('idle')}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full Name" required htmlFor="fullName" error={errors.fullName?.message}>
          <TextInput
            id="fullName"
            autoComplete="name"
            placeholder="Jane Mehta"
            error={errors.fullName}
            {...register('fullName', {
              required: 'Please enter your full name.',
              maxLength: { value: 100, message: 'Full name cannot exceed 100 characters.' },
            })}
          />
        </Field>

        <Field label="Email Address" required htmlFor="email" error={errors.email?.message}>
          <TextInput
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="jane@company.com"
            error={errors.email}
            {...register('email', {
              required: 'Please enter your email address.',
              maxLength: { value: 255, message: 'Email cannot exceed 255 characters.' },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address.',
              },
            })}
          />
        </Field>

        <Field label="Phone Number" required htmlFor="phone" error={errors.phone?.message}>
          <TextInput
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="98765 43210"
            error={errors.phone}
            {...register('phone', {
              required: 'Please enter your phone number.',
              maxLength: { value: 30, message: 'Phone number cannot exceed 30 characters.' },
              pattern: {
                value: /^[0-9\s\-+()]{7,30}$/,
                message: 'Please enter a valid phone number.',
              },
            })}
          />
        </Field>

        <Field
          label="Company Name"
          required
          htmlFor="companyName"
          error={errors.companyName?.message}
        >
          <TextInput
            id="companyName"
            autoComplete="organization"
            placeholder="Acme Manufacturing"
            error={errors.companyName}
            {...register('companyName', {
              required: 'Please enter your company name.',
              maxLength: { value: 150, message: 'Company name cannot exceed 150 characters.' },
            })}
          />
        </Field>

        <Field
          label="Service Interested In"
          required
          htmlFor="service"
          error={errors.service?.message}
          className="sm:col-span-2"
        >
          <Select
            id="service"
            defaultValue=""
            error={errors.service}
            {...register('service', { required: 'Please choose a service.' })}
          >
            <option value="" disabled>
              Select a service…
            </option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Message"
          required
          htmlFor="message"
          error={errors.message?.message}
          hint={`${messageValue.length} / ${MESSAGE_LIMIT}`}
          className="sm:col-span-2"
        >
          <TextArea
            id="message"
            rows={5}
            placeholder="What are you trying to build, improve or automate?"
            error={errors.message}
            {...register('message', {
              required: 'Please tell us a little about your requirement.',
              maxLength: {
                value: MESSAGE_LIMIT,
                message: `Message cannot exceed ${MESSAGE_LIMIT} characters.`,
              },
            })}
          />
        </Field>
      </div>

      {status === 'error' && serverError ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden="true" />
          <p className="text-sm text-red-800">{serverError}</p>
        </div>
      ) : null}

      <div className="mt-7 flex flex-col-reverse items-stretch gap-4 border-t border-ink-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-ink-500">
          Your enquiry is sent to our team and stored securely.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={status === 'submitting'}
          className="group shrink-0"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send Enquiry
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
