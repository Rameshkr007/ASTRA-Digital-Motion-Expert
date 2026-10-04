"use client";
import { useRef, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * ParticleField — Interactive Canvas Particle System.
 * Features:
 * - Dynamic color palettes based on active energy mode
 * - Mouse cursor magnetic repulsion / vortex deflection
 * - Real-time scroll velocity streaking
 * - High-DPI DPR optimization and Page Visibility pause
 */
export default function ParticleField({
  scrollVelocity = 0,
  isMobile = false,
  energyMode = "violet",
}) {
  const canvasRef = useRef(null);
  const velocityRef = useRef(scrollVelocity);
  const modeRef = useRef(energyMode);
  const mouseRef = useRef({ x: -9999, y: -9999, isHover: false });
  const reduced = useReducedMotion();
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    velocityRef.current = scrollVelocity;
  }, [scrollVelocity]);

  useEffect(() => {
    modeRef.current = energyMode;
  }, [energyMode]);

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COUNT = isMobile ? 25 : 60;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      if (W === 0 || H === 0) return;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(DPR, DPR);
    };
    resize();
    window.addEventListener("resize", resize);

    const getHuesForMode = (mode) => {
      switch (mode) {
        case "emerald":
          return [155, 175, 140];
        case "solar":
          return [35, 15, 48];
        case "overdrive":
          return [285, 330, 195];
        case "violet":
        default:
          return [275, 195, 225];
      }
    };

    const createParticle = (W, H) => {
      const types = ["dot", "line", "cross"];
      const type = types[Math.floor(Math.random() * types.length)];
      const hues = getHuesForMode(modeRef.current);
      const hue = hues[Math.floor(Math.random() * hues.length)];

      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.25 - 0.08,
        size: Math.random() * 1.5 + 0.6,
        opacity: Math.random() * 0.35 + 0.08,
        maxOpacity: Math.random() * 0.45 + 0.15,
        life: 0,
        maxLife: Math.random() * 350 + 200,
        type,
        hue,
      };
    };

    const W = canvas.offsetWidth || window.innerWidth;
    const H = canvas.offsetHeight || window.innerHeight;
    particlesRef.current = Array.from({ length: COUNT }, () => createParticle(W, H));

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isHover: true,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, isHover: false };
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    let lastTime = 0;
    const draw = (time) => {
      animRef.current = requestAnimationFrame(draw);
      lastTime = time;

      const currW = canvas.offsetWidth;
      const currH = canvas.offsetHeight;
      if (currW === 0 || currH === 0) return;

      ctx.clearRect(0, 0, currW, currH);

      const v = velocityRef.current;
      const isOverdrive = modeRef.current === "overdrive";
      const speedMult = isOverdrive ? 2.0 : 1.0;
      const velMult = (1 + Math.min(Math.abs(v) * 0.003, 3.5)) * speedMult;
      const hues = getHuesForMode(modeRef.current);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particlesRef.current.forEach((p, i) => {
        p.life++;

        // Interactive mouse repulsion physics
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;

        if (dist < maxDist && dist > 1) {
          const force = (1 - dist / maxDist) * 1.8;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        p.x += p.vx * velMult;
        p.y += p.vy * velMult;

        const lifeRatio = p.life / p.maxLife;
        let alpha = p.maxOpacity;
        if (lifeRatio < 0.2) {
          alpha = (lifeRatio / 0.2) * p.maxOpacity;
        } else if (lifeRatio > 0.8) {
          alpha = ((1 - lifeRatio) / 0.2) * p.maxOpacity;
        }

        if (p.life > p.maxLife || p.x < -20 || p.x > currW + 20 || p.y < -20 || p.y > currH + 20) {
          particlesRef.current[i] = createParticle(currW, currH);
          return;
        }

        // Color shift towards current mode
        const targetHue = hues[i % hues.length];
        p.hue += (targetHue - p.hue) * 0.05;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

        if (p.type === "dot") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 85%, 75%, 1)`;
          ctx.fill();
        } else if (p.type === "line") {
          ctx.strokeStyle = `hsla(${p.hue}, 85%, 75%, 1)`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          const trailLen = (15 + Math.min(Math.abs(v) * 0.04, 25)) * speedMult;
          ctx.lineTo(p.x + p.vx * trailLen, p.y + p.vy * trailLen);
          ctx.stroke();
        } else {
          ctx.strokeStyle = `hsla(${p.hue}, 80%, 72%, 1)`;
          ctx.lineWidth = 0.6;
          const s = p.size * 1.8;
          ctx.beginPath();
          ctx.moveTo(p.x - s, p.y);
          ctx.lineTo(p.x + s, p.y);
          ctx.moveTo(p.x, p.y - s);
          ctx.lineTo(p.x, p.y + s);
          ctx.stroke();
        }

        ctx.restore();
      });
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animRef.current);
      } else {
        animRef.current = requestAnimationFrame(draw);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    />
  );
}
