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

export default function FaqSection() {
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
        <div style={{ marginBottom: '56px' }}>
          <p style={{
            margin: '0 0 12px',
            fontSize: '0.65rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-space-grotesk)',
            fontWeight: '600',
            background: 'linear-gradient(135deg, rgb(99,102,241), rgb(217,70,239))',
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

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
        gap: '2px',
      }}>
        {FAQS.map(({ q, a }, i) => (
          <FadeIn key={q} delay={i * 60}>
            <div style={{
              padding: '28px 32px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '0.9rem',
                fontWeight: '700',
                fontFamily: 'var(--font-space-grotesk)',
                lineHeight: 1.35,
                letterSpacing: '-0.01em',
              }}>
                {q}
              </h3>
              <p style={{
                margin: 0,
                fontSize: '0.875rem',
                color: 'var(--text2)',
                lineHeight: 1.7,
                fontFamily: 'var(--font-space-grotesk)',
              }}>
                {a}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
