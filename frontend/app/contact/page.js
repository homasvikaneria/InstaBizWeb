import { Phone, Mail, MessageSquare, Workflow, Wrench } from 'lucide-react';
import { Container, Section, Eyebrow } from '../../components/ui/Section';
import EnquiryForm from '../../components/forms/EnquiryForm';
import { CONTACT } from '../../lib/site';

export const metadata = {
  title: 'Contact',
  description:
    'Tell InstaBizWeb what you are trying to build, improve or automate. Send an enquiry about website development, custom software, CRM, ERP, automation, AI or integrations.',
  alternates: { canonical: '/contact' },
};

const EXPECTATIONS = [
  {
    icon: MessageSquare,
    title: 'We read the requirement',
    body: 'Someone technical reviews what you sent — not an auto-responder.',
  },
  {
    icon: Wrench,
    title: 'We come back with questions',
    body: 'Usually the ones that change the scope before anyone quotes it.',
  },
  {
    icon: Workflow,
    title: 'We propose an approach',
    body: 'What to build first, what can wait, and how the pieces connect.',
  },
];

export default function ContactPage() {
  return (
    <>
      <Section tone="dark" className="py-16 lg:py-20">
        <div
          aria-hidden="true"
          className="grid-bg-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,#000_50%,transparent_100%)]"
        />
        <Container size="wide" className="relative">
          <Eyebrow tone="dark">Contact</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
            Tell us what you&apos;re trying to build.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-300 sm:text-lg">
            Send an enquiry and we&apos;ll review your requirements. If it&apos;s quicker to talk,
            the phone number and inbox below reach us directly.
          </p>

          <div className="mt-8 flex flex-col gap-x-8 gap-y-3 sm:flex-row">
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center gap-2.5 rounded text-[0.9375rem] text-ink-200 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 opacity-60" aria-hidden="true" />
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2.5 rounded text-[0.9375rem] text-ink-200 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 opacity-60" aria-hidden="true" />
              {CONTACT.email}
            </a>
          </div>
        </Container>
      </Section>

      <Section tone="muted" id="enquiry" className="scroll-mt-20">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-ink-950">
                Send an enquiry
              </h2>
              <p className="mt-2 text-[0.9375rem] text-ink-600">
                All fields are required. The more specific the message, the more useful our reply.
              </p>
              <div className="mt-7">
                <EnquiryForm />
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-24">
                <Eyebrow>What happens next</Eyebrow>
                <ul className="mt-6 space-y-6">
                  {EXPECTATIONS.map((item, index) => (
                    <li key={item.title} className="flex gap-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-ink-200 bg-white text-accent-700">
                        <item.icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-[0.9375rem] font-semibold text-ink-950">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-ink-600">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-xl border border-ink-200 bg-white p-5">
                  <p className="text-sm font-semibold text-ink-950">Prefer to talk first?</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                    Call or email and we&apos;ll pick it up from there.
                  </p>
                  <div className="mt-4 space-y-2.5 text-sm">
                    <a
                      href={`tel:${CONTACT.phone}`}
                      className="flex items-center gap-2.5 rounded text-ink-700 transition-colors hover:text-accent-700"
                    >
                      <Phone className="h-4 w-4 text-ink-400" aria-hidden="true" />
                      {CONTACT.phoneDisplay}
                    </a>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="flex items-center gap-2.5 rounded text-ink-700 transition-colors hover:text-accent-700"
                    >
                      <Mail className="h-4 w-4 text-ink-400" aria-hidden="true" />
                      {CONTACT.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
