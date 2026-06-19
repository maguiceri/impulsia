'use client';

import { useEffect, useState, useCallback } from 'react';
import FadeIn from './FadeIn';

const FAQS = [
  {
    q: '¿Qué tipo de sistemas desarrolla Impulsia?',
    a: 'Cotizadores interactivos, paneles de gestión, automatizaciones con n8n y Zapier, integraciones entre plataformas (delivery, POS, CRM), sistemas de seguimiento de clientes o pacientes, y flujos de trabajo con inteligencia artificial.',
  },
  {
    q: '¿Para qué tipo de negocios trabaja Impulsia?',
    a: 'Trabaja con pequeñas y medianas empresas, profesionales independientes y negocios en crecimiento: diseñadores, profesionales de la salud, comercios, servicios y cualquier negocio que necesite herramientas propias adaptadas a su proceso.',
  },
  {
    q: '¿Cómo es el proceso de trabajo?',
    a: 'El proceso tiene cuatro etapas: diagnóstico gratuito de 30 minutos, propuesta con presupuesto claro y sin letra chica, implementación con entregas parciales para que el cliente vea el avance, y soporte post-lanzamiento.',
  },
  {
    q: '¿Cuánto tarda un proyecto?',
    a: 'Depende del alcance. En el diagnóstico inicial se define el plazo concreto. Los proyectos se entregan por etapas para que el cliente vea resultados desde las primeras semanas.',
  },
  {
    q: '¿Necesito saber programación para usar los sistemas?',
    a: 'No. Los sistemas se diseñan para que cualquier persona del equipo los use sin conocimientos técnicos, con foco en la facilidad de uso desde el primer día.',
  },
  {
    q: '¿Cómo puedo contactar a Impulsia?',
    a: 'A través del formulario en este sitio o por Instagram: @impulsia.studio.',
  },
];

const N = FAQS.length;
const INTERVAL = 4200;

function mod(n: number, m: number) { return ((n % m) + m) % m; }

export default function FaqSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive(a => mod(a + 1, N)), []);

  const go = useCallback((i: number) => {
    setActive(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 7000);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  const prev = mod(active - 1, N);
  const nextIdx = mod(active + 1, N);

  return (
    <section
      id="faq"
      style={{
        scrollMarginTop: '64px',
        padding: '88px 28px 100px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      <FadeIn>
        <div className="glass-card" style={{ marginBottom: '64px', padding: '32px 36px', borderRadius: '16px' }}>
          <p style={{
            margin: '0 0 12px',
            fontSize: '0.65rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-space-grotesk)',
            fontWeight: '600',
            background: 'linear-gradient(135deg, rgb(65,110,235), rgb(15,195,228))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Preguntas frecuentes
          </p>
          <h2 style={{
            margin: 0,
            fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
            fontWeight: '700',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            fontFamily: 'var(--font-space-grotesk)',
          }}>
            Lo que suelen preguntar,{' '}
            <span style={{ color: 'var(--text2)', fontWeight: '400' }}>respondido directo</span>
          </h2>
        </div>
      </FadeIn>

      {/* Carousel — 3 visible: prev · active · next */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.7fr 1fr',
          gap: '16px',
          alignItems: 'start',
        }}>
          {/* Prev */}
          <div
            onClick={() => go(prev)}
            className="glass-card"
            style={{
              padding: '24px 26px',
              borderRadius: '16px',
              cursor: 'pointer',
              opacity: 0.55,
              transform: 'scale(0.96) translateX(12px)',
              transition: 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <p style={{
              margin: '0 0 8px',
              fontSize: '0.62rem',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'var(--text2)',
              fontFamily: 'var(--font-space-grotesk)',
            }}>
              ← anterior
            </p>
            <h3 style={{
              margin: 0,
              fontSize: '0.82rem',
              fontWeight: '600',
              fontFamily: 'var(--font-space-grotesk)',
              lineHeight: 1.35,
              color: 'var(--text2)',
            }}>
              {FAQS[prev].q}
            </h3>
          </div>

          {/* Active */}
          <div
            className="glass-card"
            style={{
              padding: '36px 40px',
              borderRadius: '20px',
              border: '1px solid rgba(65,110,235,0.28)',
              boxShadow: '0 4px 0 rgba(65,110,235,0.10), 0 24px 64px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.95)',
              transform: 'scale(1)',
              transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <h3 style={{
              margin: '0 0 16px',
              fontSize: '1rem',
              fontWeight: '700',
              fontFamily: 'var(--font-space-grotesk)',
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
            }}>
              {FAQS[active].q}
            </h3>
            <p style={{
              margin: 0,
              fontSize: '0.9rem',
              color: 'var(--text2)',
              lineHeight: 1.75,
              fontFamily: 'var(--font-space-grotesk)',
            }}>
              {FAQS[active].a}
            </p>
          </div>

          {/* Next */}
          <div
            onClick={() => go(nextIdx)}
            className="glass-card"
            style={{
              padding: '24px 26px',
              borderRadius: '16px',
              cursor: 'pointer',
              opacity: 0.55,
              transform: 'scale(0.96) translateX(-12px)',
              transition: 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <p style={{
              margin: '0 0 8px',
              fontSize: '0.62rem',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'var(--text2)',
              fontFamily: 'var(--font-space-grotesk)',
            }}>
              siguiente →
            </p>
            <h3 style={{
              margin: 0,
              fontSize: '0.82rem',
              fontWeight: '600',
              fontFamily: 'var(--font-space-grotesk)',
              lineHeight: 1.35,
              color: 'var(--text2)',
            }}>
              {FAQS[nextIdx].q}
            </h3>
          </div>
        </div>

        {/* Dots */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '32px',
        }}>
          {FAQS.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Pregunta ${i + 1}`}
              style={{
                width: i === active ? '28px' : '7px',
                height: '7px',
                borderRadius: '9999px',
                background: i === active
                  ? 'linear-gradient(90deg, rgb(65,110,235), rgb(130,55,230))'
                  : 'rgba(0,0,0,0.15)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.35s cubic-bezier(0.22,1,0.36,1), background 0.3s',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
