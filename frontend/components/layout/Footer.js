import Link from 'next/link';
import { Phone, Mail, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import Button from '../ui/Button';
import { Container } from '../ui/Section';
import { ALL_SERVICES } from '../../lib/services';
import { CONTACT } from '../../lib/site';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Why Us', href: '/why-choose-us' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink-950 text-ink-300">
      <Container size="wide">
        {/* Closing conversion band */}
        <div className="flex flex-col gap-6 border-b border-white/10 py-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-lg">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Start with a conversation.
            </h2>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-400">
              Tell us what you are trying to build, improve or automate.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" variant="inverse" size="md">
              Book a Consultation
            </Button>
            <Button href="/contact#enquiry" variant="outlineInverse" size="md">
              Send an Enquiry
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <Logo tone="dark" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-400">
              Digital Solutions for Business Growth. A technology partner for building,
              automating and scaling your business.
            </p>
          </div>

          <nav className="md:col-span-2" aria-labelledby="footer-nav">
            <h3
              id="footer-nav"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-white"
            >
              Navigate
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded text-ink-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-3" aria-labelledby="footer-services">
            <h3
              id="footer-services"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-white"
            >
              Services
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {ALL_SERVICES.map((service) => (
                <li key={service.name}>
                  <Link
                    href="/services"
                    className="rounded text-ink-400 transition-colors hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="group inline-flex items-center gap-2.5 rounded text-ink-400 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 opacity-60" aria-hidden="true" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group inline-flex items-center gap-2.5 rounded text-ink-400 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 opacity-60" aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="pt-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 rounded text-sm font-medium text-accent-300 transition-colors hover:text-accent-200"
                >
                  Send an enquiry
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 py-7 text-xs text-ink-500 sm:flex-row sm:items-center">
          <p>© {year} InstaBizWeb. All rights reserved.</p>
          <p>Digital Solutions for Business Growth.</p>
        </div>
      </Container>
    </footer>
  );
}
