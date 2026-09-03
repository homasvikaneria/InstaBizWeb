import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Ready to Accelerate Your Digital Transformation?
        </h2>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Let’s discuss your project goals. Partner with InstaBizWeb to build custom software, web platforms, and automated business systems tailored for growth.
        </p>

        <div className="pt-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-900 bg-white hover:bg-slate-100 active:bg-slate-200 rounded-xl shadow-xl hover:shadow-2xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
          >
            Start Your Project Today →
          </Link>
        </div>
      </div>
    </section>
  );
}
