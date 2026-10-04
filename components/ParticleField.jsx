"use client";
import { useRef, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * ParticleField — lightweight canvas particle system.
 * - 25 (mobile) to 55 (desktop) particles
 * - Reads real-time scroll velocity via ref without restarting canvas loop
 * - requestAnimationFrame with visibility API pause
 * - High-DPI screen support with DPR clamp
 */
export default function ParticleField({ scrollVelocity = 0, isMobile = false }) {
  const canvasRef = useRef(null);
  const velocityRef = useRef(scrollVelocity);
  const reduced = useReducedMotion();
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  // Keep velocity ref synced without restarting loop
  useEffect(() => {
    velocityRef.current = scrollVelocity;
  }, [scrollVelocity]);

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COUNT = isMobile ? 25 : 55;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      if (W === 0 || H === 0) return;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform before scaling
      ctx.scale(DPR, DPR);
    };
    resize();
    window.addEventListener("resize", resize);

    const createParticle = (W, H) => {
      const types = ["dot", "line", "cross"];
      const type = types[Math.floor(Math.random() * types.length)];
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
        hue: Math.random() > 0.65 ? 275 : Math.random() > 0.45 ? 195 : 225,
      };
    };

    const W = canvas.offsetWidth || window.innerWidth;
    const H = canvas.offsetHeight || window.innerHeight;
    particlesRef.current = Array.from({ length: COUNT }, () => createParticle(W, H));

    let lastTime = 0;
    const draw = (time) => {
      animRef.current = requestAnimationFrame(draw);
      const dt = Math.min(time - lastTime, 32);
      lastTime = time;

      const currW = canvas.offsetWidth;
      const currH = canvas.offsetHeight;
      if (currW === 0 || currH === 0) return;

      ctx.clearRect(0, 0, currW, currH);

      // Dynamic velocity multiplier
      const v = velocityRef.current;
      const velMult = 1 + Math.min(Math.abs(v) * 0.003, 3.5);

      particlesRef.current.forEach((p, i) => {
        p.life++;
        p.x += p.vx * velMult;
        p.y += p.vy * velMult;

        const lifeRatio = p.life / p.maxLife;
        let alpha = p.maxOpacity;
        if (lifeRatio < 0.2) {
          alpha = (lifeRatio / 0.2) * p.maxOpacity;
        } else if (lifeRatio > 0.8) {
          alpha = ((1 - lifeRatio) / 0.2) * p.maxOpacity;
        }

        // Boundary wrap / recreate
        if (p.life > p.maxLife || p.x < -15 || p.x > currW + 15 || p.y < -15 || p.y > currH + 15) {
          particlesRef.current[i] = createParticle(currW, currH);
          return;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

        if (p.type === "dot") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 80%, 75%, 1)`;
          ctx.fill();
        } else if (p.type === "line") {
          ctx.strokeStyle = `hsla(${p.hue}, 80%, 75%, 1)`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          // Trail elongates subtly with scroll velocity
          const trailLen = 15 + Math.min(Math.abs(v) * 0.04, 25);
          ctx.lineTo(p.x + p.vx * trailLen, p.y + p.vy * trailLen);
          ctx.stroke();
        } else {
          // cross
          ctx.strokeStyle = `hsla(${p.hue}, 70%, 70%, 1)`;
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
