import { Container, Section, SectionHeading } from '../ui/Section';
import Reveal from '../ui/Reveal';
import Icon from '../ui/Icon';

/** The six advantages named in the assignment brief, written as outcomes. */
export const REASONS = [
  {
    icon: 'Ruler',
    title: 'Customized solutions',
    body: 'Built around how your business already works, rather than forcing your process to match a template someone else designed.',
  },
  {
    icon: 'Target',
    title: 'Business-focused development',
    body: 'Scope is argued in terms of the outcome it changes — hours saved, enquiries captured, errors removed — not the feature list.',
  },
  {
    icon: 'Layers',
    title: 'Modern technology',
    body: 'Current, maintainable, well-supported stacks. The kind another engineer can pick up in two years without a rewrite.',
  },
  {
    icon: 'Workflow',
    title: 'Automation first',
    body: 'Every manual hand-off is treated as a defect worth designing out, not a step to document and live with.',
  },
  {
    icon: 'TrendingUp',
    title: 'Built for scalability',
    body: 'Architected so that more data, more traffic and more people do not force a rebuild of what already works.',
  },
  {
    icon: 'LifeBuoy',
    title: 'End-to-end support',
    body: 'One partner from discovery through deployment and the maintenance that follows — not a hand-off at launch.',
  },
];

/**
 * A bordered grid rather than six floating cards: cells share hairline rules,
 * so it reads as one system instead of six separate objects.
 */
export default function WhyUs() {
  return (
    <Section tone="light">
      <Container size="wide">
        <Reveal>
          <SectionHeading
            eyebrow="Why InstaBizWeb"
            title="Technology should fit your business. Not the other way around."
            description="Six commitments that shape how the work gets scoped, built and supported."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200 sm:grid-cols-2 lg:grid-cols-3">
            {REASONS.map((reason, index) => {
              return (
                <div
                  key={reason.title}
                  className="group relative bg-white p-7 transition-colors duration-200 hover:bg-ink-50"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-lg border border-ink-200 bg-ink-50 text-ink-700 transition-colors duration-200 group-hover:border-accent-200 group-hover:bg-accent-50 group-hover:text-accent-700">
                      <Icon name={reason.icon} className="h-[18px] w-[18px]" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-xs tabular-nums text-ink-300"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-ink-950">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{reason.body}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
