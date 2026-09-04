import { Container, Section, Eyebrow } from '../../components/ui/Section';
import Reveal from '../../components/ui/Reveal';
import Icon from '../../components/ui/Icon';
import CTASection from '../../components/sections/CTASection';
import { REASONS } from '../../components/sections/WhyUs';

export const metadata = {
  title: 'Why Choose Us',
  description:
    'Customized solutions, business-focused development, modern technology, automation, scalability and end-to-end support — how InstaBizWeb approaches every engagement.',
  alternates: { canonical: '/why-choose-us' },
};

/** Expanded detail for each of the six advantages, keyed by title. */
const DETAIL = {
  'Customized solutions': [
    'Workflows modelled on how your team already works',
    'No forced migration to someone else’s process',
    'Configuration where a product fits, code where it does not',
  ],
  'Business-focused development': [
    'Scope argued in outcomes, not feature counts',
    'The expensive 20% identified before it is built',
    'Phase one deliberately smaller than the wish list',
  ],
  'Modern technology': [
    'Current, well-supported frameworks and databases',
    'Readable code another engineer can pick up',
    'No dependency on a stack that is already end-of-life',
  ],
  'Automation first': [
    'Manual hand-offs treated as defects to remove',
    'Event-driven workflows over scheduled batch jobs',
    'AI applied where judgement is genuinely needed',
  ],
  'Built for scalability': [
    'Architecture that absorbs growth without a rewrite',
    'Indexed, normalised data from the start',
    'Room for more traffic, more records, more users',
  ],
  'End-to-end support': [
    'One team from discovery through deployment',
    'Maintenance past launch, not a hand-off at it',
    'A single point of accountability when something breaks',
  ],
};

export default function WhyChooseUsPage() {
  return (
    <>
      <Section tone="dark" className="py-16 lg:py-24">
        <div
          aria-hidden="true"
          className="grid-bg-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,#000_50%,transparent_100%)]"
        />
        <Container size="wide" className="relative">
          <Eyebrow tone="dark">Why InstaBizWeb</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
            Technology should fit your business.
            <br />
            <span className="text-ink-500">Not the other way around.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-300 sm:text-lg">
            Six commitments that shape how every engagement is scoped, built and supported.
          </p>
        </Container>
      </Section>

      <Section tone="light">
        <Container size="wide">
          <div className="space-y-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200">
            {REASONS.map((reason, index) => {
              return (
                <Reveal key={reason.title} delay={index * 50}>
                  <div className="grid grid-cols-1 gap-6 bg-white p-7 transition-colors duration-200 hover:bg-ink-50/70 sm:p-9 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-5">
                      <div className="flex items-start gap-4">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-ink-200 bg-ink-50 text-accent-700">
                          <Icon name={reason.icon} className="h-5 w-5" />
                        </span>
                        <div>
                          <span
                            aria-hidden="true"
                            className="font-mono text-xs tabular-nums text-ink-400"
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <h2 className="mt-1 text-xl font-semibold tracking-[-0.02em] text-ink-950">
                            {reason.title}
                          </h2>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-4">
                      <p className="text-[0.9375rem] leading-relaxed text-ink-600">
                        {reason.body}
                      </p>
                    </div>

                    <div className="lg:col-span-3">
                      <ul className="space-y-2">
                        {(DETAIL[reason.title] || []).map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2 text-[0.8125rem] leading-relaxed text-ink-500"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-accent-500"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
