import {
  Blocks,
  Globe,
  Smartphone,
  Code2,
  Database,
  Users,
  LayoutGrid,
  Workflow,
  Zap,
  Sparkles,
  Share2,
  TrendingUp,
  LineChart,
  Ruler,
  Target,
  Layers,
  LifeBuoy,
  Circle,
} from 'lucide-react';

/**
 * Explicit icon registry.
 *
 * Data files reference icons by name, but `import * as Icons from
 * 'lucide-react'` would pull the entire library into any client bundle that
 * used it — the barrel import cannot be tree-shaken. Naming each icon keeps
 * only what is actually rendered.
 */
const REGISTRY = {
  Blocks,
  Globe,
  Smartphone,
  Code2,
  Database,
  Users,
  LayoutGrid,
  Workflow,
  Zap,
  Sparkles,
  Share2,
  TrendingUp,
  LineChart,
  Ruler,
  Target,
  Layers,
  LifeBuoy,
};

export default function Icon({ name, className }) {
  const Cmp = REGISTRY[name] || Circle;
  return <Cmp className={className} aria-hidden="true" />;
}
