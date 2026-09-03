import Link from 'next/link';

export const metadata = {
  title: 'Why Choose Us | InstaBizWeb - Technology & Digital Partner',
  description: 'Discover why businesses choose InstaBizWeb: customized solutions, business-focused development, modern technology, automation, scalability, and end-to-end support.',
};

export default function WhyChooseUsPage() {
  const differentiators = [
    {
      id: 'customized-solutions',
      title: 'Customized Solutions',
      explanation: 'We design and engineer bespoke software and web platforms built specifically around your unique business processes, eliminating the limitations of rigid template software.',
      businessValue: 'Solves your exact operational requirements without requiring workflow compromises.',
    },
    {
      id: 'business-focused-dev',
      title: 'Business-Focused Development',
      explanation: 'Our development process is guided by your commercial objectives—focusing on return on investment, lead generation, customer satisfaction, and operational efficiency.',
      businessValue: 'Ensures your technology investment directly drives business metrics.',
    },
    {
      id: 'modern-technology',
      title: 'Modern Technology',
      explanation: 'We leverage contemporary, secure, and maintainable tech stacks built according to modern industry standards, ensuring high speed, security, and stability.',
      businessValue: 'Delivers high-performance software with long-term reliability.',
    },
    {
      id: 'automation-first',
      title: 'Automation First',
      explanation: 'We identify manual, repetitive tasks across your operations and integrate intelligent automated workflows that reduce manual overhead and processing time.',
      businessValue: 'Minimizes human error and reduces operational execution costs.',
    },
    {
      id: 'built-for-scalability',
      title: 'Scalability',
      explanation: 'Our digital solutions feature modular, cloud-ready architecture built to handle expanding user bases, higher data volumes, and expanding business operations smoothly.',
      businessValue: 'Protects your software investment as your company grows.',
    },
    {
      id: 'end-to-end-support',
      title: 'End-to-End Support',
      explanation: 'We serve as a long-term technology partner, guiding you through initial discovery, software architecture, deployment, and ongoing post-launch technical support.',
      businessValue: 'Provides dependable continuous technical expertise whenever you need it.',
    },
  ];

  const valueJourney = [
    {
      num: '01',
      title: 'Deep Requirement Discovery',
      detail: 'We take time to thoroughly analyze your business processes, team pain points, and commercial targets before writing code.',
    },
    {
      num: '02',
      title: 'Solving Operational Bottlenecks',
      detail: 'We target specific friction points in your workflow that cause delays, error rates, or lost revenue opportunities.',
    },
    {
      num: '03',
      title: 'Improving Process Efficiency',
      detail: 'We streamline daily employee tasks with clean, intuitive software interfaces and structured data pipelines.',
    },
    {
      num: '04',
      title: 'Connecting Disparate Systems',
      detail: 'We unify isolated databases and third-party tools into a single, cohesive digital ecosystem.',
    },
    {
      num: '05',
      title: 'Preparing Infrastructure for Growth',
      detail: 'We build flexible codebases designed to absorb future operational changes and expansion seamlessly.',
    },
    {
      num: '06',
      title: 'Ongoing Technical Maintenance',
      detail: 'We provide dedicated long-term system updates, security monitoring, and continuous technical support.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative bg-slate-900 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.15),transparent_100%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            Why Choose InstaBizWeb
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Engineering Practical Digital Solutions for <span className="text-blue-400">Sustainable Growth</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            InstaBizWeb is a technology partner committed to custom software development, modern architecture, and business-focused results.
          </p>
        </div>
      </section>

      {/* 2. Six Differentiators Grid */}
      <section className="py-16 lg:py-24 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 lg:mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Our Core Differentiators
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Six Reasons Businesses Partner With Us
            </p>
            <p className="text-sm sm:text-base text-slate-600">
              We combine technical excellence with strategic business focus to build software that drives actual commercial value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {differentiators.map((diff, idx) => (
              <div
                key={diff.id}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-500/40 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{diff.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {diff.explanation}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80">
                  <p className="text-xs font-semibold text-slate-900">
                    <span className="text-blue-600">Business Value:</span> {diff.businessValue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How We Add Value */}
      <section className="py-16 lg:py-24 border-b border-slate-200/80 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 lg:mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Value Delivery
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Connecting Technology to Your Business Journey
            </p>
            <p className="text-sm sm:text-base text-slate-600">
              Here is how our six principles translate into real-world business outcomes for your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueJourney.map((step) => (
              <div
                key={step.num}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3 shadow-sm hover:border-blue-500/30 transition-all"
              >
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  PILLAR {step.num}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Dual Conversion CTA */}
      <section className="py-16 lg:py-20 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Ready to Partner With InstaBizWeb?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Let's discuss how our customized digital solutions, process automation, and scalable software architecture can support your company.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Get a Free Consultation →
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
