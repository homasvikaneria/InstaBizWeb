import { ArrowRight } from 'lucide-react';
import { Container, Section, Eyebrow, SectionHeading } from '../../components/ui/Section';
import Reveal from '../../components/ui/Reveal';
import Button from '../../components/ui/Button';
import Process from '../../components/sections/Process';
import CTASection from '../../components/sections/CTASection';
import { SERVICE_GROUPS, ALL_SERVICES } from '../../lib/services';
import Icon from '../../components/ui/Icon';

export const metadata = {
  title: 'Services',
  description:
    'Website development, web and mobile app development, custom software, CRM solutions, ERP and Odoo, business process automation, AI automation, API and system integration, and digital marketing.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <Section tone="dark" className="py-16 lg:py-24">
        <div
          aria-hidden="true"
          className="grid-bg-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,#000_50%,transparent_100%)]"
        />
        <Container size="wide" className="relative">
          <Eyebrow tone="dark">Services</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
            Nine services. One connected digital operation.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-300 sm:text-lg">
            Grouped by the outcome they produce rather than the technology behind them — because
            the useful question is what changes in the business, not which framework was used.
          </p>

          {/* Jump links: nine services is a lot to scroll past blind. */}
          <nav aria-label="Service categories" className="mt-9 flex flex-wrap gap-2">
            {SERVICE_GROUPS.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-ink-200 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <span className="font-mono text-xs text-accent-300">{group.index}</span>
                {group.label}
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      {SERVICE_GROUPS.map((group, groupIndex) => (
        <Section
          key={group.id}
          id={group.id}
          tone={groupIndex % 2 === 0 ? 'light' : 'muted'}
          className="scroll-mt-16 py-16 lg:py-20"
        >
          <Container size="wide">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-4">
                <Reveal>
                  <div className="lg:sticky lg:top-24">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-accent-700">{group.index}</span>
                      <span className="h-px w-8 bg-ink-300" aria-hidden="true" />
                    </div>
                    <h2 className="mt-4 flex items-center gap-2.5 text-3xl font-semibold tracking-[-0.025em] text-ink-950">
                      <Icon name={group.icon} className="h-6 w-6 text-accent-600" />
                      {group.label}
                    </h2>
                    <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-600">
                      {group.summary}
                    </p>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-8">
                <div className="divide-y divide-ink-200 border-y border-ink-200">
                  {group.services.map((service, index) => (
                    <Reveal key={service.name} delay={index * 60}>
                      <article className="group flex flex-col gap-4 py-7 sm:flex-row sm:gap-6">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-ink-200 bg-white text-ink-700 transition-colors duration-200 group-hover:border-accent-300 group-hover:bg-accent-50 group-hover:text-accent-700">
                          <Icon name={service.icon} className="h-5 w-5" />
                        </span>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold tracking-[-0.015em] text-ink-950">
                            {service.name}
                          </h3>
                          <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-ink-600">
                            {service.description}
                          </p>
                        </div>
                        <div className="sm:self-center">
                          <Button
                            href="/contact"
                            variant="ghost"
                            size="sm"
                            className="group/cta -ml-2 sm:ml-0"
                          >
                            Enquire
                            <ArrowRight
                              className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5"
                              aria-hidden="true"
                            />
                          </Button>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <Section tone="light" className="py-16 lg:py-20">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Full catalogue"
              title="All nine, in one view."
              description="Choose any of these in the enquiry form — or pick “Other” if what you need sits between them."
              align="center"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200 sm:grid-cols-2 lg:grid-cols-3">
              {ALL_SERVICES.map((service) => (
                <div key={service.name} className="bg-white p-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent-700">
                    {service.group}
                  </span>
                  <p className="mt-2 flex items-start gap-2 text-sm font-medium text-ink-900">
                    <Icon name={service.icon} className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
                    {service.name}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Process />
      <CTASection />
    </>
  );
}
