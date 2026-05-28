'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px',
    background: '#ffffff',
    border: '1px solid rgba(0,0,0,0.12)',
    borderRadius: '10px',
    fontSize: '0.92rem',
    fontFamily: 'var(--font-space-grotesk)',
    color: 'var(--text)',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  return (
    <section id="contacto" style={{
      scrollMarginTop: '64px',
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 20px',
    }}>
      <div className="contact-grid" style={{
        width: '100%', maxWidth: '960px',
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.09)',
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
      }}>

        {/* Left — copy */}
        <div className="contact-left" style={{
          padding: '56px 48px',
          background: 'linear-gradient(145deg, rgba(99,102,241,0.06) 0%, rgba(217,70,239,0.05) 100%)',
          borderRight: '1px solid rgba(0,0,0,0.08)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px',
        }}>
          <div>
            <p style={{ margin: '0 0 12px', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-space-grotesk)', fontWeight: '600', background: 'linear-gradient(135deg, rgb(99,102,241), rgb(217,70,239))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Contacto
            </p>
            <h2 style={{ margin: 0, fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontWeight: '700', lineHeight: 1.15, letterSpacing: '-0.02em', fontFamily: 'var(--font-space-grotesk)' }}>
              Impulsemos{' '}
              <span style={{ background: 'linear-gradient(135deg, rgb(99,102,241), rgb(147,51,234) 50%, rgb(217,70,239))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                tu negocio
              </span>
            </h2>
          </div>

          <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text2)', fontFamily: 'var(--font-space-grotesk)' }}>
            Contanos qué proceso querés automatizar. En 30 minutos te decimos si tiene solución y qué camino seguir.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { icon: '⚡', text: 'Respuesta en menos de 24 hs' },
              { icon: '🎯', text: 'Diagnóstico gratuito sin compromiso' },
              { icon: '🔒', text: 'Tu información es confidencial' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1rem' }}>{icon}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text2)', fontFamily: 'var(--font-space-grotesk)' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="contact-right" style={{ padding: '56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '2.5rem' }}>✅</div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700', fontFamily: 'var(--font-space-grotesk)' }}>¡Mensaje enviado!</h3>
              <p style={{ margin: 0, color: 'var(--text2)', fontSize: '0.9rem', fontFamily: 'var(--font-space-grotesk)' }}>Te contactamos en menos de 24 hs.</p>
              <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }); }} style={{
                marginTop: '8px', padding: '8px 20px', background: 'none',
                border: '1px solid rgba(0,0,0,0.12)', borderRadius: '8px',
                fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'var(--font-space-grotesk)',
                color: 'var(--text2)',
              }}>
                Enviar otro
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--text)', fontFamily: 'var(--font-space-grotesk)' }}>Nombre</label>
                <input
                  type="text" required placeholder="Tu nombre"
                  value={form.name} onChange={set('name')}
                  style={inputStyle}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgb(99,102,241)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--text)', fontFamily: 'var(--font-space-grotesk)' }}>Email</label>
                <input
                  type="email" required placeholder="tu@email.com"
                  value={form.email} onChange={set('email')}
                  style={inputStyle}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgb(99,102,241)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--text)', fontFamily: 'var(--font-space-grotesk)' }}>Mensaje</label>
                <textarea
                  required placeholder="Contanos qué proceso querés automatizar..."
                  rows={4} value={form.message} onChange={set('message')}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgb(99,102,241)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'}
                />
              </div>

              {status === 'error' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'rgb(220,38,38)', fontFamily: 'var(--font-space-grotesk)' }}>
                    Hubo un error al enviar. Intentá de nuevo o contactanos directo:
                  </p>
                  <a
                    href="https://www.instagram.com/impulsia.studio?igsh=bmtpM2xibzQ1dDQ0"
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '7px',
                      padding: '8px 14px',
                      background: 'linear-gradient(135deg, #f09433, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888)',
                      borderRadius: '8px',
                      color: 'white', textDecoration: 'none',
                      fontSize: '0.82rem', fontFamily: 'var(--font-space-grotesk)', fontWeight: '600',
                      alignSelf: 'flex-start',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                    @impulsia.studio
                  </a>
                </div>
              )}

              <button type="submit" disabled={status === 'loading'} className="cta-btn" style={{
                padding: '13px',
                background: status === 'loading'
                  ? 'rgba(99,102,241,0.5)'
                  : 'linear-gradient(135deg, rgb(99,102,241), rgb(147,51,234))',
                border: 'none', borderRadius: '10px',
                color: 'white', fontSize: '0.92rem',
                fontFamily: 'var(--font-space-grotesk)', fontWeight: '600',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              }}>
                {status === 'loading' ? 'Enviando...' : 'Enviar mensaje →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
