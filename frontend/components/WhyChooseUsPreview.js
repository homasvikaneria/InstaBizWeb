import Link from 'next/link';

export default function WhyChooseUsPreview() {
  const differentiators = [
    {
      title: 'Customized Solutions',
      description: 'Bespoke systems tailored strictly to your business workflows, avoiding generic template constraints.',
    },
    {
      title: 'Business-Focused Development',
      description: 'Architected with a relentless focus on commercial ROI, lead acquisition, and operational throughput.',
    },
    {
      title: 'Modern Technology',
      description: 'Engineered using contemporary, secure, and maintainable tech stacks designed for longevity.',
    },
    {
      title: 'Automation First',
      description: 'Intelligent automation embedded into every process to save time and minimize operational overhead.',
    },
    {
      title: 'Built for Scalability',
      description: 'Resilient digital architecture ready to handle growing data, traffic, and organizational expansion.',
    },
    {
      title: 'End-to-End Support',
      description: 'Dedicated tech partnership from strategic initial discovery to deployment and continuous maintenance.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 lg:mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Why InstaBizWeb
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Engineered for Business Excellence
          </p>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We blend technical rigour with strategic business vision to deliver digital solutions that yield lasting value.
          </p>
        </div>

        {/* 6 Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {differentiators.map((point, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-500/30 transition-all duration-200"
            >
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {point.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Link */}
        <div className="mt-12 text-center">
          <Link
            href="/why-choose-us"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            Learn More About Why Businesses Choose Us →
          </Link>
        </div>

      </div>
    </section>
  );
}
