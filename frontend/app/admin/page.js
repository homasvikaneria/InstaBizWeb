'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/layout/Logo';
import Button from '../../components/ui/Button';
import { Field, TextInput } from '../../components/ui/Field';

/**
 * Admin sign-in. This is what /admin resolves to — the enquiry dashboard is
 * never reachable without a successful login.
 *
 * No "forgot password" link: there is no reset flow implemented behind it, and
 * a dead link is worse than no link.
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/admin/dashboard');
    }
  }, [loading, isAuthenticated, router]);

  // Only an already-authenticated admin gets the interstitial, and only while
  // the redirect is in flight. `loading` deliberately does NOT gate the form:
  // it is true during server render, so gating on it would ship a page whose
  // only content is a spinner — and leave a permanent spinner if JS fails.
  if (isAuthenticated) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink-950 px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-accent-400" />
          <p className="text-sm text-ink-400">Opening dashboard…</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    const errors = {};
    if (!email.trim()) errors.email = 'Email is required.';
    if (!password) errors.password = 'Password is required.';
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
      router.push('/admin/dashboard');
    } catch (err) {
      setFormError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-ink-950 px-4 py-12">
      <div
        aria-hidden="true"
        className="grid-bg-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_40%,#000_40%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_0%,rgba(91,70,229,0.18),transparent_70%)]"
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo tone="dark" href="/" showTagline={false} />
          <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-300">
            <ShieldCheck className="h-3 w-3 text-accent-300" aria-hidden="true" />
            Admin Portal
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-white">Sign in</h1>
          <p className="mt-1.5 text-sm text-ink-400">
            Enter your administrator credentials to continue.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-panel">
          {formError ? (
            <div
              role="alert"
              className="mb-5 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden="true" />
              <p className="text-sm text-red-800">{formError}</p>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Field
              label="Email Address"
              required
              htmlFor="admin-email"
              error={fieldErrors.email}
            >
              <TextInput
                id="admin-email"
                type="email"
                autoComplete="email"
                autoFocus
                value={email}
                error={fieldErrors.email}
                disabled={isSubmitting}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@instabizweb.com"
              />
            </Field>

            <Field label="Password" required htmlFor="admin-password" error={fieldErrors.password}>
              <TextInput
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                error={fieldErrors.password}
                disabled={isSubmitting}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
              />
            </Field>

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded text-sm text-ink-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
