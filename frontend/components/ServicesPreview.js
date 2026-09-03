import Link from 'next/link';

export default function ServicesPreview() {
  const services = [
    {
      title: 'Website Development',
      description: 'Modern, high-performance responsive websites optimized for business conversion and brand trust.',
    },
    {
      title: 'Web & Mobile App Development',
      description: 'Feature-rich web portals and native/cross-platform mobile applications tailored to your workflow.',
    },
    {
      title: 'CRM Solutions',
      description: 'Customized customer relationship management tools to track leads, pipelines, and customer retention.',
    },
    {
      title: 'ERP & Odoo Solutions',
      description: 'Integrated enterprise resource planning and Odoo implementation for inventory, finance, and operations.',
    },
    {
      title: 'Custom Software Development',
      description: 'Bespoke software architecture engineered specifically to solve complex industry-specific challenges.',
    },
    {
      title: 'Business Process Automation',
      description: 'Automated digital workflows that eliminate repetitive tasks and increase team productivity.',
    },
    {
      title: 'AI Automation',
      description: 'Intelligent AI models and automated processing agents to empower smart business decision-making.',
    },
    {
      title: 'API & System Integration',
      description: 'Seamless API bridges connecting third-party platforms, databases, and legacy software systems.',
    },
    {
      title: 'Digital Marketing',
      description: 'Data-backed digital growth campaigns, SEO optimization, and strategic performance marketing.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 lg:mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Our Expertise
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Full-Spectrum Digital Services
          </p>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From web platforms to enterprise automation, explore our specialized solutions engineered for measurable commercial impact.
          </p>
        </div>

        {/* 9 Services Grid mapped via .map() */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-500/40 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services CTA Link */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-blue-600 bg-white border border-blue-200 hover:bg-blue-50 hover:border-blue-300 rounded-xl shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            View All Services →
          </Link>
        </div>

      </div>
    </section>
  );
}
