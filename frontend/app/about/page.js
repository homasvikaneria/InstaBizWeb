import Link from 'next/link';

export const metadata = {
  title: 'About Us | InstaBizWeb - Technology & Digital Solutions Partner',
  description: 'Learn about InstaBizWeb, your technology and digital solutions partner dedicated to custom web development, business automation, and enterprise growth.',
};

export default function AboutPage() {
  const coreSolutions = [
    {
      title: 'Web & Mobile Solutions',
      description: 'Custom responsive web platforms and intuitive mobile applications designed for high performance and seamless user interaction.',
    },
    {
      title: 'Business Systems',
      description: 'Tailored CRM, ERP, and internal management tools that give organizations total operational visibility and control.',
    },
    {
      title: 'Automation & AI',
      description: 'Intelligent process automation and AI tools engineered to eliminate manual bottlenecks and boost organizational productivity.',
    },
    {
      title: 'Integration & Digital Growth',
      description: 'Robust API bridges connecting disparate platforms with data-backed digital growth strategies.',
    },
  ];

  const approachPrinciples = [
    {
      title: 'Understanding Business Requirements',
      description: 'We start by analyzing your operational workflows to ensure software is built around actual commercial goals.',
    },
    {
      title: 'Practical Digital Solutions',
      description: 'We focus on pragmatic software architecture that delivers immediate value rather than unnecessary technical complexity.',
    },
    {
      title: 'Automation Where Useful',
      description: 'We target repetitive manual processes for intelligent automation, freeing your team to focus on strategic growth.',
    },
    {
      title: 'Scalable Systems',
      description: 'Our solutions are engineered with modular architecture, ensuring your digital infrastructure scales seamlessly as your business expands.',
    },
    {
      title: 'Long-Term Maintainability',
      description: 'We adhere to clean coding standards and clear documentation, ensuring long-term security, reliability, and ease of updates.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. About Hero */}
      <section className="relative bg-slate-900 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.15),transparent_100%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            About InstaBizWeb
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Your Technology &amp; <span className="text-blue-400">Digital Solutions</span> Partner
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Digital Solutions for Business Growth. We partner with businesses to design, engineer, and deploy reliable digital platforms that drive real-world operational results.
          </p>
        </div>
      </section>

      {/* 2. Who We Are */}
      <section className="py-16 lg:py-20 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                Who We Are
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Empowering Businesses Through Purpose-Built Technology
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                InstaBizWeb is a modern technology and digital solutions partner. We specialize in transforming complex business challenges into intuitive, scalable web software and automated systems.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Whether you need a high-converting web presence, a custom ERP/CRM tool to manage operations, or automated workflow integrations, InstaBizWeb serves as your trusted digital team—focusing on practical software that generates measurable commercial impact.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 space-y-4 shadow-xl">
                <h3 className="text-xl font-bold text-white">Our Core Mission</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  To provide accessible, robust, and scalable digital solutions that help companies streamline workflows, reach more customers, and adapt to modern digital demands.
                </p>
                <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xl font-bold text-blue-400">100% Custom</span>
                    <span className="text-xs text-slate-400">Business-Driven Code</span>
                  </div>
                  <div>
                    <span className="block text-xl font-bold text-blue-400">End-to-End</span>
                    <span className="text-xs text-slate-400">Engineering Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What We Do */}
      <section className="py-16 lg:py-20 border-b border-slate-200/80 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              What We Do
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Broad Digital Capability Areas
            </p>
            <p className="text-sm sm:text-base text-slate-600">
              We focus on core technology pillars designed to support every phase of digital business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreSolutions.map((sol, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-blue-500/40 transition-all space-y-3"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{sol.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{sol.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Business-Focused Approach */}
      <section className="py-16 lg:py-20 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Our Principles
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              A Business-Focused Engineering Approach
            </p>
            <p className="text-sm sm:text-base text-slate-600">
              Technology should serve your commercial strategy. Here is how we align development with real business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approachPrinciples.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:bg-slate-100/80 transition-colors"
              >
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed pl-4">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-16 lg:py-20 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Partner with InstaBizWeb for Your Next Digital Initiative
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Ready to explore custom web applications, business systems, or process automation? Let's discuss your business requirements.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Get a Free Consultation →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
