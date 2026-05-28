'use client';

import Logo from './Logo';

const LINKS = [
  { href: '#servicios',        label: 'Servicios' },
  { href: '#como-trabajamos',  label: 'Cómo trabajamos' },
  { href: '#clientes',         label: 'Clientes' },
];

export default function Navbar() {
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
    }}>
      <nav style={{
        maxWidth: '1200px', margin: '0 auto', padding: '0 20px',
        height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#" style={{ textDecoration: 'none' }}>
          <Logo size="sm" />
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {LINKS.map(({ href, label }) => (
              <a key={href} href={href} style={{
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-space-grotesk)',
                color: 'rgba(0,0,0,0.50)',
                transition: 'color 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(0,0,0,0.90)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,0,0,0.50)')}>
                {label}
              </a>
            ))}
          </div>

          <a href="#contacto" style={{
            textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '8px 18px',
            background: 'linear-gradient(135deg, rgb(99,102,241) 0%, rgb(147,51,234) 100%)',
            borderRadius: '8px',
            color: 'white',
            fontSize: '0.875rem',
            fontFamily: 'var(--font-space-grotesk)',
            fontWeight: '500',
            whiteSpace: 'nowrap',
          }}>
            Hablemos <span aria-hidden>→</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
