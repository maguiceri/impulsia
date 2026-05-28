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
  const ref = useRef<HTMLElement>(null);
  const [active, setActive]     = useState(-1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          STEPS.forEach((_, i) => setTimeout(() => setActive(i), i * 550));
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const lineW = active < 0 ? 0 : Math.min(((active + 1) / (STEPS.length - 1)) * 100, 100);

  return (
    <section ref={ref} style={{
      padding: '88px 28px 100px', maxWidth: '1100px', margin: '0 auto',
      minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>

      <div style={{ marginBottom: '64px' }}>
        <p style={{ margin: '0 0 12px', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-space-grotesk)', fontWeight: '600', background: 'linear-gradient(135deg, rgb(99,102,241), rgb(217,70,239))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Cómo trabajamos
        </p>
        <h2 style={{ margin: 0, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: '700', lineHeight: 1.2, letterSpacing: '-0.01em', fontFamily: 'var(--font-space-grotesk)' }}>
          Un recorrido claro,{' '}
          <span style={{ color: 'var(--text2)', fontWeight: '400' }}>de principio a fin</span>
        </h2>
      </div>

      {/* ── Desktop: horizontal ── */}
      {!isMobile && (
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', top: '23px', left: '24px', right: '24px',
            height: '2px', background: 'rgba(0,0,0,0.10)', borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', width: `${lineW}%`,
              background: 'linear-gradient(90deg, rgb(99,102,241), rgb(130,60,245), rgb(217,70,239))',
              borderRadius: '2px',
              transition: 'width 0.52s cubic-bezier(0.4, 0, 0.2, 1)',
            }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
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
                  <div className="step-node" style={{
                    width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
                    background: on ? `linear-gradient(135deg, rgb(99,102,241) ${i * 30}%, ${accent})` : 'var(--surface2)',
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
                    <h3 style={{ margin: '0 0 8px', fontSize: '0.82rem', fontWeight: '700', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '0.02em', color: on ? 'var(--text)' : 'var(--text2)', transition: 'color 0.4s ease' }}>
                      {title}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.82rem', lineHeight: 1.6, color: on ? 'var(--text2)' : 'rgba(0,0,0,0.22)', fontFamily: 'var(--font-space-grotesk)', transition: 'color 0.4s ease' }}>
                      {desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Mobile: vertical ── */}
      {isMobile && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {STEPS.map(({ n, title, desc, accent }, i) => {
            const on      = active >= i;
            const lineOn  = active >= i;
            const isLast  = i === STEPS.length - 1;
            return (
              <div key={n} style={{ display: 'flex', gap: '16px' }}>

                {/* Circle + vertical line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: on ? `linear-gradient(135deg, rgb(99,102,241) ${i * 30}%, ${accent})` : 'var(--surface2)',
                    border: on ? 'none' : '1px solid rgba(0,0,0,0.10)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.68rem', fontFamily: 'var(--font-space-grotesk)', fontWeight: '700',
                    color: on ? 'white' : 'var(--text2)',
                    boxShadow: on ? `0 0 16px ${accent}40` : 'none',
                    flexShrink: 0,
                    transform: on ? 'scale(1)' : 'scale(0.75)',
                    opacity: on ? 1 : 0,
                    transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease, background 0.4s ease, box-shadow 0.4s ease',
                    zIndex: 1,
                  }}>
                    {n}
                  </div>

                  {!isLast && (
                    <div style={{ width: '2px', flex: 1, minHeight: '48px', background: 'rgba(0,0,0,0.08)', borderRadius: '2px', overflow: 'hidden', margin: '4px 0' }}>
                      <div style={{
                        width: '100%',
                        height: lineOn ? '100%' : '0%',
                        background: `linear-gradient(180deg, ${accent}, ${STEPS[i + 1].accent})`,
                        transition: 'height 0.52s cubic-bezier(0.4,0,0.2,1)',
                      }} />
                    </div>
                  )}
                </div>

                {/* Text */}
                <div style={{
                  paddingBottom: isLast ? '0' : '20px',
                  paddingTop: '10px',
                  opacity: on ? 1 : 0,
                  transform: on ? 'translateX(0)' : 'translateX(12px)',
                  transition: `opacity 0.45s ease ${i * 550 + 150}ms, transform 0.45s ease ${i * 550 + 150}ms`,
                }}>
                  <h3 style={{ margin: '0 0 4px', fontSize: '0.95rem', fontWeight: '700', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.01em', color: on ? 'var(--text)' : 'var(--text2)', transition: 'color 0.4s ease' }}>
                    {title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.84rem', lineHeight: 1.65, color: 'var(--text2)', fontFamily: 'var(--font-space-grotesk)' }}>
                    {desc}
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
}
