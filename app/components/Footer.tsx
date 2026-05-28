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
      position: 'relative', zIndex: 1,
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '28px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '20px',
      }}>

        {/* Logo + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <Logo size="sm" />
          <p style={{ margin: 0, fontSize: '0.65rem', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <span style={{ color: 'rgb(65,110,235)' }}>Automatización</span>
            <span style={{ color: 'rgba(0,0,0,0.25)', margin: '0 6px' }}>·</span>
            <span style={{ color: 'rgb(15,195,228)' }}>IA</span>
            <span style={{ color: 'rgba(0,0,0,0.25)', margin: '0 6px' }}>·</span>
            <span style={{ color: 'rgb(130,55,230)' }}>Sistemas escalables</span>
          </p>
        </div>

        {/* Nav links */}
        <nav style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          {LINKS.map(({ href, label }) => (
            <a key={href} href={href} style={{
              textDecoration: 'none',
              fontSize: '0.82rem',
              color: 'rgba(0,0,0,0.45)',
              fontFamily: 'var(--font-space-grotesk)',
            }}>
              {label}
            </a>
          ))}
        </nav>

        {/* Copyright + email */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(0,0,0,0.30)', fontFamily: 'var(--font-space-grotesk)' }}>
            © {new Date().getFullYear()} Impulsia
          </p>
          {/* <a href="mailto:hola@impulsia.ar" style={{ fontSize: '0.75rem', color: 'rgba(0,0,0,0.40)', textDecoration: 'none', fontFamily: 'var(--font-space-grotesk)' }}>
            hola@impulsia.ar
          </a> */}
        </div>

      </div>
    </footer>
  );
}
