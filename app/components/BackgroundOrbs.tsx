'use client';

export default function BackgroundOrbs() {
  return (
    <div aria-hidden style={{
      position: 'fixed', inset: 0, zIndex: 0,
      pointerEvents: 'none', overflow: 'hidden',
    }}>
      {/* Orb indigo — arriba izquierda */}
      <div style={{
        position: 'absolute', top: '-15%', left: '-10%',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
        animation: 'orb1 14s ease-in-out infinite',
      }} />
      {/* Orb fuchsia — arriba derecha */}
      <div style={{
        position: 'absolute', top: '5%', right: '-12%',
        width: '550px', height: '550px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(217,70,239,0.13) 0%, transparent 70%)',
        animation: 'orb2 18s ease-in-out infinite',
      }} />
      {/* Orb violeta — centro bajo */}
      <div style={{
        position: 'absolute', top: '55%', left: '25%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(147,51,234,0.11) 0%, transparent 70%)',
        animation: 'orb3 22s ease-in-out infinite',
      }} />
    </div>
  );
}
