import HowWeWorkSection from './components/HowWeWorkSection';
import ClientCasesSection from './components/ClientCasesSection';
import FaqSection from './components/FaqSection';
import ServiceCard from './components/ServiceCard';
import FadeIn from './components/FadeIn';
import ContactSection from './components/ContactSection';
import TextReveal from './components/TextReveal';

const SERVICES_PREVIEW = [
  {
    icon: '🧭',
    title: 'Asesoría & Consultoría',
    desc:  'Detectamos qué conviene automatizar y trazamos el plan. Sin tecnicismos, con foco en resultados.',
    accent: 'rgb(65,110,235)',
  },
  {
    icon: '🤖',
    title: 'Automatización con IA',
    desc:  'Bots y flujos con n8n, Zapier y modelos de IA que trabajan mientras vos hacés otra cosa.',
    accent: 'rgb(15,195,228)',
  },
  {
    icon: '⚙️',
    title: 'Sistemas a medida',
    desc:  'Software hecho para tu proceso, no al revés. Cada detalle pensado para la forma en que trabajás.',
    accent: 'rgb(130,55,230)',
  },
  {
    icon: '🛡️',
    title: 'Soporte & Mantenimiento',
    desc:  'Acompañamiento continuo para que todo siga funcionando. Respondemos rápido cuando algo no anda.',
    accent: 'rgb(15,195,228)',
  },
];

export default function HeroPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-section" style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '80px 28px 100px',
        textAlign: 'center',
      }}>

        <div className="hero-impulsia-card" style={{
          maxWidth: '760px', width: '100%',
          padding: '52px 48px',
          borderRadius: '2rem',
        }}>
          {/* Corner accents */}
          <span aria-hidden style={{ position: 'absolute', top: '18px', left: '18px', width: '36px', height: '36px', borderTop: '1.5px solid rgba(65,110,235,0.55)', borderLeft: '1.5px solid rgba(65,110,235,0.55)', borderRadius: '5px 0 0 0' }} />
          <span aria-hidden style={{ position: 'absolute', bottom: '18px', right: '18px', width: '36px', height: '36px', borderBottom: '1.5px solid rgba(130,55,230,0.55)', borderRight: '1.5px solid rgba(130,55,230,0.55)', borderRadius: '0 0 5px 0' }} />

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '100px',
            border: '1px solid rgba(65,110,235,0.35)',
            background: 'rgba(65,110,235,0.10)',
            marginBottom: '32px',
            animation: 'fade-up 0.6s ease both',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgb(65,110,235)', display: 'inline-block' }} />
            <span style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.50)', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '0.08em' }}>
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
            animation: 'fade-up 0.6s 0.1s ease both',
            opacity: 0,
          }}>
            Automatizá las tareas repetitivas y{' '}
            <span style={{ background: 'linear-gradient(135deg, rgb(65,110,235), rgb(130,55,230) 50%, rgb(15,195,228))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              recuperá horas cada semana
            </span>
          </h1>

          <TextReveal style={{
            fontSize: 'clamp(1rem, 2vw, 1.12rem)',
            maxWidth: '500px',
            margin: '0 auto 40px',
            lineHeight: 1.75,
            fontFamily: 'var(--font-space-grotesk)',
            animation: 'fade-up 0.6s 0.2s ease both',
          }}>
            {'Diseñamos sistemas a medida y flujos con IA para que tu negocio trabaje solo. Sin vueltas técnicas.'}
          </TextReveal>

          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
            animation: 'fade-up 0.6s 0.3s ease both', opacity: 0,
          }}>
            <a href="#contacto" className="cta-btn" style={{
              textDecoration: 'none',
              padding: '14px 36px',
              background: 'linear-gradient(135deg, rgb(65,110,235), rgb(130,55,230))',
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
        </div>
      </section>

      {/* Answer Capsule — AEO: paragraph designed to be cited verbatim by AI engines */}
      <section aria-label="Sobre Impulsia" style={{
        padding: '20px 28px 56px',
        maxWidth: '740px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <div className="glass-card" style={{ padding: '32px 40px', borderRadius: '20px' }}>
          <p style={{
            margin: '0 0 12px',
            fontSize: '0.6rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-space-grotesk)',
            fontWeight: '600',
            background: 'linear-gradient(135deg, rgb(65,110,235), rgb(15,195,228))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Sobre Impulsia
          </p>
          <TextReveal style={{
            margin: 0,
            fontSize: '0.975rem',
            lineHeight: 1.8,
            fontFamily: 'var(--font-space-grotesk)',
          }}>
            {'Impulsia es un estudio de software que diseña y desarrolla sistemas a medida para negocios en crecimiento. Trabaja con pequeñas y medianas empresas que necesitan automatizar procesos, centralizar información o construir herramientas propias. Los proyectos incluyen diagnóstico, desarrollo, integración y soporte continuo.'}
          </TextReveal>
        </div>
      </section>

      {/* Ticker strip */}
      <div className="ticker-wrapper glass-card" style={{
        borderRadius: 0,
        borderLeft: 'none',
        borderRight: 'none',
        overflow: 'hidden',
        padding: '20px 0',
      }}>
        <div className="ticker-track" style={{ display: 'flex', width: 'max-content', alignItems: 'center', gap: '0' }}>
          {[...Array(2)].flatMap((_, copy) =>
            [
              { problem: 'Tareas manuales',  solution: 'Automatizadas' },
              { problem: 'Datos dispersos',  solution: 'Centralizados' },
              { problem: 'Procesos lentos',  solution: 'En piloto automático' },
              { problem: 'Errores humanos',  solution: 'Cero errores' },
              { problem: 'Tiempo perdido',   solution: 'Horas recuperadas' },
            ].map(({ problem, solution }, i) => (
              <span key={`${copy}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '0 48px', whiteSpace: 'nowrap' }}>
                <span style={{
                  fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase',
                  color: 'rgba(0,0,0,0.42)', fontFamily: 'var(--font-space-grotesk)', fontWeight: '500',
                  textDecoration: 'line-through', textDecorationColor: 'rgba(0,0,0,0.30)',
                }}>
                  {problem}
                </span>
                <span style={{ color: 'rgba(0,0,0,0.35)', fontSize: '0.85rem', fontWeight: '300' }}>→</span>
                <span style={{
                  fontSize: '0.88rem', fontWeight: '700', fontFamily: 'var(--font-space-grotesk)',
                  color: 'rgb(65,110,235)',
                  background: 'linear-gradient(135deg, rgb(65,110,235), rgb(130,55,230) 55%, rgb(15,195,228))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  {solution}
                </span>
                <span style={{ color: 'rgba(65,110,235,0.35)', fontSize: '0.55rem', paddingLeft: '20px' }}>✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Services */}
      <section id="servicios" style={{ scrollMarginTop: '64px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="section-inner" style={{ padding: '88px 28px 100px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <FadeIn>
          <div className="glass-card" style={{ marginBottom: '56px', padding: '32px 36px', borderRadius: '16px' }}>
            <p style={{ margin: '0 0 12px', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-space-grotesk)', fontWeight: '600', background: 'linear-gradient(135deg, rgb(65,110,235), rgb(15,195,228))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Qué hacemos
            </p>
            <h2 style={{ margin: 0, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: '700', lineHeight: 1.2, letterSpacing: '-0.01em', fontFamily: 'var(--font-space-grotesk)' }}>
              Todo lo que necesitás,{' '}
              <span style={{ color: 'var(--text2)', fontWeight: '400' }}>sin rodeos</span>
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {SERVICES_PREVIEW.map(({ icon, title, desc, accent }, i) => (
            <FadeIn key={title} delay={i * 120} scale>
              <ServiceCard icon={icon} title={title} desc={desc} accent={accent} index={i} />
            </FadeIn>
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

      <FaqSection />

      {/* CTA / Contacto */}
      <ContactSection />
    </>
  );
}
