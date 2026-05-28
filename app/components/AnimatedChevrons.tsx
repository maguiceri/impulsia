'use client';

import { useEffect, useRef } from 'react';

type RGB = readonly [number, number, number];
const COLORS: RGB[] = [
  [99,  102, 241],   // indigo vivo
  [147,  51, 234],   // violeta vivo
  [217,  70, 239],   // fuchsia vivo
];

const HELIX_R     = 78;
const HELIX_TWIST = Math.PI * 2;
const FLAT_X      = [-60, 0, 60] as const;
const NS          = 3;
const N           = 160;
const K           = 6;
const SCATTER     = 10;
const FOV         = 800;

const SERVICES = [
  { title: 'Modern Websites',  desc: 'Diseño interfaces rápidas, responsivas y visualmente impactantes inspiradas en las últimas tendencias digitales.',   trigger: 0.36, color: 'rgb(99,102,241)'  },
  { title: 'AI y Automatizacion',      desc: 'Sistemas inteligentes y automatizaciones que optimizan procesos, comunicación y experiencias digitales.',       trigger: 0.42, color: 'rgb(147,51,234)'  },
  { title: 'Estrategia Digital',       desc: 'Experiencias digitales pensadas para potenciar la presencia y percepción de una marca.',       trigger: 0.48, color: 'rgb(217,70,239)'  },
  { title: 'Sistemas Escalables', desc: 'Arquitecturas modernas preparadas para crecer junto a tu negocio.',     trigger: 0.54, color: 'rgb(99,102,241)'  },
] as const;

const R_CARD = 185;
const CARD_SPIRAL = [
  { t: -0.55, angle:  35 * Math.PI / 180 },
  { t: -0.18, angle: 195 * Math.PI / 180 },
  { t:  0.18, angle: 325 * Math.PI / 180 },
  { t:  0.55, angle: 155 * Math.PI / 180 },
];

const lerp     = (a: number, b: number, t: number) => a + (b - a) * t;
const ease     = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
const clamp    = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const hash     = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const chevArmX = (t: number) => lerp(-15, 15, t < 0 ? t + 1 : 1 - t);
const toRgba   = (color: string, a: number) => color.replace('rgb(', 'rgba(').replace(')', `, ${a})`);

export default function AnimatedChevrons() {
  const zoneRef    = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<(HTMLDivElement | null)[]>([]);
  const cards3dRef = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);   // fondo negro — sale hacia arriba
  const contentRef = useRef<HTMLDivElement>(null);   // texto + cards — salen con overlayRef
  const nextRef    = useRef<HTMLDivElement>(null);
  const startRef   = useRef(0);
  const slideVRef  = useRef(0);
  const mouseRef   = useRef({ x: 0.5, y: 0.5 });
  const mouseSmRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    window.scrollTo(0, 0);
    startRef.current = performance.now();

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    };
    window.addEventListener('mousemove', onMouse);

    let raf: number;

    const tick = () => {
      const zone   = zoneRef.current;
      const canvas = canvasRef.current;
      if (!zone || !canvas) { raf = requestAnimationFrame(tick); return; }

      const ctx = canvas.getContext('2d')!;
      const W = window.innerWidth, H = window.innerHeight;
      if (canvas.width !== W)  canvas.width  = W;
      if (canvas.height !== H) canvas.height = H;
      const cx = W / 2, cy = H / 2;

      const ms = mouseSmRef.current;
      ms.x += (mouseRef.current.x - ms.x) * 0.07;
      ms.y += (mouseRef.current.y - ms.y) * 0.07;

      const scrollable = Math.max(1, zone.offsetHeight - H);
      const targetRaw  = clamp(window.scrollY / scrollable, 0, 1);

      if (textRef.current) {
        textRef.current.style.opacity = String(1 - ease(clamp(targetRaw / 0.12, 0, 1)));
      }

      const dissolvP  = ease(clamp(targetRaw / 0.08, 0, 1));
      const growP     = ease(clamp(targetRaw / 0.35, 0, 1));
      const morphP    = ease(clamp((targetRaw - 0.10) / 0.25, 0, 1));
      const transP        = ease(clamp((targetRaw - 0.70) / 0.22, 0, 1));
      const helixFade     = 1 - ease(clamp(transP / 0.30, 0, 1));
      const cardTransFade = clamp(1 - transP * 2.0, 0, 1);
      const riseP         = ease(clamp(transP / 0.55, 0, 1));

      const halfH          = lerp(30, H * 0.47, growP);
      const currentScatter = SCATTER * dissolvP;

      const camY = targetRaw * Math.PI * 5;
      const camX = 0.28 * Math.sin(camY * 0.7);
      const cosY = Math.cos(camY), sinY = Math.sin(camY);
      const cosX = Math.cos(camX), sinX = Math.sin(camX);

      // canvas es fijo y transparente — html bg-black es el fondo base
      ctx.clearRect(0, 0, W, H);

      // ── Cards en espiral 3D ───────────────────────────────────────────────
      const cardSlideFade = clamp(1 - slideVRef.current * 3, 0, 1);
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const { trigger }      = SERVICES[idx];
        const { t: tc, angle } = CARD_SPIRAL[idx];
        const p = ease(clamp((targetRaw - trigger) / 0.09, 0, 1));

        const wx = R_CARD * Math.cos(angle);
        const wz = R_CARD * Math.sin(angle);
        const wy = tc * halfH;

        const rx  =  wx * cosY + wz * sinY;
        const rz1 = -wx * sinY + wz * cosY;
        const ry  =  wy * cosX - rz1 * sinX;
        const fz  =  wy * sinX + rz1 * cosX;

        const sc      = FOV / Math.max(1, FOV - fz);
        const screenX = cx + rx * sc;
        const screenY = cy + ry * sc;

        const normalCamX = Math.cos(angle) * cosY + Math.sin(angle) * sinY;
        const normalCamZ = -Math.cos(angle) * sinY + Math.sin(angle) * cosY;
        const faceAngle  = Math.atan2(normalCamX, -normalCamZ) * (180 / Math.PI);

        const nearFar     = clamp((fz + R_CARD) / (R_CARD * 2), 0, 1);
        const frontFactor = ease(clamp(1 - Math.abs(faceAngle) / 45, 0, 1));
        const cardScale   = lerp(0.72, 1.5, frontFactor);
        const bright      = lerp(1.2, 0.35, nearFar);
        const absFace     = Math.abs(faceAngle);
        const faceMult    = absFace <= 90 ? 1 : lerp(1, 0.55, (absFace - 90) / 90);
        const cardAlpha   = p * lerp(1.0, 0.28, nearFar) * faceMult * Math.min(cardSlideFade, cardTransFade);

        card.style.left    = screenX + 'px';
        card.style.top     = screenY + 'px';
        card.style.opacity = String(cardAlpha);
        card.style.filter  = `brightness(${bright.toFixed(2)})`;

        const card3d = cards3dRef.current[idx];
        if (card3d) {
          card3d.style.transform = `translate(-50%,-50%) scale(${cardScale.toFixed(3)}) perspective(500px) rotateY(${faceAngle.toFixed(1)}deg)`;
        }
      });

      // ── Flechas sólidas + partículas: se llevan hacia arriba junto con la red ─
      if (riseP > 0.001) ctx.save();
      if (riseP > 0.001) ctx.translate(0, -riseP * H);

      const elapsed = (performance.now() - startRef.current) / 1000;
      if (dissolvP < 1) {
        const grad = ctx.createLinearGradient(cx + FLAT_X[0] - 15, 0, cx + FLAT_X[NS - 1] + 15, 0);
        grad.addColorStop(0,   'rgb(65, 110, 235)');
        grad.addColorStop(0.5, 'rgb(15, 195, 228)');
        grad.addColorStop(1,   'rgb(130, 55, 230)');
        ctx.lineJoin = 'round';
        ctx.lineCap  = 'round';
        ctx.lineWidth = 10;
        ctx.strokeStyle = grad;
        for (let i = 0; i < NS; i++) {
          const delay   = (NS - 1 - i) * 0.07;
          const slideP  = ease(clamp((elapsed - delay) / 0.45, 0, 1));
          const slideOx = lerp(-350, 0, slideP);
          ctx.globalAlpha = (1 - dissolvP) * slideP;
          ctx.beginPath();
          ctx.moveTo(cx + FLAT_X[i] - 15 + slideOx, cy - halfH);
          ctx.lineTo(cx + FLAT_X[i] + 15 + slideOx, cy);
          ctx.lineTo(cx + FLAT_X[i] - 15 + slideOx, cy + halfH);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      // ── Partículas ────────────────────────────────────────────────────────
      if (dissolvP > 0 && helixFade > 0) {
        type Particle = { px: number; py: number; pr: number; alpha: number; r: number; g: number; b: number; fz: number };
        const particles: Particle[] = [];

        for (let s = 0; s < N; s++) {
          const t = lerp(-1, 1, (s + 0.5) / N);
          for (let i = 0; i < NS; i++) {
            const hAngle = i * (Math.PI * 2 / NS) + HELIX_TWIST * t;
            const wx = lerp(FLAT_X[i] + chevArmX(t), HELIX_R * Math.cos(hAngle), morphP);
            const wz = lerp(0,                         HELIX_R * Math.sin(hAngle), morphP);
            const wy = t * halfH;

            const rx  =  wx * cosY + wz * sinY;
            const rz1 = -wx * sinY + wz * cosY;
            const ry  =  wy * cosX - rz1 * sinX;
            const fz  =  wy * sinX + rz1 * cosX;

            const scale = FOV / Math.max(1, FOV - fz);
            const bx    = cx + rx * scale;
            const by    = cy + ry * scale;

            const dep = clamp(1 + fz / (HELIX_R * 2.2), 0.6, 1.8);
            const [rc, gc, bc] = COLORS[i];
            const dimFactor = clamp(dep, 0.55, 1.0);
            const dr = Math.round(clamp(rc * dimFactor, 0, 255));
            const dg = Math.round(clamp(gc * dimFactor, 0, 255));
            const db = Math.round(clamp(bc * dimFactor, 0, 255));

            for (let k = 0; k < K; k++) {
              const seed  = (s * 4 + i) * K + k;
              const ox    = (hash(seed)       - 0.5) * 2 * currentScatter;
              const oy    = (hash(seed + 0.5) - 0.5) * 2 * currentScatter;
              const dist  = currentScatter > 0 ? Math.sqrt(ox * ox + oy * oy) / (currentScatter * 1.42) : 0;
              const pr    = lerp(1.2, 2.8, hash(seed + 0.3));
              const alpha = clamp((1 - dist) * dep * 0.9 * dissolvP, 0, 1) * helixFade;

              if (alpha < 0.01) continue;
              if (bx + ox < -50 || bx + ox > W + 50) continue;
              particles.push({ px: bx + ox, py: by + oy, pr, alpha, r: dr, g: dg, b: db, fz });
            }
          }
        }

        particles.sort((a, b) => a.fz - b.fz);
        for (const { px, py, pr, alpha, r, g, b } of particles) {
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(px, py, pr, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      if (riseP > 0.001) ctx.restore();

      // ── Red neuronal: piso → de costado → techo ─────────────────────────
      if (transP > 0) {
        const FOV_G    = 520;
        const CAM_HMAX = 200;
        const ROWS     = 9;
        const SPX      = 95;
        const SPZ      = 65;
        const Z_NEAR   = 270;
        const CLRS: [number,number,number][] = [[99,102,241],[147,51,234],[217,70,239]];
        const t = performance.now() / 1000;

        const camH  = lerp(CAM_HMAX, -CAM_HMAX, transP);
        const cxP   = cx + (ms.x - 0.5) * W * 0.10;
        const msx   = ms.x * W;
        const msy   = ms.y * H;
        const alpha = ease(clamp(transP * 6, 0, 1));

        if (alpha > 0.01) {
          ctx.save();
          ctx.beginPath();
          if      (camH >  2) ctx.rect(0, cy, W, H - cy);
          else if (camH < -2) ctx.rect(0, 0,  W, cy);
          else                 ctx.rect(0, 0,  W, H);
          ctx.closePath();
          ctx.clip();
          ctx.lineCap  = 'round';
          ctx.lineJoin = 'round';

          // ── Construir grilla de nodos ──────────────────────────────────
          type NNode = { sx: number; sy: number; sc: number; fade: number; col: number };
          const rowNodes: NNode[][] = [];
          const colMap: Map<number, NNode>[] = [];

          // Deformación por cursor: burbuja de repulsión + ondas eléctricas
          const PUSH_R = W * 0.22;
          const MAX_D  = 52;
          const WAVE_L = 42;

          for (let row = 0; row < ROWS; row++) {
            const wz   = Z_NEAR + row * SPZ;
            const sc   = FOV_G / wz;
            const fade = clamp(sc * 0.65, 0.15, 1) * clamp((2.8 - sc), 0.2, 1);
            const rArr: NNode[] = [];
            const rMap = new Map<number, NNode>();
            if (fade >= 0.02) {
              const hCols = Math.min(12, Math.ceil((W * 0.58) / (SPX * sc)) + 2);
              const stag  = (row % 2) * (SPX / 2);
              for (let col = -hCols; col <= hCols; col++) {
                const wx  = col * SPX + stag;
                const bsx = cxP + wx * sc;
                const bsy = cy  + camH * sc;

                // desplazamiento en espacio de pantalla
                const ddx = bsx - msx, ddy = bsy - msy;
                const dn  = Math.sqrt(ddx * ddx + ddy * ddy) || 0.001;
                const inf = clamp(1 - dn / PUSH_R, 0, 1);
                const push   = ease(clamp(1 - dn / (PUSH_R * 0.38), 0, 1)) * MAX_D * 0.55;
                const ripple = inf ** 1.5 * Math.sin(dn / WAVE_L - t * 4.0) * MAX_D * 0.65;
                const disp   = (push + ripple) * alpha;

                const n: NNode = {
                  sx: bsx + (ddx / dn) * disp,
                  sy: bsy + (ddy / dn) * disp,
                  sc, fade, col,
                };
                rArr.push(n);
                rMap.set(col, n);
              }
            }
            rowNodes.push(rArr);
            colMap.push(rMap);
          }

          // ── Conexiones ────────────────────────────────────────────────
          for (let row = 0; row < ROWS; row++) {
            const rArr = rowNodes[row];
            if (!rArr.length) continue;
            const { fade } = rArr[0];

            // Conexiones horizontales (misma fila)
            for (let ni = 0; ni < rArr.length - 1; ni++) {
              const A = rArr[ni], B = rArr[ni + 1];
              const seed = row * 200 + ni;
              if (hash(seed + 99) > 0.88) continue;

              const [cr, cg, cb] = CLRS[((row + ni) % 3 + 3) % 3];
              const midX   = (A.sx + B.sx) / 2, midY = (A.sy + B.sy) / 2;
              const mBoost = clamp(1 - Math.sqrt((midX - msx) ** 2 + (midY - msy) ** 2) / (W * 0.30), 0, 1);
              const lineA  = alpha * fade * (0.28 + mBoost * 0.52);

              // wire
              ctx.globalAlpha = clamp(lineA * 0.65, 0, 1);
              ctx.strokeStyle = `rgb(${cr},${cg},${cb})`;
              ctx.lineWidth   = 0.5 + A.sc * 0.25;
              ctx.shadowBlur  = mBoost > 0.3 ? 4 * alpha : 0;
              ctx.shadowColor = `rgb(${cr},${cg},${cb})`;
              ctx.beginPath(); ctx.moveTo(A.sx, A.sy); ctx.lineTo(B.sx, B.sy); ctx.stroke();
              ctx.shadowBlur  = 0;

              // pulso de señal
              const pT   = (t * lerp(0.2, 0.65, hash(seed + 1)) + hash(seed + 2)) % 1;
              const pLen = 0.16;
              if (pT < 1 - pLen && lineA > 0.08) {
                const x0 = lerp(A.sx, B.sx, pT),        y0 = lerp(A.sy, B.sy, pT);
                const x1 = lerp(A.sx, B.sx, pT + pLen), y1 = lerp(A.sy, B.sy, pT + pLen);
                const grd = ctx.createLinearGradient(x0, y0, x1, y1);
                grd.addColorStop(0, `rgba(${cr},${cg},${cb},0)`);
                grd.addColorStop(1, `rgba(${cr},${cg},${cb},${Math.min(lineA * 3.5, 1).toFixed(2)})`);
                ctx.globalAlpha = 1;
                ctx.strokeStyle = grd;
                ctx.lineWidth   = 1.5 + mBoost * 0.5;
                ctx.shadowColor = `rgb(${cr},${cg},${cb})`;
                ctx.shadowBlur  = 10 * alpha;
                ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
                ctx.shadowBlur  = 0;
              }
            }

            // Conexiones en profundidad (hacia fila siguiente — malla hexagonal)
            if (row + 1 < ROWS && colMap[row + 1].size > 0) {
              const isEven = row % 2 === 0;
              for (const A of rArr) {
                const targets = isEven ? [A.col, A.col - 1] : [A.col, A.col + 1];
                for (const tc of targets) {
                  const B = colMap[row + 1].get(tc);
                  if (!B) continue;
                  const seed = ((row * 10000 + A.col * 100 + tc) & 0xfffff);
                  if (hash(seed + 55) > 0.52) continue;

                  const [cr, cg, cb] = CLRS[((row + A.col + tc) % 3 + 3) % 3];
                  const depFade = (fade + B.fade) * 0.5;
                  const midX    = (A.sx + B.sx) / 2, midY = (A.sy + B.sy) / 2;
                  const mBoost  = clamp(1 - Math.sqrt((midX - msx) ** 2 + (midY - msy) ** 2) / (W * 0.30), 0, 1);
                  const lineA   = alpha * depFade * (0.18 + mBoost * 0.32);

                  ctx.globalAlpha = clamp(lineA, 0, 1);
                  ctx.strokeStyle = `rgb(${cr},${cg},${cb})`;
                  ctx.lineWidth   = 0.4 + B.sc * 0.2;
                  ctx.shadowBlur  = 0;
                  ctx.beginPath(); ctx.moveTo(A.sx, A.sy); ctx.lineTo(B.sx, B.sy); ctx.stroke();

                  // pulso en profundidad (más lento)
                  const pT2   = (t * lerp(0.10, 0.35, hash(seed + 3)) + hash(seed + 4)) % 1;
                  const pLen2 = 0.20;
                  if (pT2 < 1 - pLen2 && lineA > 0.06) {
                    const x0 = lerp(A.sx, B.sx, pT2),         y0 = lerp(A.sy, B.sy, pT2);
                    const x1 = lerp(A.sx, B.sx, pT2 + pLen2), y1 = lerp(A.sy, B.sy, pT2 + pLen2);
                    const grd2 = ctx.createLinearGradient(x0, y0, x1, y1);
                    grd2.addColorStop(0, `rgba(${cr},${cg},${cb},0)`);
                    grd2.addColorStop(1, `rgba(${cr},${cg},${cb},${Math.min(lineA * 3, 1).toFixed(2)})`);
                    ctx.globalAlpha = 1;
                    ctx.strokeStyle = grd2;
                    ctx.lineWidth   = 1.2;
                    ctx.shadowColor = `rgb(${cr},${cg},${cb})`;
                    ctx.shadowBlur  = 8 * alpha;
                    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
                    ctx.shadowBlur  = 0;
                  }
                }
              }
            }
          }

          // ── Nodos ─────────────────────────────────────────────────────
          for (let row = 0; row < ROWS; row++) {
            const rArr = rowNodes[row];
            for (let ni = 0; ni < rArr.length; ni++) {
              const { sx, sy, sc, fade } = rArr[ni];
              const seed   = (row * 200 + ni + 9999) & 0xfffff;
              const [cr, cg, cb] = CLRS[((row + ni) % 3 + 3) % 3];
              const mBoost = clamp(1 - Math.sqrt((sx - msx) ** 2 + (sy - msy) ** 2) / (W * 0.22), 0, 1);
              const isHub  = hash(seed + 0.7) > 0.74;
              const pulse  = 0.60 + 0.40 * Math.sin(t * lerp(0.4, 1.1, hash(seed)) * Math.PI * 2 + hash(seed + 0.4) * Math.PI * 6);
              const r      = sc * (isHub ? lerp(3.5, 5.5, pulse) : lerp(1.4, 2.2, pulse)) * (1 + mBoost * 0.6);
              const nodeA  = alpha * fade * (isHub ? 1.0 : 0.75) * (0.45 + mBoost * 0.55);

              // aura
              ctx.globalAlpha = clamp(nodeA * 0.30, 0, 1);
              ctx.shadowColor = `rgb(${cr},${cg},${cb})`;
              ctx.shadowBlur  = (isHub ? 20 : 9) * alpha * (1 + mBoost * 0.8);
              ctx.fillStyle   = `rgb(${cr},${cg},${cb})`;
              ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2); ctx.fill();

              // núcleo brillante
              ctx.globalAlpha = clamp(nodeA, 0, 1);
              ctx.shadowBlur  = (isHub ? 7 : 3) * alpha;
              ctx.fillStyle   = `rgb(${Math.min(cr + 90, 255)},${Math.min(cg + 90, 255)},${Math.min(cb + 90, 255)})`;
              ctx.beginPath(); ctx.arc(sx, sy, r * (isHub ? 0.32 : 0.42), 0, Math.PI * 2); ctx.fill();
              ctx.shadowBlur  = 0;
            }
          }

          ctx.globalAlpha = 1;
          ctx.restore();
        }

        // Línea de horizonte al estar de costado
        const edgeGlow = ease(clamp(1 - Math.abs(camH) / (CAM_HMAX * 0.55), 0, 1)) * alpha;
        if (edgeGlow > 0.01) {
          ctx.save();
          ctx.globalAlpha = edgeGlow * 0.9;
          ctx.shadowColor = 'rgb(217,70,239)';
          ctx.shadowBlur  = 28 * edgeGlow;
          ctx.strokeStyle = `rgba(158,31,174,${edgeGlow.toFixed(2)})`;
          ctx.lineWidth   = 2 + edgeGlow * 5;
          ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
          ctx.shadowBlur  = 0;
          ctx.globalAlpha = 1;
          ctx.restore();
        }

        const slideTarget = ease(clamp((transP - 0.45) / 0.55, 0, 1));
        slideVRef.current += (slideTarget - slideVRef.current) * 0.08;
        const sv = slideVRef.current;
        if (overlayRef.current) overlayRef.current.style.transform = `translateY(${(-riseP * 100).toFixed(2)}vh)`;
        if (contentRef.current) contentRef.current.style.transform = `translateY(${(-riseP * 100).toFixed(2)}vh)`;
        if (nextRef.current)    nextRef.current.style.transform    = `translateY(${((1 - sv) * 100).toFixed(2)}vh)`;
      } else {
        slideVRef.current = 0;
        if (overlayRef.current) overlayRef.current.style.transform = 'translateY(0)';
        if (contentRef.current) contentRef.current.style.transform = 'translateY(0)';
        if (nextRef.current)    nextRef.current.style.transform    = 'translateY(100vh)';
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMouse); };
  }, []);

  return (
    <>
    <div ref={zoneRef} style={{ height: '4000vh' }}>
      {/* Fondo claro que sale hacia arriba en el slide */}
      <div ref={overlayRef} style={{ position: 'fixed', inset: 0, background: '#f4f3ff', zIndex: 1, willChange: 'transform' }} />
    </div>

    {/* Próxima sección — entra desde abajo */}
    <div ref={nextRef} style={{ position: 'fixed', inset: 0, zIndex: 2, transform: 'translateY(100vh)', background: '#f4f3ff', pointerEvents: 'none', willChange: 'transform' }} />

    {/* Canvas único fijo — zIndex 3, por encima de nextRef
        No se mueve con el slide: ceiling visible en la sección siguiente */}
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, display: 'block', zIndex: 3, pointerEvents: 'none' }}
    />

    {/* Texto + cards — zIndex 4, por encima del canvas, salen con overlayRef */}
    <div ref={contentRef} style={{ position: 'fixed', inset: 0, zIndex: 4, pointerEvents: 'none', willChange: 'transform' }}>
      <div
        ref={textRef}
        className="absolute left-1/2 -translate-x-1/2 text-center select-none"
        style={{ top: '58%', zIndex: 10 }}
      >
        <p className="text-[#0f0a2e]" style={{ fontSize: '2.25rem', fontFamily: 'var(--font-orbitron)', letterSpacing: '0.45em' }}>
          {['I','M'].map((l, i) => (
            <span key={l+i} style={{ display: 'inline-block', opacity: 0, animation: 'letter-in 0.45s ease forwards', animationDelay: `${(7 - i) * 0.07}s` }}>{l}</span>
          ))}
          <span style={{ display: 'inline-block', opacity: 0, marginRight: '0.45em', animation: 'letter-in 0.45s ease forwards', animationDelay: '0.35s' }}>
            <svg viewBox="0 0 26 38" style={{ display: 'block', height: '0.73em', width: 'auto' }} fill="none">
              <path d="M 4,2 L 16,2 Q 25,2 25,12 Q 25,22 16,22 L 4,22" stroke="#0f0a2e" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="4" y1="22" x2="4" y2="36" stroke="#0f0a2e" strokeWidth="4.5" strokeLinecap="round" />
            </svg>
          </span>
          {['U','L','S','I'].map((l, i) => (
            <span key={l+i} style={{ display: 'inline-block', opacity: 0, animation: 'letter-in 0.45s ease forwards', animationDelay: `${(7 - (i + 3)) * 0.07}s` }}>{l}</span>
          ))}
          <span style={{ display: 'inline-block', opacity: 0, animation: 'letter-in 0.45s ease forwards', animationDelay: '0s' }}>
            <svg viewBox="0 0 28 38" style={{ display: 'block', height: '0.73em', width: 'auto' }} fill="none">
              <defs>
                <linearGradient id="agr" gradientUnits="userSpaceOnUse" x1="19" y1="16" x2="26" y2="36">
                  <stop offset="0%"   stopColor="rgb(65,110,235)"  stopOpacity="0" />
                  <stop offset="15%"  stopColor="rgb(65,110,235)"  stopOpacity="1" />
                  <stop offset="55%"  stopColor="rgb(15,195,228)" />
                  <stop offset="100%" stopColor="rgb(130,55,230)" />
                </linearGradient>
              </defs>
              <line x1="2"  y1="36" x2="14" y2="2" stroke="#0f0a2e" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="26" y1="36" x2="14" y2="2" stroke="#0f0a2e" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="26" y1="36" x2="14" y2="2" stroke="url(#agr)" strokeWidth="4.5" strokeLinecap="round" />
            </svg>
          </span>
        </p>
      </div>

      {/* Service cards */}
      {SERVICES.map((svc, idx) => (
        <div
          key={svc.title}
          ref={el => { cardsRef.current[idx] = el; }}
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0, zIndex: 20, pointerEvents: 'auto' }}
        >
          <div
            ref={el => { cards3dRef.current[idx] = el; }}
            style={{ width: 'clamp(240px, 26vw, 340px)', transformStyle: 'preserve-3d' }}
          >
            {/* Front face */}
            <div style={{
              padding: '24px 26px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.92)',
              border: `1px solid ${svc.color}`,
              boxShadow: `0 0 28px ${svc.color}44, inset 0 1px 0 ${toRgba(svc.color, 0.3)}`,
              transform: 'translateZ(16px)',
            }}>
              <div style={{ width: '36px', height: '3px', background: svc.color, marginBottom: '16px', borderRadius: '2px', boxShadow: `0 0 8px ${svc.color}` }} />
              <p style={{ color: '#0f0a2e', fontFamily: 'var(--font-orbitron)', fontSize: '0.9rem', letterSpacing: '0.08em', marginBottom: '10px', lineHeight: 1.3 }}>
                {svc.title}
              </p>
              <p style={{ color: 'rgba(15,10,46,0.60)', fontSize: '0.75rem', letterSpacing: '0.01em', lineHeight: 1.6 }}>
                {svc.desc}
              </p>
            </div>
            {/* Back face */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', background: 'rgba(255,255,255,0.75)', border: `1px solid ${toRgba(svc.color, 0.35)}`, transform: 'translateZ(-16px)' }} />
            {/* Left edge */}
            <div style={{ position: 'absolute', top: 0, left: '-16px', bottom: 0, width: '32px', background: `linear-gradient(to right, ${toRgba(svc.color, 0.05)}, ${toRgba(svc.color, 0.5)})`, transform: 'rotateY(90deg)', transformOrigin: 'center' }} />
            {/* Right edge */}
            <div style={{ position: 'absolute', top: 0, right: '-16px', bottom: 0, width: '32px', background: `linear-gradient(to left, ${toRgba(svc.color, 0.05)}, ${toRgba(svc.color, 0.5)})`, transform: 'rotateY(-90deg)', transformOrigin: 'center' }} />
            {/* Top edge */}
            <div style={{ position: 'absolute', top: '-16px', left: 0, right: 0, height: '32px', background: `linear-gradient(to bottom, ${toRgba(svc.color, 0.05)}, ${toRgba(svc.color, 0.4)})`, transform: 'rotateX(-90deg)', transformOrigin: 'center' }} />
            {/* Bottom edge */}
            <div style={{ position: 'absolute', bottom: '-16px', left: 0, right: 0, height: '32px', background: `linear-gradient(to top, ${toRgba(svc.color, 0.05)}, ${toRgba(svc.color, 0.4)})`, transform: 'rotateX(90deg)', transformOrigin: 'center' }} />
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
