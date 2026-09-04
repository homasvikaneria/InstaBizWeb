import { Container, Section, Eyebrow } from '../../components/ui/Section';
import Reveal from '../../components/ui/Reveal';
import Process from '../../components/sections/Process';
import CTASection from '../../components/sections/CTASection';
import { ALL_SERVICES } from '../../lib/services';

export const metadata = {
  title: 'About',
  description:
    'InstaBizWeb is a technology and digital solutions partner — building, connecting and automating the systems businesses run on.',
  alternates: { canonical: '/about' },
};

const PRINCIPLES = [
  {
    title: 'Start with the business, not the brief',
    body: 'A request for “a new website” is usually a request for more qualified enquiries. A request for “a dashboard” is usually a request to stop reconciling spreadsheets. We work the problem back to what it is actually for, because that is what determines the right build.',
  },
  {
    title: 'Customisation where it counts',
    body: 'Not everything needs to be bespoke. Configuration beats code where a mature product already fits — Odoo for ERP, for instance. Custom development is reserved for the workflows that genuinely make your business different, which is where it earns its cost.',
  },
  {
    title: 'Automation as a design goal',
    body: 'Manual re-keying between two systems is not a process, it is an unfixed integration. We treat every hand-off as something to design out, so the system gets quieter to run over time rather than louder.',
  },
  {
    title: 'Built to still work later',
    body: 'Scalable architecture, current and maintainable stacks, and support past launch. The measure of the work is whether it holds up under more data, more traffic and more people — not whether it demoed well.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Section tone="dark" className="py-16 lg:py-24">
        <div
          aria-hidden="true"
          className="grid-bg-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,#000_50%,transparent_100%)]"
        />
        <Container size="wide" className="relative">
          <Eyebrow tone="dark">About</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
            A technology &amp; digital solutions partner.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-300 sm:text-lg">
            InstaBizWeb helps businesses grow through technology, automation and digital solutions
            — engaged as a partner accountable for the outcome, not a vendor delivering against a
            ticket.
          </p>
        </Container>
      </Section>

      <Section tone="light">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow>Positioning</Eyebrow>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={60}>
                <p className="text-2xl font-medium leading-[1.35] tracking-[-0.02em] text-ink-900 sm:text-[1.75rem] sm:leading-[1.35]">
                  The difference between a software vendor and a technology partner shows up after
                  launch — when the thing that was built has to survive contact with how the
                  business really operates.
                </p>
                <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-600">
                  <p>
                    A vendor scopes to the specification, ships it, and closes the engagement. That
                    works when the specification was right. It rarely is — not because anyone got it
                    wrong, but because a business only discovers what it needed once the first
                    version is in front of it.
                  </p>
                  <p>
                    InstaBizWeb is structured for the other case. We cover the full span —
                    websites, web and mobile applications, custom software, CRM, ERP and Odoo,
                    business process automation, AI automation, API and system integration, and
                    digital marketing — so the pieces can be designed to fit together rather than
                    integrated after the fact by whoever inherits them.
                  </p>
                  <p>
                    That breadth is the point. Most of the cost in a digital operation is not in
                    any single system; it is in the seams between them. One partner accountable for
                    all of it is the simplest way to make those seams stop leaking.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container size="wide">
          <Reveal>
            <Eyebrow>How we think about the work</Eyebrow>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2">
            {PRINCIPLES.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 60}>
                <div className="border-t border-ink-300/70 pt-6">
                  <span className="font-mono text-xs tabular-nums text-accent-700">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-ink-950">
                    {principle.title}
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="light" className="py-16 lg:py-20">
        <Container size="wide">
          <Reveal>
            <div className="rounded-2xl border border-ink-200 bg-ink-50/60 p-8 sm:p-10">
              <Eyebrow>What we cover</Eyebrow>
              <p className="mt-4 max-w-2xl text-xl font-medium leading-snug tracking-[-0.02em] text-ink-900">
                One partner across the whole digital operation.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {ALL_SERVICES.map((service) => (
                  <li
                    key={service.name}
                    className="rounded-lg border border-ink-200 bg-white px-3.5 py-2 text-sm text-ink-700"
                  >
                    {service.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Process />
      <CTASection />
    </>
  );
}
