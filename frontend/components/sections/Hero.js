import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { Container, Eyebrow } from '../ui/Section';
import Reveal from '../ui/Reveal';
import EcosystemDiagram from '../visuals/EcosystemDiagram';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      {/* Technical grid, masked so it dissolves before the content edges */}
      <div
        aria-hidden="true"
        className="grid-bg-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_55%,transparent_100%)]"
      />

      <Container size="wide" className="relative">
        <div className="grid grid-cols-1 items-center gap-14 py-20 lg:grid-cols-12 lg:gap-12 lg:py-28">
          <div className="lg:col-span-6 xl:col-span-5">
            <Reveal>
              <Eyebrow tone="dark">Technology &amp; Digital Solutions Partner</Eyebrow>
            </Reveal>

            <Reveal delay={60}>
              {/* The three-line promise is the whole positioning: build, automate, scale. */}
              <h1 className="mt-6 text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem]">
                Build smarter.
                <br />
                Automate faster.
                <br />
                <span className="text-gradient">Grow without limits.</span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-300 sm:text-[1.0625rem]">
                From high-converting websites and custom software to CRM, ERP, AI automation and
                system integration — InstaBizWeb turns business requirements into technology that
                measurably reduces manual work and connects your operations.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" variant="inverse" size="lg" className="group">
                  Book a Consultation
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Button>
                <Button href="/services" variant="outlineInverse" size="lg">
                  Explore Services
                </Button>
              </div>
            </Reveal>

            <Reveal delay={240}>
              {/* Capability categories, not fabricated metrics or client logos. */}
              <div className="mt-12 border-t border-white/10 pt-6">
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ink-500">
                  One partner across
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-400">
                  {['Web', 'Software', 'CRM / ERP', 'Automation', 'AI', 'Integrations', 'Growth'].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="h-1 w-1 rounded-full bg-accent-400/70"
                        />
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 xl:col-span-7">
            <Reveal delay={140}>
              <EcosystemDiagram />
              <p className="mt-3 text-center text-xs text-ink-600">
                Illustrative architecture — how the pieces connect.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
