'use client';

import { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    n: '01',
    title: 'Diagnóstico',
    desc: 'Entendemos tu proceso y detectamos dónde está el mayor desperdicio de tiempo.',
    accent: 'rgb(99,102,241)',
  },
  {
    n: '02',
    title: 'Presupuesto',
    desc: 'Propuesta clara: qué hacemos, en cuánto tiempo y a qué costo. Sin letra chica.',
    accent: 'rgb(130,60,245)',
  },
  {
    n: '03',
    title: 'Implementación',
    desc: 'Construimos e integramos con entregas parciales para que veas el avance.',
    accent: 'rgb(147,51,234)',
  },
  {
    n: '04',
    title: 'Soporte',
    desc: 'Monitoreamos, ajustamos y acompañamos para que todo siga funcionando.',
    accent: 'rgb(217,70,239)',
  },
];

export default function HowWeWorkSection() {
  const ref  = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          STEPS.forEach((_, i) => {
            setTimeout(() => setActive(i), i * 550);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const lineW = active <= 0 ? 0 : (active / (STEPS.length - 1)) * 100;

  return (
    <section ref={ref} className="section-inner" style={{ padding: '88px 28px 100px', maxWidth: '1100px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

      <div style={{ marginBottom: '64px' }}>
        <p style={{ margin: '0 0 12px', fontSize: '0.65rem', letterSpacing: '0.14em', color: 'var(--text2)', textTransform: 'uppercase', fontFamily: 'var(--font-space-grotesk)' }}>
          Cómo trabajamos
        </p>
        <h2 style={{ margin: 0, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: '700', lineHeight: 1.2, letterSpacing: '-0.01em', fontFamily: 'var(--font-space-grotesk)' }}>
          Un recorrido claro,{' '}
          <span style={{ color: 'var(--text2)', fontWeight: '400' }}>de principio a fin</span>
        </h2>
      </div>

      <div style={{ position: 'relative' }}>

        <div className="timeline-aux" style={{
          position: 'absolute',
          top: '23px', left: '24px', right: '24px',
          height: '2px',
          background: 'rgba(0,0,0,0.10)',
          borderRadius: '2px',
        }} />

        <div className="timeline-aux" style={{
          position: 'absolute',
          top: '23px', left: '24px',
          height: '2px',
          width: `calc(${lineW}% * (100% - 48px) / 100)`,
          maxWidth: 'calc(100% - 48px)',
          background: 'linear-gradient(90deg, rgb(99,102,241), rgb(130,60,245), rgb(217,70,239))',
          borderRadius: '2px',
          transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }} />

        <div className="timeline-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}>
          {STEPS.map(({ n, title, desc, accent }, i) => {
            const on = active >= i;
            return (
              <div key={n} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
                padding: '0 12px',
                opacity: on ? 1 : 0,
                transform: on ? 'translateY(0)' : 'translateY(18px)',
                transition: 'opacity 0.45s ease, transform 0.45s ease',
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  flexShrink: 0,
                  background: on
                    ? `linear-gradient(135deg, rgb(99,102,241) ${i * 30}%, ${accent})`
                    : 'var(--surface2)',
                  border: on ? 'none' : '1px solid rgba(0,0,0,0.10)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', fontFamily: 'var(--font-space-grotesk)', fontWeight: '700',
                  color: on ? 'white' : 'var(--text2)',
                  boxShadow: on ? `0 0 20px ${accent}40` : 'none',
                  transition: 'background 0.4s ease, box-shadow 0.4s ease',
                  position: 'relative', zIndex: 1,
                }}>
                  {n}
                </div>

                <div style={{ textAlign: 'center' }}>
                  <h3 style={{
                    margin: '0 0 8px',
                    fontSize: '0.82rem', fontWeight: '700',
                    fontFamily: 'var(--font-space-grotesk)',
                    letterSpacing: '0.02em',
                    color: on ? 'var(--text)' : 'var(--text2)',
                    transition: 'color 0.4s ease',
                  }}>
                    {title}
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '0.82rem', lineHeight: 1.6,
                    color: on ? 'var(--text2)' : 'rgba(0,0,0,0.22)',
                    fontFamily: 'var(--font-space-grotesk)',
                    transition: 'color 0.4s ease',
                  }}>
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
