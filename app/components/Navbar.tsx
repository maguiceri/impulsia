'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';

const LINKS = [
  { href: '#servicios',        label: 'Servicios' },
  { href: '#como-trabajamos',  label: 'Cómo trabajamos' },
  { href: '#clientes',         label: 'Clientes' },
  { href: '#contacto',         label: 'Contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Wrapper — pointer-events none so transparent area doesn't block clicks */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        pointerEvents: 'none',
        display: 'flex', justifyContent: 'center',
        padding: '14px 24px',
      }}>
        {/* Pill */}
        <nav style={{
          pointerEvents: 'auto',
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '7px 8px 7px 22px',
          background: 'rgba(255,255,255,0.90)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${scrolled ? 'rgba(99,102,241,0.22)' : 'rgba(99,102,241,0.14)'}`,
          borderRadius: '9999px',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.10), 0 0 0 1px rgba(99,102,241,0.08)'
            : '0 2px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(99,102,241,0.05)',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          width: 'min(960px, calc(100vw - 48px))',
        }}>
          {/* Logo — nav-pill-logo gets flex:1 on mobile to push hamburger right and center logo */}
          <a href="#" onClick={() => setOpen(false)} className="nav-pill-logo" style={{ textDecoration: 'none', marginRight: '8px', flexShrink: 0 }}>
            <Logo size="sm" />
          </a>

          {/* Divider — hidden on mobile via nav-links hiding */}
          <div aria-hidden className="nav-links" style={{ width: '1px', height: '18px', background: 'rgba(0,0,0,0.10)', margin: '0 8px', flexShrink: 0, display: 'flex' }} />

          {/* Desktop links */}
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1, justifyContent: 'center' }}>
            {LINKS.map(({ href, label }) => (
              <a key={href} href={href} style={{
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-space-grotesk)',
                color: 'rgba(0,0,0,0.50)',
                padding: '7px 14px',
                borderRadius: '9999px',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s, background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(0,0,0,0.85)'; e.currentTarget.style.background = 'rgba(0,0,0,0.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(0,0,0,0.50)'; e.currentTarget.style.background = 'transparent'; }}>
                {label}
              </a>
            ))}
          </div>

          {/* CTA button */}
          <a href="#contacto" className="nav-links" style={{
            textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            padding: '8px 18px',
            background: 'linear-gradient(135deg, rgb(65,110,235) 0%, rgb(130,55,230) 100%)',
            borderRadius: '9999px',
            color: 'white',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-space-grotesk)',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            marginLeft: '4px',
          }}>
            Hablemos <span aria-hidden>→</span>
          </a>

          {/* Hamburger — solo mobile */}
          <button
            className="hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            style={{
              display: 'none',
              background: open ? 'rgba(99,102,241,0.08)' : 'none',
              border: 'none', cursor: 'pointer',
              padding: '8px 10px', borderRadius: '9999px',
              flexDirection: 'column', gap: '5px', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
          >
            <span style={{
              display: 'block', width: '20px', height: '1.5px',
              background: 'rgba(0,0,0,0.70)', borderRadius: '2px',
              transition: 'transform 0.25s, opacity 0.25s',
              transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block', width: '20px', height: '1.5px',
              background: 'rgba(0,0,0,0.70)', borderRadius: '2px',
              transition: 'opacity 0.25s',
              opacity: open ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: '20px', height: '1.5px',
              background: 'rgba(0,0,0,0.70)', borderRadius: '2px',
              transition: 'transform 0.25s, opacity 0.25s',
              transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            }} />
          </button>
        </nav>
      </div>

      {/* Mobile menu — glass card below pill */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 98, background: 'rgba(0,0,0,0.15)', backdropFilter: 'blur(2px)' }}
          />
          {/* Dropdown */}
          <div style={{
            position: 'fixed', top: '72px', left: '16px', right: '16px', zIndex: 99,
            background: 'rgba(255,255,255,0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(99,102,241,0.12)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
            padding: '12px',
            display: 'flex', flexDirection: 'column', gap: '4px',
          }}>
            {LINKS.map(({ href, label }) => (
              <a key={href} href={href} onClick={() => setOpen(false)} style={{
                textDecoration: 'none',
                fontSize: '1rem',
                fontFamily: 'var(--font-space-grotesk)',
                color: 'rgba(0,0,0,0.70)',
                padding: '12px 16px',
                borderRadius: '12px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                {label}
              </a>
            ))}
            <a href="#contacto" onClick={() => setOpen(false)} style={{
              textDecoration: 'none',
              marginTop: '4px',
              padding: '14px',
              background: 'linear-gradient(135deg, rgb(65,110,235), rgb(130,55,230))',
              borderRadius: '12px',
              color: 'white',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-space-grotesk)',
              fontWeight: '600',
              textAlign: 'center',
            }}>
              Hablemos →
            </a>
          </div>
        </>
      )}
    </>
  );
}
