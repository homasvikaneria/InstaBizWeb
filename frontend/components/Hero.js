import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white py-20 lg:py-28">
      {/* Background Accent Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Digital Solutions for Business Growth
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Accelerate Enterprise Growth with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Modern Digital Systems</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              InstaBizWeb partners with forward-thinking organizations to build high-performance web platforms, custom ERP &amp; CRM systems, and AI-driven business automation.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                Get a Free Consultation
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                Explore Our Services →
              </Link>
            </div>

            {/* Value Proof Badges */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-2xl font-bold text-white">99.9%</p>
                <p className="text-xs text-slate-400">Reliability &amp; Uptime</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="text-xs text-slate-400">Customized Codebase</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">End-to-End</p>
                <p className="text-xs text-slate-400">System Integration</p>
              </div>
            </div>
          </div>

          {/* Right Visual Dashboard Card (Pure CSS, No external images) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-slate-800/90 border border-slate-700/80 p-6 shadow-2xl backdrop-blur-xl">
              {/* Card Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/60 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  System Architecture
                </span>
              </div>

              {/* Card Metric Modules */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400">Workflow Automation</p>
                    <p className="text-lg font-semibold text-emerald-400">Active &amp; Optimized</p>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                    98%
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400">Custom ERP &amp; CRM Sync</p>
                    <p className="text-lg font-semibold text-blue-400">Live Integration</p>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs">
                    API
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400">Scalable Cloud Stack</p>
                    <p className="text-lg font-semibold text-indigo-300">Enterprise Ready</p>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300 font-bold text-xs">
                    24/7
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
