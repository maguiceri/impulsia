import Logo from './Logo';

const LINKS = [
  { href: '#servicios',        label: 'Servicios' },
  { href: '#como-trabajamos',  label: 'Cómo trabajamos' },
  { href: '#clientes',         label: 'Clientes' },
  { href: '#contacto',         label: 'Contacto' },
];

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(0,0,0,0.08)',
      background: 'var(--bg)',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '48px 28px 40px',
        display: 'flex', flexDirection: 'column', gap: '32px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Logo size="sm" />
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(0,0,0,0.40)', fontFamily: 'var(--font-space-grotesk)', maxWidth: '260px', lineHeight: 1.6 }}>
              Automatizamos lo que frena tu negocio.
            </p>
          </div>
          <nav style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', alignItems: 'center' }}>
            {LINKS.map(({ href, label }) => (
              <a key={href} href={href} style={{
                textDecoration: 'none',
                fontSize: '0.85rem',
                color: 'rgba(0,0,0,0.45)',
                fontFamily: 'var(--font-space-grotesk)',
              }}>
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(0,0,0,0.35)', fontFamily: 'var(--font-space-grotesk)' }}>
            © {new Date().getFullYear()} Impulsia. Todos los derechos reservados.
          </p>
          <a href="mailto:hola@impulsia.ar" style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.45)', textDecoration: 'none', fontFamily: 'var(--font-space-grotesk)' }}>
            hola@impulsia.ar
          </a>
        </div>
      </div>
    </footer>
  );
}
