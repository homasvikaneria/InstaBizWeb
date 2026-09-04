'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

/**
 * Scroll-reveal without an animation library.
 *
 * Content is visible by default. The hidden-then-fade-in state is only armed
 * once this component mounts and confirms the user has not asked for reduced
 * motion — so with JS disabled, or with `prefers-reduced-motion: reduce`, the
 * page renders fully formed and nothing ever animates.
 */
export default function Reveal({ children, delay = 0, className, as: Tag = 'div' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    // Arm the hidden state only now that we know we can animate out of it.
    document.documentElement.setAttribute('data-reveal-ready', 'true');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn('reveal-item', className)}
      data-visible={visible ? 'true' : 'false'}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
