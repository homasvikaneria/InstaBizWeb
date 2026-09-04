import { ArrowRight } from 'lucide-react';
import { Container, Section, Eyebrow } from '../ui/Section';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';

/**
 * Editorial statement block. Large type doing the work instead of a card —
 * deliberately the quietest section on the page, placed between the process
 * timeline and the closing CTA.
 */
export default function AboutTeaser() {
  return (
    <Section tone="light">
      <Container size="wide">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>About</Eyebrow>
              <p className="mt-5 text-sm leading-relaxed text-ink-500">
                A technology and digital solutions partner — engaged for the outcome, not for a
                fixed list of deliverables.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={80}>
              <p className="text-2xl font-medium leading-[1.35] tracking-[-0.02em] text-ink-900 sm:text-[1.75rem] sm:leading-[1.35]">
                Most vendors take a specification and return software. A partner asks what the
                specification is trying to fix — then builds the system, connects it to what you
                already run, automates the manual work around it, and stays for the part where it
                has to keep working.
              </p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-600">
                That is the difference InstaBizWeb is built around. Websites, applications, custom
                software, CRM, ERP, automation, AI and integrations are not nine separate offerings
                sold separately — they are the pieces of one digital operation, and they work best
                when one team is accountable for how they fit together.
              </p>
              <div className="mt-8">
                <Button href="/about" variant="secondary" size="md" className="group">
                  More about how we work
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
