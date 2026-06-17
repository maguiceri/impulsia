import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          background: '#0c0c1a',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Orb top-right */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 520,
            height: 520,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(147,51,234,0.35) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        {/* Orb bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: 140,
            width: 420,
            height: 420,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.28) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 22px',
            borderRadius: 100,
            border: '1px solid rgba(99,102,241,0.45)',
            background: 'rgba(99,102,241,0.12)',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'rgb(99,102,241)',
              display: 'flex',
            }}
          />
          <span
            style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Automatización · IA · Sistemas
          </span>
        </div>

        {/* Brand */}
        <div
          style={{
            fontSize: 104,
            fontWeight: 800,
            letterSpacing: '-0.025em',
            lineHeight: 1,
            marginBottom: 28,
            color: '#ffffff',
            display: 'flex',
          }}
        >
          Impulsia
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 30,
            color: 'rgba(255,255,255,0.48)',
            lineHeight: 1.45,
            maxWidth: 680,
            marginBottom: 52,
            display: 'flex',
          }}
        >
          Automatizamos las tareas repetitivas de tu negocio con IA y sistemas a medida.
        </div>

        {/* Divider */}
        <div
          style={{
            width: 52,
            height: 3,
            borderRadius: 2,
            background: 'linear-gradient(90deg, rgb(99,102,241), rgb(217,70,239))',
            marginBottom: 28,
            display: 'flex',
          }}
        />

        {/* URL */}
        <div
          style={{
            fontSize: 22,
            color: 'rgba(139,125,255,0.9)',
            letterSpacing: '0.06em',
            display: 'flex',
          }}
        >
          impulsia.studio
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
