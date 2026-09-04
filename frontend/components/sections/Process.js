import { Container, Section, SectionHeading } from '../ui/Section';
import Reveal from '../ui/Reveal';

export const STEPS = [
  {
    index: '01',
    title: 'Discover',
    body: 'Understand the business goal, the constraint behind it, and what is currently costing time.',
  },
  {
    index: '02',
    title: 'Plan',
    body: 'Define scope, architecture and sequence — including what deliberately stays out of phase one.',
  },
  {
    index: '03',
    title: 'Build',
    body: 'Develop the solution in reviewable increments so direction can be corrected early, not at handover.',
  },
  {
    index: '04',
    title: 'Automate',
    body: 'Connect the systems and remove the manual steps between them once the core is proven.',
  },
  {
    index: '05',
    title: 'Scale',
    body: 'Measure, optimise and support as usage grows — the phase most projects skip.',
  },
];

/**
 * Horizontal timeline on desktop (connected by a single rule through the
 * markers), vertical on mobile. Dark section — provides contrast between the
 * two light sections either side of it.
 */
export default function Process() {
  return (
    <Section tone="dark" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-bg-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,#000_40%,transparent_100%)]"
      />
      <Container size="wide" className="relative">
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow="How we work"
            title="A sequence, not a black box."
            description="Five stages from first conversation to ongoing support. You know what is happening at each one."
          />
        </Reveal>

        <div className="mt-16">
          {/* Desktop: connected horizontal track */}
          <div className="relative hidden lg:block">
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-[0.6875rem] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            <ol className="relative grid grid-cols-5 gap-6">
              {STEPS.map((step, index) => (
                <Reveal key={step.index} delay={index * 70} as="li">
                  <span
                    aria-hidden="true"
                    className="relative block h-[1.375rem] w-[1.375rem] rounded-full border border-white/20 bg-ink-950"
                  >
                    <span className="absolute inset-[0.3125rem] rounded-full bg-accent-500" />
                  </span>
                  <div className="mt-6 pr-4">
                    <span className="font-mono text-xs tabular-nums text-accent-300">
                      {step.index}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-400">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Mobile: vertical rail */}
          <ol className="relative space-y-8 lg:hidden">
            <div
              aria-hidden="true"
              className="absolute bottom-2 left-[0.6875rem] top-2 w-px bg-white/15"
            />
            {STEPS.map((step) => (
              <li key={step.index} className="relative flex gap-5">
                <span
                  aria-hidden="true"
                  className="relative z-10 mt-0.5 grid h-[1.375rem] w-[1.375rem] shrink-0 place-items-center rounded-full border border-white/20 bg-ink-950"
                >
                  <span className="h-2 w-2 rounded-full bg-accent-500" />
                </span>
                <div>
                  <span className="font-mono text-xs tabular-nums text-accent-300">
                    {step.index}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-400">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
