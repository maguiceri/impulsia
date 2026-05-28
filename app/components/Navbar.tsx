'use client';

import { useState } from 'react';
import Logo from './Logo';

const LINKS = [
  { href: '#servicios',        label: 'Servicios' },
  { href: '#como-trabajamos',  label: 'Cómo trabajamos' },
  { href: '#clientes',         label: 'Clientes' },
  { href: '#contacto',         label: 'Contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}>
        <nav style={{
          maxWidth: '1200px', margin: '0 auto', padding: '0 20px',
          height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <a href="#" style={{ textDecoration: 'none' }} onClick={() => setOpen(false)}>
            <Logo size="sm" />
          </a>

          {/* Desktop links */}
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

          {/* Hamburger — solo mobile */}
          <button
            className="hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label="Menú"
            style={{
              display: 'none',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '8px', margin: '-8px',
              flexDirection: 'column', gap: '5px', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: 'rgba(0,0,0,0.75)', borderRadius: '2px',
              transition: 'transform 0.25s, opacity 0.25s',
              transform: open ? 'translateY(7px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: 'rgba(0,0,0,0.75)', borderRadius: '2px',
              transition: 'opacity 0.25s',
              opacity: open ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: 'rgba(0,0,0,0.75)', borderRadius: '2px',
              transition: 'transform 0.25s, opacity 0.25s',
              transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }} />
          </button>
        </nav>

        {/* Mobile dropdown */}
        <div className="mobile-menu" style={{
          display: open ? 'flex' : 'none',
          flexDirection: 'column',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          background: 'rgba(255,255,255,0.97)',
          padding: '8px 20px 20px',
          gap: '4px',
        }}>
          {LINKS.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setOpen(false)} style={{
              textDecoration: 'none',
              fontSize: '1rem',
              fontFamily: 'var(--font-space-grotesk)',
              color: 'rgba(0,0,0,0.70)',
              padding: '12px 0',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}>
              {label}
            </a>
          ))}
          <a href="#contacto" onClick={() => setOpen(false)} style={{
            textDecoration: 'none',
            marginTop: '12px',
            padding: '13px',
            background: 'linear-gradient(135deg, rgb(99,102,241), rgb(147,51,234))',
            borderRadius: '10px',
            color: 'white',
            fontSize: '0.95rem',
            fontFamily: 'var(--font-space-grotesk)',
            fontWeight: '600',
            textAlign: 'center',
          }}>
            Hablemos →
          </a>
        </div>
      </header>
    </>
  );
}
