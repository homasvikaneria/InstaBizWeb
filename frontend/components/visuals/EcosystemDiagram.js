import { cn } from '../../lib/cn';

/**
 * The hero visual: an abstract system architecture showing how the service
 * layers connect — Website/Apps feed CRM and ERP, which feed Automation and
 * AI, which produce measurable growth.
 *
 * Pure inline SVG. No images, no canvas, no animation library. The dashed
 * flow lines animate via CSS and stop entirely under prefers-reduced-motion
 * (handled globally in globals.css).
 *
 * Decorative: the surrounding section carries the real text, so this is
 * aria-hidden rather than given a long description nobody wants read aloud.
 */

function Node({ x, y, w = 108, label, sub, accent = false, delay = 0 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width={w}
        height="46"
        rx="9"
        fill={accent ? 'rgba(91,70,229,0.16)' : 'rgba(255,255,255,0.035)'}
        stroke={accent ? 'rgba(130,134,249,0.55)' : 'rgba(255,255,255,0.11)'}
        strokeWidth="1"
      />
      <text
        x="14"
        y="20"
        fill={accent ? '#c6ceff' : '#ffffff'}
        fontSize="11.5"
        fontWeight="600"
        letterSpacing="-0.01em"
      >
        {label}
      </text>
      <text x="14" y="34" fill="rgba(255,255,255,0.42)" fontSize="9.5" letterSpacing="0.02em">
        {sub}
      </text>
      <circle
        cx={w - 14}
        cy="16"
        r="2.5"
        fill={accent ? '#8286f9' : '#22d3ee'}
        style={{ animation: `pulse-node 3s ease-in-out ${delay}s infinite` }}
      />
    </g>
  );
}

function Flow({ d, delay = 0 }) {
  return (
    <>
      <path d={d} stroke="rgba(255,255,255,0.10)" strokeWidth="1.25" fill="none" />
      <path
        d={d}
        stroke="rgba(130,134,249,0.75)"
        strokeWidth="1.25"
        fill="none"
        strokeDasharray="4 12"
        style={{ animation: `flow-dash 1.6s linear ${delay}s infinite` }}
      />
    </>
  );
}

export default function EcosystemDiagram({ className }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/10 bg-ink-950/60 shadow-panel',
        className
      )}
    >
      {/* Panel chrome — reads as a product surface, not a decorative card */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">
          Connected business systems
        </span>
      </div>

      <div className="grid-bg-dark relative">
        <svg
          viewBox="0 0 460 330"
          className="w-full"
          role="img"
          aria-hidden="true"
          focusable="false"
        >
          {/* Layer 1 — customer-facing */}
          <Node x="24" y="26" label="Website" sub="Acquisition" delay={0} />
          <Node x="180" y="26" label="Web & Mobile Apps" w={130} sub="Engagement" delay={0.4} />
          <Node x="336" y="26" label="Marketing" sub="Reach" delay={0.8} />

          {/* Layer 2 — systems of record */}
          <Node x="66" y="132" label="CRM" sub="Customers & pipeline" w={140} delay={0.2} />
          <Node x="256" y="132" label="ERP / Odoo" sub="Operations & finance" w={140} delay={0.6} />

          {/* Layer 3 — the connective tissue */}
          <Node x="24" y="222" label="Integrations" sub="APIs" delay={1} />
          <Node x="176" y="222" label="Automation" sub="Workflows" delay={0.3} />
          <Node x="328" y="222" label="AI" sub="Decisioning" delay={0.7} />

          {/* Outcome */}
          <g transform="translate(140 292)">
            <rect
              width="180"
              height="30"
              rx="15"
              fill="rgba(91,70,229,0.2)"
              stroke="rgba(130,134,249,0.5)"
            />
            <text
              x="90"
              y="19.5"
              textAnchor="middle"
              fill="#c6ceff"
              fontSize="11"
              fontWeight="600"
              letterSpacing="0.02em"
            >
              Measurable business growth
            </text>
          </g>

          {/* Flows: customer-facing → systems of record */}
          <Flow d="M78 72 L78 100 Q78 132 136 132" delay={0} />
          <Flow d="M245 72 L245 100 Q245 116 200 124 L142 132" delay={0.3} />
          <Flow d="M390 72 L390 100 Q390 132 326 132" delay={0.6} />

          {/* CRM ⇄ ERP */}
          <Flow d="M206 155 L256 155" delay={0.15} />

          {/* Systems of record → connective layer */}
          <Flow d="M136 178 L136 200 Q136 222 78 222" delay={0.45} />
          <Flow d="M160 178 L200 210 L226 222" delay={0.2} />
          <Flow d="M326 178 L326 200 Q326 222 372 222" delay={0.5} />

          {/* Connective layer → outcome */}
          <Flow d="M78 268 L78 292 L140 300" delay={0.35} />
          <Flow d="M226 268 L226 292" delay={0.1} />
          <Flow d="M372 268 L372 292 L320 300" delay={0.55} />
        </svg>

        {/* Accent glow, kept low-opacity so it reads as light rather than gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_100%,rgba(91,70,229,0.16),transparent_70%)]"
        />
      </div>
    </div>
  );
}
