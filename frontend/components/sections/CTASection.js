import { ArrowRight, Phone, Mail } from 'lucide-react';
import { Container, Section } from '../ui/Section';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import { CONTACT } from '../../lib/site';

export default function CTASection() {
  return (
    <Section tone="dark" className="overflow-hidden py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(91,70,229,0.22),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="grid-bg-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,#000_40%,transparent_100%)]"
      />

      <Container size="narrow" className="relative text-center">
        <Reveal>
          <h2 className="text-3xl font-semibold leading-[1.12] tracking-[-0.03em] text-white sm:text-4xl lg:text-[3rem]">
            Have a business challenge?
            <br />
            <span className="text-gradient">Let&apos;s turn it into a digital solution.</span>
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-300 sm:text-lg">
            Tell us what you are trying to build, improve or automate. We&apos;ll review your
            requirements and come back to you.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" variant="inverse" size="lg" className="group w-full sm:w-auto">
              Book a Consultation
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
            <Button
              href="/contact#enquiry"
              variant="outlineInverse"
              size="lg"
              className="w-full sm:w-auto"
            >
              Send an Enquiry
            </Button>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-12 flex flex-col items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-8 text-sm sm:flex-row">
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center gap-2 rounded text-ink-300 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 opacity-60" aria-hidden="true" />
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 rounded text-ink-300 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 opacity-60" aria-hidden="true" />
              {CONTACT.email}
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
