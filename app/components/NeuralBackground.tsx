const VIEW_W = 1600;
const VIEW_H = 900;

const LAYER_X = [200, 600, 1000, 1400];
const LAYER_COUNTS = [4, 7, 7, 4];

type Node = {
  id: string;
  layer: number;
  x: number;
  y: number;
  r: number;
  delay: number;
  hub: boolean;
};

const NODES: Node[] = LAYER_X.flatMap((x, layerIdx) => {
  const count = LAYER_COUNTS[layerIdx];
  return Array.from({ length: count }, (_, i) => {
    const yBase = 110 + ((i + 0.5) / count) * (VIEW_H - 220);
    const yOffset = (((layerIdx * 17 + i * 23) % 11) - 5) * 5;
    return {
      id: `n-${layerIdx}-${i}`,
      layer: layerIdx,
      x,
      y: yBase + yOffset,
      r: 6 + ((layerIdx + i) % 3),
      delay: -(((layerIdx * 3 + i) * 0.27) % 4),
      hub: i === Math.floor(count / 2),
    };
  });
});

type Edge = {
  id: string;
  x1: number; y1: number;
  x2: number; y2: number;
  delay: number;
  duration: number;
  bright: boolean;
};

const EDGES: Edge[] = (() => {
  const list: Edge[] = [];
  for (let l = 0; l < LAYER_X.length - 1; l++) {
    const from = NODES.filter(n => n.layer === l);
    const to   = NODES.filter(n => n.layer === l + 1);
    from.forEach((f, fi) => {
      to.forEach((t, ti) => {
        const idx = fi * 100 + ti + l * 7;
        list.push({
          id: `e-${l}-${fi}-${ti}`,
          x1: f.x, y1: f.y,
          x2: t.x, y2: t.y,
          delay: -((idx * 0.4) % 6),
          duration: 3 + ((idx + l) % 3),
          bright: idx % 4 === 0,
        });
      });
    });
  }
  return list;
})();

const STARS = Array.from({ length: 28 }, (_, i) => ({
  left:     (i * 53 + 7) % 100,
  top:      (i * 31 + 3) % 100,
  size:     1 + ((i * 7) % 2),
  delay:    String(-(((i * 0.4) % 5).toFixed(2))),
  duration: 2 + (i % 4),
}));

export default function NeuralBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Orbs — misma posición que BackgroundOrbs, misma paleta */}
      <div style={{
        position: 'absolute', top: '-15%', left: '-10%',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)',
        animation: 'orb1 14s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '5%', right: '-12%',
        width: '550px', height: '550px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(217,70,239,0.08) 0%, transparent 70%)',
        animation: 'orb2 18s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '55%', left: '25%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(147,51,234,0.07) 0%, transparent 70%)',
        animation: 'orb3 22s ease-in-out infinite',
      }} />

      {/* Partículas */}
      {STARS.map((s, i) => (
        <span
          key={`star-${i}`}
          style={{
            position: 'absolute',
            left: `${s.left}%`,
            top:  `${s.top}%`,
            width:  `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: '50%',
            opacity: 0,
            background: 'rgb(99,102,241)',
            animation: `twinkle ${s.duration}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
            boxShadow: '0 0 4px rgba(99,102,241,0.45)',
          }}
        />
      ))}

      {/* Red neuronal SVG */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="imp_nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgb(147,51,234)"  stopOpacity="0.70" />
            <stop offset="45%"  stopColor="rgb(99,102,241)"  stopOpacity="0.30" />
            <stop offset="100%" stopColor="rgb(99,102,241)"  stopOpacity="0"    />
          </radialGradient>
          <radialGradient id="imp_hubAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgb(147,51,234)"  stopOpacity="0.30" />
            <stop offset="100%" stopColor="rgb(99,102,241)"  stopOpacity="0"    />
          </radialGradient>
        </defs>

        {/* Edges estáticos — muy tenues sobre fondo blanco */}
        <g>
          {EDGES.map(e => (
            <line
              key={e.id}
              x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              stroke="rgba(99,102,241,0.07)"
              strokeWidth={1}
            />
          ))}
        </g>

        {/* Edges con flujo animado */}
        <g>
          {EDGES.filter(e => e.bright).map(e => (
            <line
              key={`flow-${e.id}`}
              x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              stroke="rgba(99,102,241,0.38)"
              strokeWidth={1.4}
              strokeDasharray="6 14"
              strokeLinecap="round"
              className="fxEdgeFlow"
              style={{
                animationDuration: `${e.duration}s`,
                animationDelay:    `${e.delay}s`,
              }}
            />
          ))}
        </g>

        {/* Auras de nodos hub */}
        <g>
          {NODES.filter(n => n.hub).map(n => (
            <circle
              key={`aura-${n.id}`}
              cx={n.x} cy={n.y}
              r={n.r * 4}
              fill="url(#imp_hubAura)"
              className="fxNodeAura"
              style={{ animationDelay: `${n.delay}s` }}
            />
          ))}
        </g>

        {/* Nodos */}
        <g>
          {NODES.map(n => (
            <g key={n.id}>
              <circle
                cx={n.x} cy={n.y}
                r={n.r * 2.4}
                fill="url(#imp_nodeGlow)"
                className="fxNode"
                style={{ animationDelay: `${n.delay}s` }}
              />
              <circle
                cx={n.x} cy={n.y}
                r={n.r * 0.55}
                fill="rgb(147,51,234)"
                opacity={0.9}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
