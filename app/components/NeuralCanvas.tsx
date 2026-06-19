"use client";

import { useEffect, useRef } from "react";

const N = 150;
const MAX = 200;

interface NodeData {
  x: number; y: number;
  ox: number; oy: number;
  vx: number; vy: number;
  r: number;
  phase: number; freq: number;
  energy: number;
  hue: number;
}

function makeNode(w: number, h: number): NodeData {
  const cx = w / 2;
  const cy = h / 2;
  const angle = Math.random() * Math.PI * 2;
  const spreadX = 800;
  const spreadY = 400;
  const rotation = -Math.PI / 9;
  const ex = Math.cos(angle) * spreadX * Math.random();
  const ey = Math.sin(angle) * spreadY * Math.random();
  const x = cx + ex * Math.cos(rotation) - ey * Math.sin(rotation);
  const y = cy + ex * Math.sin(rotation) + ey * Math.cos(rotation);
  return {
    x, y,
    ox: x, oy: y,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: 0.8 + Math.random() * 1.4,
    phase: Math.random() * Math.PI * 2,
    freq: 0.015 + Math.random() * 0.025,
    energy: 0,
    hue: 187 + Math.random() * 88, // cyan (187) → azul (225) → violeta (275)
  };
}

export default function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const C = ref.current;
    if (!C) return;
    const ctx = C.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    const isMobile = window.innerWidth < 768;
    const M = { x: -1000, y: -1000, active: false, trail: [] as { x: number; y: number }[] };
    const smoothM = { x: -1000, y: -1000 };
    let nodes: NodeData[] = [];

    function resize() {
      if (isMobile) {
        C!.width = 390;
        C!.height = 844;
      } else {
        C!.width = window.innerWidth;
        C!.height = window.innerHeight;
      }
    }

    function init() {
      nodes = Array.from({ length: N }, () => makeNode(C!.width, C!.height));
    }

    resize();
    init();

    function onResize() {
      if (isMobile) return;
      resize(); init();
      ctx!.clearRect(0, 0, C!.width, C!.height);
    }

    function onMouseMove(e: MouseEvent) {
      M.x = e.clientX; M.y = e.clientY; M.active = true;
      M.trail.unshift({ x: M.x, y: M.y });
      if (M.trail.length > 14) M.trail.pop();
    }

    function onMouseLeave() { M.active = false; M.trail = []; }

    function onTouchStart(e: TouchEvent) {
      if (e.touches.length > 0) {
        M.x = e.touches[0].clientX;
        M.y = e.touches[0].clientY;
        if (isMobile) {
          const scaleX = C!.width / window.innerWidth;
          const scaleY = C!.height / window.innerHeight;
          M.x = e.touches[0].clientX * scaleX;
          M.y = e.touches[0].clientY * scaleY;
        }
        M.active = true;
        M.trail = [];
      }
    }

    function onTouchMove() {}
    function onTouchEnd() { M.active = false; M.trail = []; }

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);

    function updateNode(n: NodeData) {
      n.phase += n.freq;
      const dx = smoothM.x - n.x, dy = smoothM.y - n.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (M.active && dist < 160 && dist > 0.5) {
        const f = (160 - dist) / 160;
        n.vx -= (dx / dist) * f * 0.5;
        n.vy -= (dy / dist) * f * 0.5;
        n.energy = Math.min(1, n.energy + f * 0.1);
      } else {
        n.energy *= 0.88;
        n.vx += (n.ox - n.x) * 0.003;
        n.vy += (n.oy - n.y) * 0.003;
      }
      n.vx *= 0.95; n.vy *= 0.95;
      n.x += n.vx; n.y += n.vy;
    }

    function drawNode(n: NodeData) {
      const pulse = 0.4 + Math.sin(n.phase) * 0.3;
      const e = n.energy;
      const r = n.r * (1 + e * 1.2 + pulse * 0.2);
      const a = 0.35 + e * 0.5 + pulse * 0.15;
      const h = n.hue + e * 30; // más fuchsia cuando energizado
      if (e > 0.25) {
        const g = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5);
        g.addColorStop(0, `hsla(${h},100%,55%,${e * 0.18})`);
        g.addColorStop(1, `hsla(${h},100%,45%,0)`);
        ctx!.beginPath(); ctx!.arc(n.x, n.y, r * 5, 0, Math.PI * 2);
        ctx!.fillStyle = g; ctx!.fill();
      }
      ctx!.beginPath(); ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx!.fillStyle = `hsla(${h},85%,${48 + e * 20}%,${a})`;
      ctx!.fill();
    }

    function drawCursor() {
      if (!M.active) return;

      for (let i = 1; i < M.trail.length; i++) {
        const cur = M.trail[i - 1], prev = M.trail[i];
        const t = 1 - i / M.trail.length;
        const w = 6 * t * t;
        if (w < 0.2) continue;
        const g = ctx!.createLinearGradient(prev.x, prev.y, cur.x, cur.y);
        g.addColorStop(0, `rgba(130,55,230,0)`);
        g.addColorStop(1, `rgba(130,55,230,${t * 0.12})`);
        ctx!.beginPath(); ctx!.moveTo(prev.x, prev.y); ctx!.lineTo(cur.x, cur.y);
        ctx!.strokeStyle = g; ctx!.lineWidth = w; ctx!.lineCap = "round"; ctx!.stroke();
      }

      const g1 = ctx!.createRadialGradient(smoothM.x, smoothM.y, 0, smoothM.x, smoothM.y, 55);
      g1.addColorStop(0, "rgba(65,110,235,0.09)");
      g1.addColorStop(1, "rgba(130,55,230,0)");
      ctx!.beginPath(); ctx!.arc(smoothM.x, smoothM.y, 55, 0, Math.PI * 2);
      ctx!.fillStyle = g1; ctx!.fill();

      const g2 = ctx!.createRadialGradient(smoothM.x, smoothM.y, 0, smoothM.x, smoothM.y, 20);
      g2.addColorStop(0, "rgba(130,55,230,0.22)");
      g2.addColorStop(1, "rgba(65,110,235,0)");
      ctx!.beginPath(); ctx!.arc(smoothM.x, smoothM.y, 20, 0, Math.PI * 2);
      ctx!.fillStyle = g2; ctx!.fill();

      ctx!.beginPath(); ctx!.arc(smoothM.x, smoothM.y, 2.5, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(130,55,230,0.9)"; ctx!.fill();
    }

    function loop() {
      rafId = requestAnimationFrame(loop);

      smoothM.x += (M.x - smoothM.x) * 0.08;
      smoothM.y += (M.y - smoothM.y) * 0.08;

      // Fade blanco — motion blur sobre fondo claro
      ctx!.fillStyle = "rgba(255,255,255,0.15)";
      ctx!.fillRect(0, 0, C!.width, C!.height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX) {
            const energy = (a.energy + b.energy) * 0.5;
            const op = (1 - d / MAX) * (0.25 + energy * 0.5);
            const h = 215 + energy * 60; // azul → violeta cuando hay energía
            ctx!.beginPath(); ctx!.moveTo(a.x, a.y); ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `hsla(${h},80%,${48 + energy * 20}%,${op})`;
            ctx!.lineWidth = 0.5 + energy * 1.0;
            ctx!.stroke();
          }
        }
      }

      drawCursor();
      for (const n of nodes) { updateNode(n); drawNode(n); }
    }

    loop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.55 }}
    >
      <canvas ref={ref} style={{ display: 'block', width: '100vw', height: '100vh' }} />
    </div>
  );
}
