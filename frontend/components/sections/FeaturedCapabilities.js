import { Container, Section, SectionHeading, Eyebrow } from '../ui/Section';
import Reveal from '../ui/Reveal';
import { WebsiteMock, CrmMock, AutomationMock } from '../visuals/Mockups';

const FEATURES = [
  {
    eyebrow: 'Build',
    title: 'Sites and software people actually finish using.',
    body: 'Websites and applications designed around the one action that matters on each screen — and built to load fast on the connection your customer actually has.',
    points: ['Conversion-led page structure', 'Responsive from 360px up', 'Accessible by default'],
    Visual: WebsiteMock,
  },
  {
    eyebrow: 'Manage',
    title: 'One record of the customer, not four.',
    body: 'CRM and ERP implementations that consolidate pipeline, operations and finance — so reporting stops depending on who exported which spreadsheet.',
    points: ['Pipeline and lead tracking', 'Inventory, finance and operations', 'Odoo implementation'],
    Visual: CrmMock,
  },
  {
    eyebrow: 'Automate',
    title: 'The repetitive steps stop needing a person.',
    body: 'Workflows that trigger on real business events, apply AI where judgement is needed, and write the result back into the systems you already run.',
    points: ['Event-driven workflows', 'AI classification and extraction', 'API and system integration'],
    Visual: AutomationMock,
  },
];

/**
 * Alternating split layout. Each row reverses direction on desktop, which
 * gives the page rhythm without introducing another card grid.
 */
export default function FeaturedCapabilities() {
  return (
    <Section tone="muted">
      <Container size="wide">
        <Reveal>
          <SectionHeading
            eyebrow="What it looks like"
            title="Technology you can point at."
            description="Representative interfaces for the work — illustrative of what gets built, not screenshots of an existing product."
            align="center"
          />
        </Reveal>

        <div className="mt-16 space-y-20 lg:space-y-28">
          {FEATURES.map((feature, index) => {
            const reversed = index % 2 === 1;
            return (
              <Reveal key={feature.title}>
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                  <div
                    className={
                      reversed
                        ? 'lg:col-span-5 lg:col-start-8 lg:row-start-1'
                        : 'lg:col-span-5'
                    }
                  >
                    <Eyebrow>{feature.eyebrow}</Eyebrow>
                    <h3 className="mt-4 text-2xl font-semibold leading-snug tracking-[-0.02em] text-ink-950 sm:text-[1.75rem]">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-600">
                      {feature.body}
                    </p>
                    <ul className="mt-6 space-y-2.5">
                      {feature.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-ink-700">
                          <span
                            aria-hidden="true"
                            className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-accent-600"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={
                      reversed
                        ? 'lg:col-span-6 lg:col-start-1 lg:row-start-1'
                        : 'lg:col-span-6 lg:col-start-7'
                    }
                  >
                    <feature.Visual />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
