import { ArrowRight } from 'lucide-react';
import { Container, Section, SectionHeading, Eyebrow } from '../ui/Section';
import Reveal from '../ui/Reveal';

const PROBLEMS = [
  { label: 'Disconnected tools', detail: 'Systems that never learned to talk to each other.' },
  { label: 'Manual processes', detail: 'Work re-keyed by hand between one screen and the next.' },
  { label: 'Scattered data', detail: 'The same customer recorded three different ways.' },
  { label: 'Outdated systems', detail: 'Software that now constrains the business it was bought to serve.' },
  { label: 'Slow operations', detail: 'Approvals and hand-offs that stall for days.' },
  { label: 'Weak digital presence', detail: 'A site that informs but never converts.' },
];

/**
 * Problem → solution, as a two-column editorial split rather than a card grid.
 * The left column is a numbered list of symptoms; the right is the resolution.
 */
export default function ProblemSolution() {
  return (
    <Section tone="muted" className="overflow-hidden">
      <Container size="wide">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>The starting point</Eyebrow>
              <h2 className="mt-5 text-3xl font-semibold leading-[1.12] tracking-[-0.025em] text-ink-900 sm:text-4xl">
                Most businesses don&apos;t have a technology problem. They have a
                <span className="text-ink-400"> disconnection </span>
                problem.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink-600">
                Tools get bought one at a time to solve one problem at a time. Each works. Together
                they leak hours.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <ul className="mt-10 divide-y divide-ink-200/70 border-y border-ink-200/70">
                {PROBLEMS.map((problem, index) => (
                  <li key={problem.label} className="flex gap-4 py-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 font-mono text-xs tabular-nums text-ink-400"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-[0.9375rem] font-medium text-ink-900">{problem.label}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-ink-500">
                        {problem.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={120}>
              <div className="relative overflow-hidden rounded-2xl border border-ink-200 bg-white p-8 shadow-sm sm:p-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-100/60 blur-3xl"
                />
                <div className="relative">
                  <Eyebrow>The resolution</Eyebrow>
                  <p className="mt-5 text-2xl font-semibold leading-snug tracking-[-0.02em] text-ink-900 sm:text-[1.75rem]">
                    One technology partner.
                    <br />
                    Connected digital solutions.
                  </p>
                  <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-600">
                    Instead of assembling separate vendors for the site, the software, the CRM, the
                    ERP and the automation between them, InstaBizWeb designs and builds them as one
                    system — so data moves on its own and the same record means the same thing
                    everywhere.
                  </p>

                  <div className="mt-8 space-y-3">
                    {[
                      {
                        from: 'Websites & apps',
                        to: 'capture demand and serve customers',
                      },
                      { from: 'CRM & ERP', to: 'hold one version of the truth' },
                      { from: 'Automation & AI', to: 'remove the manual steps in between' },
                      { from: 'Integrations & marketing', to: 'connect and compound the result' },
                    ].map((row) => (
                      <div
                        key={row.from}
                        className="flex flex-col gap-1 rounded-lg border border-ink-100 bg-ink-50/70 px-4 py-3 sm:flex-row sm:items-center sm:gap-3"
                      >
                        <span className="text-sm font-semibold text-ink-900 sm:w-44 sm:shrink-0">
                          {row.from}
                        </span>
                        <ArrowRight
                          className="hidden h-3.5 w-3.5 shrink-0 text-accent-600 sm:block"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-ink-600">{row.to}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
