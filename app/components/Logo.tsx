interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = { sm: '1.1rem', md: '1.6rem', lg: '2.25rem' };

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const fs = SIZES[size];
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.28em',
        fontFamily: 'var(--font-orbitron)',
        fontSize: fs,
        letterSpacing: '0.35em',
        color: 'var(--text)',
        userSelect: 'none',
        lineHeight: 1,
      }}
    >
      {/* Three chevrons above the text */}
      <svg
        viewBox="-1 -1 68 22"
        style={{ display: 'block', height: '0.55em', width: 'auto' }}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.8"
      >
        <polyline points="0,0 12,10 0,20" stroke="rgb(65,110,235)" />
        <polyline points="27,0 39,10 27,20" stroke="rgb(15,195,228)" />
        <polyline points="54,0 66,10 54,20" stroke="rgb(130,55,230)" />
      </svg>

      {/* IMPULSIA */}
      <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
        <span>I</span><span>M</span>
        <span style={{ display: 'inline-block', marginRight: '0.35em' }}>
          <svg viewBox="0 0 26 38" style={{ display: 'block', height: '0.73em', width: 'auto' }} fill="none">
            <path d="M 4,2 L 16,2 Q 25,2 25,12 Q 25,22 16,22 L 4,22" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="4" y1="22" x2="4" y2="36" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        </span>
        <span>U</span><span>L</span><span>S</span><span>I</span>
        <span style={{ display: 'inline-block' }}>
          <svg viewBox="0 0 28 38" style={{ display: 'block', height: '0.73em', width: 'auto' }} fill="none">
            <defs>
              <linearGradient id="logo-agr" gradientUnits="userSpaceOnUse" x1="19" y1="16" x2="26" y2="36">
                <stop offset="0%"   stopColor="rgb(65,110,235)"  stopOpacity="0" />
                <stop offset="15%"  stopColor="rgb(65,110,235)"  stopOpacity="1" />
                <stop offset="55%"  stopColor="rgb(15,195,228)" />
                <stop offset="100%" stopColor="rgb(130,55,230)" />
              </linearGradient>
            </defs>
            <line x1="2"  y1="36" x2="14" y2="2" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="26" y1="36" x2="14" y2="2" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="26" y1="36" x2="14" y2="2" stroke="url(#logo-agr)" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        </span>
      </span>
    </span>
  );
}
