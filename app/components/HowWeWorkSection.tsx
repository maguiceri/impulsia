'use client';

import { useEffect, useRef, useState } from 'react';
import FadeIn from './FadeIn';

const STEPS = [
  {
    n: '01',
    title: 'Diagnóstico',
    desc: 'Entendemos tu proceso y detectamos dónde está el mayor desperdicio de tiempo.',
    accent: 'rgb(65,110,235)',
  },
  {
    n: '02',
    title: 'Presupuesto',
    desc: 'Propuesta clara: qué hacemos, en cuánto tiempo y a qué costo. Sin letra chica.',
    accent: 'rgb(15,195,228)',
  },
  {
    n: '03',
    title: 'Implementación',
    desc: 'Construimos e integramos con entregas parciales para que veas el avance.',
    accent: 'rgb(130,55,230)',
  },
  {
    n: '04',
    title: 'Soporte',
    desc: 'Monitoreamos, ajustamos y acompañamos para que todo siga funcionando.',
    accent: 'rgb(15,195,228)',
  },
];

export default function HowWeWorkSection() {
  const ref      = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const [active, setActive]     = useState(-1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (active >= 0) return; // ya disparó en un layout previo
    const el = stepsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          STEPS.forEach((_, i) => setTimeout(() => setActive(i), i * 260));
          obs.disconnect();
        }
      },
      { threshold: 0.20, rootMargin: '0px 0px -60px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isMobile, active]); // re-corre cuando cambia el layout (desktop ↔ mobile)

  const lineW = active < 0 ? 0 : Math.min(((active + 1) / (STEPS.length - 1)) * 100, 100);

  return (
    <section ref={ref} style={{
      padding: '88px 28px 100px', maxWidth: '1100px', margin: '0 auto',
      minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>

      <FadeIn style={{ height: 'auto', marginBottom: '64px' }}>
        <div className="glass-card" style={{ padding: '32px 36px', borderRadius: '16px' }}>
          <p style={{ margin: '0 0 12px', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-space-grotesk)', fontWeight: '600', background: 'linear-gradient(135deg, rgb(65,110,235), rgb(15,195,228))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Cómo trabajamos
          </p>
          <h2 style={{ margin: 0, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: '700', lineHeight: 1.2, letterSpacing: '-0.01em', fontFamily: 'var(--font-space-grotesk)' }}>
            Un recorrido claro,{' '}
            <span style={{ color: 'var(--text2)', fontWeight: '400' }}>de principio a fin</span>
          </h2>
        </div>
      </FadeIn>

      {/* ── Desktop: horizontal ── */}
      {!isMobile && (
        <div ref={stepsRef} style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', top: '23px', left: '24px', right: '24px',
            height: '2px', background: 'rgba(65,110,235,0.12)', borderRadius: '2px',
            overflow: 'hidden',
            opacity: active < 0 ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}>
            <div style={{
              height: '100%', width: `${lineW}%`,
              background: 'linear-gradient(90deg, rgb(65,110,235), rgb(15,195,228) 50%, rgb(130,55,230))',
              borderRadius: '2px',
              transition: 'width 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 0 8px rgba(65,110,235,0.35)',
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
                  transform: on ? 'translateY(0) scale(1)' : 'translateY(56px) scale(0.84)',
                  transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 80}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 80}ms`,
                  willChange: 'transform, opacity',
                }}>
                  <div className="step-node" style={{
                    width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
                    background: on ? `linear-gradient(135deg, rgb(65,110,235) ${i * 30}%, ${accent})` : 'var(--surface2)',
                    border: on ? 'none' : '1px solid rgba(65,110,235,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontFamily: 'var(--font-space-grotesk)', fontWeight: '700',
                    color: on ? 'white' : 'var(--text2)',
                    boxShadow: on ? `0 0 20px ${accent}40` : 'none',
                    transition: 'background 0.4s ease, box-shadow 0.4s ease',
                    position: 'relative', zIndex: 1,
                  }}>
                    {n}
                  </div>
                  <div className="glass-card" style={{ textAlign: 'center', padding: '16px 18px', borderRadius: '12px', width: '100%' }}>
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
        <div ref={stepsRef} style={{ display: 'flex', flexDirection: 'column' }}>
          {STEPS.map(({ n, title, desc, accent }, i) => {
            const on     = active >= i;
            const isLast = i === STEPS.length - 1;
            return (
              <div key={n} style={{ display: 'flex', gap: '16px' }}>

                {/* Circle + vertical line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: on ? `linear-gradient(135deg, rgb(65,110,235) ${i * 30}%, ${accent})` : 'var(--surface2)',
                    border: on ? 'none' : '1px solid rgba(65,110,235,0.15)',
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
                    <div style={{ width: '2px', flex: 1, minHeight: '48px', background: 'rgba(65,110,235,0.10)', borderRadius: '2px', overflow: 'hidden', margin: '4px 0' }}>
                      <div style={{
                        width: '100%',
                        height: on ? '100%' : '0%',
                        background: `linear-gradient(180deg, ${accent}, ${STEPS[i + 1].accent})`,
                        transition: 'height 0.52s cubic-bezier(0.4,0,0.2,1)',
                      }} />
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="glass-card" style={{
                  flex: 1, padding: '14px 18px', borderRadius: '12px',
                  marginBottom: isLast ? '0' : '8px', marginTop: '2px',
                  opacity: on ? 1 : 0,
                  transform: on ? 'translateX(0)' : 'translateX(12px)',
                  transition: `opacity 0.3s ease ${i * 320 + 100}ms, transform 0.3s ease ${i * 320 + 100}ms`,
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
