import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Why Choose Us', href: '/why-choose-us' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Description Column */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                I
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white">
                  InstaBiz<span className="text-blue-400">Web</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                  Digital Solutions
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Digital Solutions for Business Growth. We build high-performance web systems, custom digital tools, and scalable platforms designed to accelerate your commercial reach.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm" role="list">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Positioning Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Get Started
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ready to transform your business's online presence? Get in touch with our team for a tailored digital solution.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded group"
            >
              Contact Us <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* Bottom Copyright Line */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} InstaBizWeb. All rights reserved.</p>
          <p className="text-slate-400">Designed for modern B2B excellence.</p>
        </div>
      </div>
    </footer>
  );
}
