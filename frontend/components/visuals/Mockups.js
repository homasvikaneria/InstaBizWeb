import { Check, Zap, Brain, GitBranch, Globe } from 'lucide-react';

/**
 * Illustrative product-style mockups.
 *
 * These depict the *kind* of interface each capability produces. They are not
 * screenshots of an existing InstaBizWeb product, and each is captioned as
 * illustrative at the call site.
 *
 * All decorative: aria-hidden, with the surrounding section carrying the text.
 */

function Chrome({ label, children }) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-ink-200 bg-ink-50 px-3 py-2">
        <div className="flex gap-1" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-ink-300" />
          <span className="h-2 w-2 rounded-full bg-ink-300" />
          <span className="h-2 w-2 rounded-full bg-ink-300" />
        </div>
        <div className="ml-1 flex-1 truncate rounded bg-white px-2 py-1 font-mono text-[10px] text-ink-400 ring-1 ring-ink-200">
          {label}
        </div>
      </div>
      {children}
    </div>
  );
}

/** Website development — a converting marketing page. */
export function WebsiteMock() {
  return (
    <div aria-hidden="true">
      <Chrome label="your-company.com">
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <div className="h-2 w-16 rounded-full bg-ink-800" />
            <div className="flex gap-1.5">
              <div className="h-1.5 w-6 rounded-full bg-ink-200" />
              <div className="h-1.5 w-6 rounded-full bg-ink-200" />
              <div className="h-4 w-12 rounded bg-accent-600" />
            </div>
          </div>
          <div className="space-y-1.5 pt-2">
            <div className="h-3 w-11/12 rounded-full bg-ink-900" />
            <div className="h-3 w-8/12 rounded-full bg-ink-900" />
            <div className="h-1.5 w-10/12 rounded-full bg-ink-200" />
            <div className="h-1.5 w-9/12 rounded-full bg-ink-200" />
          </div>
          <div className="flex gap-2 pt-1">
            <div className="h-5 w-20 rounded bg-accent-600" />
            <div className="h-5 w-16 rounded border border-ink-200" />
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-1 rounded-lg border border-ink-200 p-2">
                <Globe className="h-3 w-3 text-accent-600" />
                <div className="h-1 w-full rounded-full bg-ink-200" />
                <div className="h-1 w-2/3 rounded-full bg-ink-100" />
              </div>
            ))}
          </div>
        </div>
      </Chrome>
    </div>
  );
}

/** CRM — pipeline and customer records in one place. */
export function CrmMock() {
  const rows = [
    { stage: 'Qualified', width: 'w-full', tone: 'bg-accent-600' },
    { stage: 'Proposal', width: 'w-8/12', tone: 'bg-accent-500' },
    { stage: 'Negotiation', width: 'w-6/12', tone: 'bg-accent-400' },
    { stage: 'Won', width: 'w-4/12', tone: 'bg-signal-500' },
  ];
  return (
    <div aria-hidden="true">
      <Chrome label="crm / pipeline">
        <div className="p-4">
          <div className="flex items-center justify-between pb-3">
            <div className="h-2 w-20 rounded-full bg-ink-800" />
            <div className="h-4 w-14 rounded bg-ink-100" />
          </div>
          <div className="space-y-2.5">
            {rows.map((row) => (
              <div key={row.stage} className="flex items-center gap-2">
                <span className="w-20 shrink-0 text-[10px] font-medium text-ink-600">
                  {row.stage}
                </span>
                <div className="h-4 flex-1 overflow-hidden rounded bg-ink-100">
                  <div className={`h-full rounded ${row.width} ${row.tone}`} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-ink-100 pt-3">
            {['Contacts', 'Open deals', 'This month'].map((label) => (
              <div key={label} className="rounded-lg bg-ink-50 p-2">
                <div className="text-[9px] text-ink-500">{label}</div>
                <div className="mt-1 h-2 w-8 rounded-full bg-ink-300" />
              </div>
            ))}
          </div>
        </div>
      </Chrome>
    </div>
  );
}

/** Automation — trigger → AI → decision → action. */
export function AutomationMock() {
  const steps = [
    { label: 'Trigger', sub: 'New enquiry', icon: Zap, tone: 'text-signal-600 bg-signal-500/10' },
    { label: 'AI', sub: 'Classify intent', icon: Brain, tone: 'text-accent-700 bg-accent-100' },
    { label: 'Decision', sub: 'Route by service', icon: GitBranch, tone: 'text-ink-700 bg-ink-100' },
    { label: 'Action', sub: 'Create CRM record', icon: Check, tone: 'text-emerald-700 bg-emerald-100' },
  ];
  return (
    <div aria-hidden="true">
      <Chrome label="automation / workflow">
        <div className="space-y-2 p-4">
          {steps.map((step, index) => (
            <div key={step.label}>
              <div className="flex items-center gap-3 rounded-lg border border-ink-200 bg-white p-2.5">
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-md ${step.tone}`}>
                  <step.icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-semibold text-ink-900">{step.label}</div>
                  <div className="truncate text-[10px] text-ink-500">{step.sub}</div>
                </div>
                <span className="font-mono text-[9px] text-ink-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              {index < steps.length - 1 ? (
                <div className="ml-[1.4rem] h-2 w-px bg-ink-300" />
              ) : null}
            </div>
          ))}
        </div>
      </Chrome>
    </div>
  );
}
