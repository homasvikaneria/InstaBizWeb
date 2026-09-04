'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Container, Section, SectionHeading } from '../ui/Section';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import { SERVICE_GROUPS } from '../../lib/services';
import { cn } from '../../lib/cn';
import Icon from '../ui/Icon';

/**
 * All nine services, grouped into four outcomes.
 *
 * Desktop: a selectable index on the left drives a detail panel on the right,
 * so the section carries nine services without nine equal-weight cards.
 * Mobile: the same data as stacked groups — no hidden content behind an
 * interaction that is awkward on touch.
 */
export default function ServiceStack() {
  const [active, setActive] = useState(SERVICE_GROUPS[0].id);
  const group = SERVICE_GROUPS.find((item) => item.id === active) ?? SERVICE_GROUPS[0];

  return (
    <Section id="services" tone="light">
      <Container size="wide">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Capabilities"
              title="Everything your business needs to operate digitally."
              description="Nine services across four outcomes — build the systems, manage the data, automate the work between them, and grow what results."
            />
          </Reveal>
          <Reveal delay={80}>
            <Button href="/services" variant="secondary" size="md" className="group shrink-0">
              All services
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
          </Reveal>
        </div>

        {/* ---------- Desktop: index + detail panel ---------- */}
        <div className="mt-14 hidden lg:grid lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div role="tablist" aria-label="Service categories" className="flex flex-col">
              {SERVICE_GROUPS.map((item) => {
                const selected = item.id === active;
                return (
                  <button
                    key={item.id}
                    role="tab"
                    id={`tab-${item.id}`}
                    aria-selected={selected}
                    aria-controls={`panel-${item.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(item.id)}
                    onKeyDown={(event) => {
                      const index = SERVICE_GROUPS.findIndex((g) => g.id === active);
                      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                        event.preventDefault();
                        const next = SERVICE_GROUPS[(index + 1) % SERVICE_GROUPS.length];
                        setActive(next.id);
                        document.getElementById(`tab-${next.id}`)?.focus();
                      }
                      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                        event.preventDefault();
                        const prev =
                          SERVICE_GROUPS[
                            (index - 1 + SERVICE_GROUPS.length) % SERVICE_GROUPS.length
                          ];
                        setActive(prev.id);
                        document.getElementById(`tab-${prev.id}`)?.focus();
                      }
                    }}
                    className={cn(
                      'group relative flex items-start gap-4 border-l-2 py-5 pl-5 pr-4 text-left transition-colors duration-150',
                      selected
                        ? 'border-accent-600 bg-accent-50/50'
                        : 'border-ink-200 hover:border-ink-400 hover:bg-ink-50'
                    )}
                  >
                    <span
                      className={cn(
                        'mt-0.5 font-mono text-xs tabular-nums transition-colors',
                        selected ? 'text-accent-700' : 'text-ink-400'
                      )}
                    >
                      {item.index}
                    </span>
                    <span className="flex-1">
                      <span
                        className={cn(
                          'flex items-center gap-2 text-base font-semibold transition-colors',
                          selected ? 'text-ink-950' : 'text-ink-700'
                        )}
                      >
                        <Icon
                          name={item.icon}
                          className={cn(
                            'h-4 w-4',
                            selected ? 'text-accent-600' : 'text-ink-400'
                          )}
                        />
                        {item.label}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-ink-500">
                        {item.summary}
                      </span>
                    </span>
                    <span
                      className={cn(
                        'mt-1 shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] tabular-nums',
                        selected ? 'bg-accent-100 text-accent-800' : 'bg-ink-100 text-ink-500'
                      )}
                    >
                      {item.services.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div
              role="tabpanel"
              id={`panel-${group.id}`}
              aria-labelledby={`tab-${group.id}`}
              className="h-full rounded-2xl border border-ink-200 bg-ink-50/60 p-8"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm text-accent-700">{group.index}</span>
                <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink-950">
                  {group.label}
                </h3>
              </div>
              <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-ink-600">
                {group.summary}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {group.services.map((service) => (
                  <div
                    key={service.name}
                    className="group rounded-xl border border-ink-200 bg-white p-5 transition-[border-color,box-shadow] duration-200 hover:border-accent-300 hover:shadow-md"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink-950 text-white transition-colors group-hover:bg-accent-600">
                      <Icon name={service.icon} className="h-4 w-4" />
                    </span>
                    <h4 className="mt-4 text-[0.9375rem] font-semibold text-ink-950">
                      {service.name}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Mobile / tablet: stacked groups ---------- */}
        <div className="mt-12 space-y-10 lg:hidden">
          {SERVICE_GROUPS.map((item) => (
            <Reveal key={item.id}>
              <div className="border-t border-ink-200 pt-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-accent-700">{item.index}</span>
                  <h3 className="flex items-center gap-2 text-xl font-semibold tracking-[-0.02em] text-ink-950">
                    <Icon name={item.icon} className="h-4 w-4 text-accent-600" />
                    {item.label}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.summary}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {item.services.map((service) => (
                    <div
                      key={service.name}
                      className="rounded-xl border border-ink-200 bg-white p-4"
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink-950 text-white">
                        <Icon name={service.icon} className="h-3.5 w-3.5" />
                      </span>
                      <h4 className="mt-3 text-sm font-semibold text-ink-950">{service.name}</h4>
                      <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink-600">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
