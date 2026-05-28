import HowWeWorkSection from './components/HowWeWorkSection';
import ClientCasesSection from './components/ClientCasesSection';

const SERVICES_PREVIEW = [
  {
    icon: '🧭',
    title: 'Asesoría & Consultoría',
    desc:  'Detectamos qué conviene automatizar y trazamos el plan. Sin tecnicismos, con foco en resultados.',
    accent: 'rgb(99,102,241)',
  },
  {
    icon: '🤖',
    title: 'Automatización con IA',
    desc:  'Bots y flujos con n8n, Zapier y modelos de IA que trabajan mientras vos hacés otra cosa.',
    accent: 'rgb(130,60,245)',
  },
  {
    icon: '⚙️',
    title: 'Sistemas a medida',
    desc:  'Software hecho para tu proceso, no al revés. Cada detalle pensado para la forma en que trabajás.',
    accent: 'rgb(147,51,234)',
  },
  {
    icon: '🛡️',
    title: 'Soporte & Mantenimiento',
    desc:  'Acompañamiento continuo para que todo siga funcionando. Respondemos rápido cuando algo no anda.',
    accent: 'rgb(217,70,239)',
  },
];

export default function HeroPage() {
  return (
    <>
      {/* Hero */}
      <section style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '80px 28px 100px',
        textAlign: 'center',
      }}>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 16px', borderRadius: '100px',
          border: '1px solid rgba(99,102,241,0.35)',
          background: 'rgba(99,102,241,0.07)',
          marginBottom: '32px',
          animation: 'fade-up 0.6s ease both',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgb(99,102,241)', display: 'inline-block' }} />
          <span style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.55)', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '0.08em' }}>
            Automatización · IA · Sistemas
          </span>
        </div>

        <h1 style={{
          margin: '0 0 24px',
          fontSize: 'clamp(2rem, 5vw, 3.6rem)',
          fontWeight: '700',
          fontFamily: 'var(--font-space-grotesk)',
          lineHeight: 1.15,
          letterSpacing: '-0.01em',
          maxWidth: '860px',
          animation: 'fade-up 0.6s 0.1s ease both',
          opacity: 0,
        }}>
          Automatizá las tareas repetitivas y{' '}
          <span style={{ background: 'linear-gradient(135deg, rgb(99,102,241), rgb(147,51,234) 50%, rgb(217,70,239))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            recuperá horas cada semana
          </span>
        </h1>

        <p style={{
          margin: '0 0 40px',
          fontSize: 'clamp(1rem, 2vw, 1.12rem)',
          color: 'var(--text2)',
          maxWidth: '500px',
          lineHeight: 1.75,
          fontFamily: 'var(--font-space-grotesk)',
          animation: 'fade-up 0.6s 0.2s ease both',
          opacity: 0,
        }}>
          Diseñamos sistemas a medida y flujos con IA para que tu negocio trabaje solo.
          Sin vueltas técnicas.
        </p>

        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
          animation: 'fade-up 0.6s 0.3s ease both', opacity: 0,
        }}>
          <a href="#contacto" style={{
            textDecoration: 'none',
            padding: '14px 36px',
            background: 'linear-gradient(135deg, rgb(99,102,241), rgb(147,51,234))',
            borderRadius: '10px',
            color: 'white',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-space-grotesk)',
            fontWeight: '700',
            letterSpacing: '0.06em',
          }}>
            Diagnóstico gratuito
          </a>
          <span style={{ fontSize: '0.78rem', color: 'rgba(0,0,0,0.38)', fontFamily: 'var(--font-space-grotesk)' }}>
            30 min · sin compromiso
          </span>
        </div>
      </section>

      {/* Transformation strip */}
      <div style={{
        borderTop:    '1px solid rgba(0,0,0,0.08)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        }}>
          {([
            { problem: 'Tareas manuales',  solution: 'Automatizadas' },
            { problem: 'Datos dispersos',  solution: 'Centralizados' },
            { problem: 'Procesos lentos',  solution: 'En piloto automático' },
          ] as const).map(({ problem, solution }, i) => (
            <div key={problem} style={{
              padding: '28px 32px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
              borderRight: i < 2 ? '1px solid rgba(0,0,0,0.08)' : 'none',
              textAlign: 'center',
            }}>
              <span style={{
                fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.30)', fontFamily: 'var(--font-space-grotesk)',
                textDecoration: 'line-through', textDecorationColor: 'rgba(0,0,0,0.18)',
              }}>
                {problem}
              </span>
              <span style={{ color: 'rgba(0,0,0,0.22)', fontSize: '0.7rem', lineHeight: 1 }}>↓</span>
              <span style={{
                fontSize: '0.82rem', fontWeight: '700', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.01em',
                background: 'linear-gradient(135deg, rgb(99,102,241), rgb(147,51,234) 55%, rgb(217,70,239))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                {solution}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <section id="servicios" style={{ scrollMarginTop: '64px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ padding: '88px 28px 100px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '56px' }}>
          <p style={{ margin: '0 0 12px', fontSize: '0.65rem', letterSpacing: '0.14em', color: 'var(--text2)', textTransform: 'uppercase', fontFamily: 'var(--font-space-grotesk)' }}>
            Qué hacemos
          </p>
          <h2 style={{ margin: 0, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: '700', lineHeight: 1.2, letterSpacing: '-0.01em', fontFamily: 'var(--font-space-grotesk)' }}>
            Todo lo que necesitás,{' '}
            <span style={{ color: 'var(--text2)', fontWeight: '400' }}>sin rodeos</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {SERVICES_PREVIEW.map(({ icon, title, desc, accent }) => (
            <div key={title} style={{
              padding: '32px 28px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              display: 'flex', flexDirection: 'column', gap: '16px',
              position: 'relative', overflow: 'hidden',
            }}>
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
              }}>
                {icon}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '0.85rem', fontWeight: '700', fontFamily: 'var(--font-space-grotesk)', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                  {title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text2)', lineHeight: 1.65, fontFamily: 'var(--font-space-grotesk)' }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </section>

      <div id="como-trabajamos" style={{ scrollMarginTop: '64px' }}>
        <HowWeWorkSection />
      </div>

      <div id="clientes" style={{ scrollMarginTop: '64px' }}>
        <ClientCasesSection />
      </div>

      {/* CTA / Contacto */}
      <section id="contacto" style={{
        scrollMarginTop: '64px',
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          padding: '56px 48px',
          background: '#ffffff',
          border: '1px solid rgba(0,0,0,0.09)',
          borderRadius: '20px',
          maxWidth: '600px',
          width: '100%',
          margin: '0 28px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center',
        }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(1.3rem, 3vw, 1.9rem)', fontWeight: '700', letterSpacing: '-0.01em', fontFamily: 'var(--font-space-grotesk)' }}>
            ¿Listo para automatizar?
          </h2>
          <p style={{ margin: 0, color: 'var(--text2)', fontSize: '1rem', fontFamily: 'var(--font-space-grotesk)', maxWidth: '420px', lineHeight: 1.6 }}>
            Contanos tu proceso y te decimos cómo podemos hacerlo más eficiente.
          </p>
          <a href="mailto:hola@impulsia.ar" style={{
            textDecoration: 'none',
            padding: '13px 30px',
            background: 'linear-gradient(135deg, rgb(99,102,241), rgb(147,51,234))',
            borderRadius: '10px',
            color: 'white', fontSize: '0.95rem',
            fontFamily: 'var(--font-space-grotesk)', fontWeight: '600',
          }}>
            Agendar llamada gratuita →
          </a>
        </div>
      </section>
    </>
  );
}
