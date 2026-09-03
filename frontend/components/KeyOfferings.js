export default function KeyOfferings() {
  const offerings = [
    {
      title: 'Web & Mobile Solutions',
      description: 'High-conversion web platforms, custom mobile applications, and responsive digital tools crafted to expand your reach.',
      badge: 'User Experience',
    },
    {
      title: 'Business Systems',
      description: 'Tailored ERP, CRM, and enterprise management tools engineered for operational clarity and seamless reporting.',
      badge: 'Operations',
    },
    {
      title: 'Automation & AI',
      description: 'Intelligent workflows, AI agents, and automated process pipelines designed to eliminate manual bottlenecks.',
      badge: 'Efficiency',
    },
    {
      title: 'Integration & Digital Growth',
      description: 'Robust API bridges, system integrations, and multi-channel digital growth strategies for continuous expansion.',
      badge: 'Scalability',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 lg:mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Core Capabilities
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Key Digital Solution Categories
          </p>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We deliver targeted technology capabilities designed to streamline operations, enhance customer engagement, and fuel commercial growth.
          </p>
        </div>

        {/* 4 Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {offerings.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider bg-blue-100 text-blue-700">
                  {item.badge}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
