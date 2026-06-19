'use client';

import { useEffect, useId, useRef } from 'react';

type Tag = 'p' | 'h2' | 'h3' | 'h4' | 'span' | 'div';

interface TextRevealProps {
  children: string;
  tag?: Tag;
  style?: React.CSSProperties;
  className?: string;
}

export default function TextReveal({ children, tag: Tag = 'p', style, className }: TextRevealProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref  = useRef<any>(null);
  const uid  = useId().replace(/[^a-zA-Z0-9]/g, '');
  const name = `--tr${uid}`;

  const words = children.trim().split(/\s+/);
  const total = words.length;

  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;

    if (CSS.supports('animation-timeline', 'scroll()')) {
      // Set view-timeline on container via DOM API (bypasses React's stale CSS property list)
      el.style.setProperty('view-timeline-name', name);
      el.style.setProperty('view-timeline-axis', 'block');

      // Each word: tie to container timeline with its own staggered range
      el.querySelectorAll<HTMLSpanElement>('.tr-w').forEach((span, i) => {
        const ws = `${((i / total) * 68).toFixed(1)}%`;
        const we = `${Math.min(((i + 1) / total) * 68 + 12, 84).toFixed(1)}%`;
        span.style.setProperty('animation-timeline',   name);
        span.style.setProperty('animation-range-start', `entry ${ws}`);
        span.style.setProperty('animation-range-end',   `entry ${we}`);
      });

    } else {
      // JS fallback — Firefox and older browsers
      const spans = el.querySelectorAll<HTMLSpanElement>('.tr-w');
      spans.forEach(s => s.classList.add('tr-js'));

      const update = () => {
        const rect = el.getBoundingClientRect();
        const vh   = window.innerHeight;
        const prog = Math.max(0, Math.min(1, (vh * 0.85 - rect.top) / (vh * 0.60)));
        spans.forEach((s, i) => {
          const lit = prog >= i / total;
          s.style.color   = lit ? 'var(--text)' : '';
          s.style.opacity = lit ? '1' : '';
        });
      };

      window.addEventListener('scroll', update, { passive: true });
      update();
      return () => window.removeEventListener('scroll', update);
    }
  }, [name, total]);

  return (
    <Tag ref={ref} style={style} className={className}>
      {words.map((word, i) => (
        <span key={i} className="tr-w">
          {word}{i < total - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
