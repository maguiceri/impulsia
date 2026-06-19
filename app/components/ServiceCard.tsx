'use client';

import { useRef } from 'react';

interface Props {
  icon: string;
  title: string;
  desc: string;
  accent: string;
  index?: number;
}

export default function ServiceCard({ icon, title, desc, accent, index = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    el.style.transform   = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(10px)`;
    el.style.boxShadow   = `${-x * 14}px ${-y * 14}px 40px rgba(65,110,235,0.11), 0 20px 48px rgba(0,0,0,0.06)`;
    el.style.borderColor = `rgba(65,110,235,0.22)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform   = '';
    el.style.boxShadow   = '';
    el.style.borderColor = 'rgba(65,110,235,0.16)';
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="card-tile card-tile-shine"
      style={{
        padding: '32px 28px',
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(65,110,235,0.16)',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'relative',
        height: '100%',
        willChange: 'transform',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        cursor: 'default',
      }}
    >
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, ${accent}, transparent)`,
      }} />

      <div style={{
        width: '44px', height: '44px', borderRadius: '12px',
        background: `${accent}18`,
        border: `1px solid ${accent}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.3rem',
        flexShrink: 0,
      }}>
        {icon}
      </div>

      <div
        className="float-content"
        style={{ display: 'flex', flexDirection: 'column', gap: '8px', animationDelay: `${index * 0.55}s` }}
      >
        <h3 style={{
          margin: 0, fontSize: '0.85rem', fontWeight: '700',
          fontFamily: 'var(--font-space-grotesk)', lineHeight: 1.3, letterSpacing: '-0.01em',
          color: 'var(--text)',
        }}>
          {title}
        </h3>
        <p style={{
          margin: 0, fontSize: '0.875rem', color: 'var(--text2)',
          lineHeight: 1.65, fontFamily: 'var(--font-space-grotesk)',
        }}>
          {desc}
        </p>
      </div>
    </div>
  );
}
