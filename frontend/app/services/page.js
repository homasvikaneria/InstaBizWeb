import Link from 'next/link';

export const metadata = {
  title: 'Services | InstaBizWeb - Enterprise Digital Solutions',
  description: 'Explore InstaBizWeb\'s full digital service capabilities including website development, custom CRM/ERP systems, process automation, AI integration, and growth marketing.',
};

export default function ServicesPage() {
  const servicesList = [
    {
      id: 'website-development',
      name: 'Website Development',
      description: 'Modern, high-performance responsive websites designed to reflect your brand identity and convert visitors into qualified business leads.',
      benefit: 'Increases online brand credibility and lead conversion rates.',
    },
    {
      id: 'app-development',
      name: 'Web & Mobile App Development',
      description: 'Feature-rich web portals and cross-platform mobile applications tailored to your specific organizational workflows and customer touchpoints.',
      benefit: 'Delivers accessible digital tools to employees and clients anywhere.',
    },
    {
      id: 'crm-solutions',
      name: 'CRM Solutions',
      description: 'Customized customer relationship management systems built to manage sales pipelines, customer interactions, and team follow-ups.',
      benefit: 'Improves sales productivity and client retention.',
    },
    {
      id: 'erp-odoo-solutions',
      name: 'ERP & Odoo Solutions',
      description: 'Comprehensive enterprise resource planning and customized Odoo implementations for streamlined inventory, finance, and operational control.',
      benefit: 'Centralizes business data and optimizes operational throughput.',
    },
    {
      id: 'custom-software',
      name: 'Custom Software Development',
      description: 'Bespoke software solutions engineered strictly to solve specialized operational bottlenecks that off-the-shelf products cannot address.',
      benefit: 'Provides proprietary competitive advantage and tailored control.',
    },
    {
      id: 'process-automation',
      name: 'Business Process Automation',
      description: 'Automated digital workflows that eliminate repetitive manual data entry, streamline approvals, and speed up operational cycles.',
      benefit: 'Reduces operational costs and minimizes manual human error.',
    },
    {
      id: 'ai-automation',
      name: 'AI Automation',
      description: 'Intelligent AI models and automated data processing pipelines designed to assist decision-making and automate complex tasks.',
      benefit: 'Accelerates data insights and enhances operational intelligence.',
    },
    {
      id: 'api-integration',
      name: 'API & System Integration',
      description: 'Secure API bridges and custom middleware connecting third-party platforms, payment systems, and legacy databases.',
      benefit: 'Eliminates data silos and ensures real-time system synchronization.',
    },
    {
      id: 'digital-marketing',
      name: 'Digital Marketing',
      description: 'Strategic search engine optimization, performance marketing campaigns, and content strategies focused on qualified customer acquisition.',
      benefit: 'Drives targeted commercial traffic and measurable inbound growth.',
    },
  ];

  const deliveryApproach = [
    {
      step: '01',
      title: 'Understand Business Requirements',
      text: 'We begin with thorough discovery to analyze your operational workflows, pain points, and commercial objectives.',
    },
    {
      step: '02',
      title: 'Design the Right Solution',
      text: 'We map out a clear software architecture and user experience tailored to your exact business needs before building.',
    },
    {
      step: '03',
      title: 'Build with Appropriate Tech',
      text: 'We select robust, secure, and modern tech stacks that prioritize stability, performance, and long-term maintainability.',
    },
    {
      step: '04',
      title: 'Automate Where Useful',
      text: 'We identify manual bottlenecks and embed targeted automation to maximize efficiency and reduce recurring work.',
    },
    {
      step: '05',
      title: 'Integrate Existing Systems',
      text: 'We seamlessly connect new digital modules with your current databases, APIs, and business software.',
    },
    {
      step: '06',
      title: 'Support Future Scalability',
      text: 'We structure flexible, documented codebases engineered to grow alongside your expanding enterprise.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Services Hero */}
      <section className="relative bg-slate-900 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.15),transparent_100%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            Our Services
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Digital Solutions Engineered for <span className="text-blue-400">Business Growth</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            InstaBizWeb provides end-to-end technology capabilities—from custom web applications to enterprise ERP/CRM systems and process automation.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Get a Free Consultation →
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Services Grid (9 Required Services mapped via .map()) */}
      <section className="py-16 lg:py-24 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 lg:mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Full Service Capabilities
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Comprehensive Technology &amp; Digital Solutions
            </p>
            <p className="text-sm sm:text-base text-slate-600">
              Explore our core digital services designed to optimize operations, improve customer engagement, and fuel business expansion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {servicesList.map((service, index) => (
              <div
                key={service.id}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-500/40 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                      0{index + 1}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                      Digital Service
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">
                    {service.name}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80">
                  <p className="text-xs font-semibold text-slate-900">
                    <span className="text-blue-600">Business Benefit:</span> {service.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Solution Delivery Approach */}
      <section className="py-16 lg:py-24 border-b border-slate-200/80 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 lg:mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Delivery Methodology
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Our Solution Delivery Approach
            </p>
            <p className="text-sm sm:text-base text-slate-600">
              We follow a structured, business-aligned process to ensure software projects are delivered on target and ready to scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliveryApproach.map((pillar) => (
              <div
                key={pillar.step}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3 shadow-sm hover:border-blue-500/30 transition-all"
              >
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  STEP {pillar.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Final Conversion CTA */}
      <section className="py-16 lg:py-20 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Ready to Build Your Custom Digital Solution?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Get in touch with our team to discuss your project requirements and explore how InstaBizWeb can support your company's growth.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-900 bg-white hover:bg-slate-100 active:bg-slate-200 rounded-xl shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Start Your Project →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
