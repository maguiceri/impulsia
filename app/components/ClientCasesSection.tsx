'use client';

import { useEffect, useRef, useState } from 'react';

const CLIENTS = [
  {
    photo:     '/mar.jpeg',
    initials:  'GM',
    company:   'Dagos Studio',
    sector:    'Diseñadora gráfica y creadora de contenido',
    linkedin:  null,
    web:       'https://dagos-studio.com/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZnRzaASFLkVleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAaeBAzGVmkrS1M9wXqQA-yKR-Di78HT_5Db77qeZYkjCYohOuycrCTKoetO5bw_aem_Iguc0Ih-wB677Xae5OvHdA',
    instagram: null,
    need:      'Armaba cada presupuesto a mano, cada plan tenía extras opcionales. Tenía que esperar a que el cliente eligiera y recién ahí sumar todo a mano, una y otra vez.',
    solution:  'Un cotizador donde el cliente elige su plan y activa los extras que quiere. El total se calcula solo y cada presupuesto se guarda en su Excel, sin sumas ni cargas a mano.',
    saved:     '12 hs / sem',
    reduction: '−94% errores',
    quote:     'Dejé de perder horas presupuestando. Ahora el cliente lo arma solo y yo avanzo con lo mío.',
    author:    'Dagos Studio',
    accent:    'rgb(99,102,241)',
    video:     '/web-mar.mp4',
    preview:   'flow' as const,
  },
  {
    photo:     '/may.jpg',
    initials:  'EF',
    company:   'Dr. Mayra',
    sector:    'Nutricionista',
    linkedin:  null,
    web:       null,
    instagram: 'https://www.instagram.com/dra.gonzalez.mayra?igsh=YzJ0Z2h2eTE2bWhv',
    video:     '/web-nutri.mp4',
    need:      'Los datos de cada paciente estaban repartidos entre WhatsApp, papeles y varios Excel. Para ver la evolución de alguien tenía que juntar todo a mano, y entre consultas se perdía información.',
    solution:  'Un panel donde cada paciente tiene su ficha, su evolución de peso y medidas, sus turnos y las notas de cada consulta, todo en un solo lugar. Ve el progreso de cualquier paciente al instante.',
    saved:     '20 hs / sem',
    reduction: '100% automatizado',
    quote:     'Antes vivía juntando datos de mil lados. Ahora abro el panel y está todo.',
    author:    'Alejandra F. · Socia',
    accent:    'rgb(147,51,234)',
    preview:   'dashboard' as const,
  },
];

/* ── Mini previews del sistema ───────────────────────────────────── */
function FlowPreview({ accent }: { accent: string }) {
  const nodes = ['Rappi / PedidosYa', 'n8n', 'POS Central', 'Confirmado ✓'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
      {nodes.map((label, i) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            padding: '7px 11px',
            background: i === nodes.length - 1 ? `${accent}25` : 'rgba(255,255,255,0.05)',
            border: `1px solid ${i === nodes.length - 1 ? accent + '60' : 'rgba(255,255,255,0.10)'}`,
            borderRadius: '8px',
            fontSize: '0.7rem', fontFamily: 'var(--font-geist-mono)',
            color: i === nodes.length - 1 ? accent : 'rgba(255,255,255,0.65)',
            whiteSpace: 'nowrap',
          }}>
            {label}
          </div>
          {i < nodes.length - 1 && (
            <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: '0.7rem' }}>→</span>
          )}
        </div>
      ))}
    </div>
  );
}

function DashboardPreview({ accent }: { accent: string }) {
  const rows = ['Informe Enero', 'Informe Febrero', 'Informe Marzo', 'Informe Abril'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', width: '100%' }}>
      {rows.map((label, i) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-geist-mono)', color: 'rgba(255,255,255,0.45)', width: '110px', flexShrink: 0 }}>{label}</span>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${85 + i * 5}%`, background: `linear-gradient(90deg, ${accent}80, ${accent})`, borderRadius: '3px' }} />
          </div>
          <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-geist-mono)', color: accent }}>✓</span>
        </div>
      ))}
      <p style={{ margin: '4px 0 0', fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-geist-mono)' }}>
        generado automáticamente · último run: hace 3 min
      </p>
    </div>
  );
}


/* ── Componente principal ────────────────────────────────────────── */
function ClientCard({ client, visible }: { client: typeof CLIENTS[0]; visible: boolean }) {
  const { photo, initials, company, sector, linkedin, web, instagram, need, solution, saved, reduction, quote, author, accent, video, preview } = client;

  return (
    <div className="client-card" style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '20px',
      overflow: 'hidden',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: 'opacity 0.55s ease, transform 0.55s ease',
    }}>
      {/* Top accent */}
      <div style={{ height: '2px', background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      {/* Main content */}
      <div className="card-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>

        {/* Left — client info */}
        <div className="card-left" style={{ padding: '32px', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '100%', flexShrink: 0,
              background: photo ? 'transparent' : `rgba(${accent.slice(4,-1)},0.15)`,
              border: `1px solid rgba(${accent.slice(4,-1)},0.30)`,
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-space-grotesk)', fontWeight: '700', fontSize: '1rem', color: accent,
            }}>
              {photo
                ? <img src={photo} alt={company} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                : initials}
            </div>
            <div>
              <p style={{ margin: '0 0 2px', fontWeight: '700', fontSize: '0.78rem', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{company}</p>
              <p style={{ margin: '0 0 6px', fontSize: '0.75rem', color: 'var(--text2)', fontFamily: 'var(--font-space-grotesk)' }}>{sector}</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {web && (
                  <a href={web} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    fontSize: '0.68rem', color: accent, textDecoration: 'none',
                    fontFamily: 'var(--font-space-grotesk)', fontWeight: '500',
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    Web
                  </a>
                )}
                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    fontSize: '0.68rem', color: accent, textDecoration: 'none',
                    fontFamily: 'var(--font-space-grotesk)', fontWeight: '500',
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    Instagram
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    fontSize: '0.68rem', color: accent, textDecoration: 'none',
                    fontFamily: 'var(--font-space-grotesk)', fontWeight: '500',
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>

          <div>
            <p style={{ margin: '0 0 6px', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text2)', fontFamily: 'var(--font-space-grotesk)' }}>
              El problema
            </p>
            <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.65, color: 'rgba(0,0,0,0.65)', fontFamily: 'var(--font-space-grotesk)' }}>
              {need}
            </p>
          </div>

          <div>
            <p style={{ margin: '0 0 6px', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, fontFamily: 'var(--font-space-grotesk)' }}>
              La solución
            </p>
            <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.65, color: 'rgba(0,0,0,0.65)', fontFamily: 'var(--font-space-grotesk)' }}>
              {solution}
            </p>
          </div>
        </div>

        {/* Right — system preview */}
        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
          <p style={{ margin: '0 0 12px', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text2)', fontFamily: 'var(--font-space-grotesk)' }}>
            Lo que armamos
          </p>
          {video ? (
            <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
            </div>
          ) : (
            <div style={{
              background: '#0a0815',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
              overflow: 'hidden',
            }}>
              <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {['#ff5f56','#ffbd2e','#27c93f'].map(c => (
                  <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c, opacity: 0.7 }} />
                ))}
              </div>
              <div style={{ padding: '16px' }}>
                {preview === 'flow'      && <FlowPreview accent={accent} />}
                {preview === 'dashboard' && <DashboardPreview accent={accent} />}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom — metrics + quote */}
      <div className="card-bottom" style={{
        borderTop: '1px solid var(--border)',
        padding: '20px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
      }}>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: 0, fontSize: '1rem', fontWeight: '700', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '0.02em', background: `linear-gradient(135deg, ${accent}, rgb(217,70,239))`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {saved}
            </p>
            <p style={{ margin: 0, fontSize: '0.65rem', color: 'var(--text2)', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '0.06em' }}>ahorradas</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '1rem', fontWeight: '700', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '0.02em', background: `linear-gradient(135deg, ${accent}, rgb(217,70,239))`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {reduction}
            </p>
            <p style={{ margin: 0, fontSize: '0.65rem', color: 'var(--text2)', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '0.06em' }}>en errores</p>
          </div>
        </div>

        <div style={{ maxWidth: '420px' }}>
          <p style={{ margin: '0 0 4px', fontSize: '0.88rem', fontStyle: 'italic', color: 'rgba(0,0,0,0.65)', fontFamily: 'var(--font-space-grotesk)', lineHeight: 1.5 }}>
            "{quote}"
          </p>
          <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text2)', fontFamily: 'var(--font-space-grotesk)' }}>
            — {author}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ClientCasesSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-inner" style={{ padding: '88px 28px 100px', maxWidth: '1100px', margin: '0 auto', minHeight: '100vh' }}>
      <div style={{ marginBottom: '56px' }}>
        <p style={{ margin: '0 0 12px', fontSize: '0.65rem', letterSpacing: '0.14em', color: 'var(--text2)', textTransform: 'uppercase', fontFamily: 'var(--font-space-grotesk)' }}>
          Casos reales
        </p>
        <h2 style={{ margin: 0, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: '700', lineHeight: 1.2, letterSpacing: '-0.01em', fontFamily: 'var(--font-space-grotesk)' }}>
          Negocios que ya{' '}
          <span style={{ color: 'var(--text2)', fontWeight: '400' }}>trabajan en automático</span>
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {CLIENTS.map((client, i) => (
          <div key={client.company} style={{ transitionDelay: `${i * 0.15}s` }}>
            <ClientCard client={client} visible={visible} />
          </div>
        ))}
      </div>
    </section>
  );
}
