"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * HeroVisual — Master Futuristic Central Visual for ASTRA.
 * 100% Original Vector & CSS Composition.
 *
 * Features:
 * - 3D Perspective Mouse Gyro-Tilt (holographic physical depth)
 * - 4 Break-Apart Conceptual Layers: CORE, FRAME, ENERGY, SIGNAL
 * - Concentric Gyroscopic Rings with compass telemetry markings
 * - Quantum Plasma Reactor with multi-stop radial glow filters
 * - Sub-pixel orbital node tracking
 * - High-DPI crisp vector rendering
 */
export default function HeroVisual() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const reduced = useReducedMotion();

  // Holographic 3D mouse parallax tilt
  useEffect(() => {
    if (reduced || typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    const xTo = gsap.quickTo(card, "rotateY", { duration: 0.5, ease: "power2.out" });
    const yTo = gsap.quickTo(card, "rotateX", { duration: 0.5, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);

      // Subtle 3D tilt: max 12 deg
      xTo(dx * 12);
      yTo(-dy * 12);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      className="astra-core relative w-full h-full flex items-center justify-center"
      style={{ perspective: "1200px" }}
      data-cursor="explore"
      aria-label="ASTRA Interactive Digital Core Visual"
      role="img"
    >
      <div
        ref={cardRef}
        id="astra-visual"
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
      >
        {/* Main Vector Hologram SVG */}
        <svg
          id="visual-svg"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-[560px] max-h-[560px] overflow-visible drop-shadow-[0_0_50px_rgba(124,91,245,0.25)]"
          aria-hidden="true"
        >
          <defs>
            {/* Atmospheric Core Plasma Gradient */}
            <radialGradient id="plasma-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="25%" stopColor="#00d4ff" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#7c5bf5" stopOpacity="0.75" />
              <stop offset="85%" stopColor="#1e1035" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#050508" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="ambient-aura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7c5bf5" stopOpacity="0.45" />
              <stop offset="45%" stopColor="#00d4ff" stopOpacity="0.2" />
              <stop offset="80%" stopColor="#050508" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="shard-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#7c5bf5" stopOpacity="0.35" />
            </linearGradient>

            <linearGradient id="shard-violet" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>

            <linearGradient id="telemetry-arc" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c5bf5" stopOpacity="0" />
              <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7c5bf5" stopOpacity="0" />
            </linearGradient>

            {/* High-Performance SVG Glow Filter */}
            <filter id="neon-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="hyper-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="12" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Deep Space Ambient Glow Aura */}
          <circle id="bg-glow" cx="300" cy="300" r="270" fill="url(#ambient-aura)" />

          {/* ============================================================
              LAYER: FRAME (Gimbals, Compass Indices, Gyro-Rings)
              ============================================================ */}
          <g id="layer-frame" className="transition-transform duration-75">
            {/* Outer Dial Compass Ring (300px radius) */}
            <circle
              cx="300"
              cy="300"
              r="240"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
              strokeDasharray="2 12"
            />
            <circle
              cx="300"
              cy="300"
              r="234"
              stroke="rgba(124, 91, 245, 0.2)"
              strokeWidth="0.8"
            />

            {/* Cardinal Degree Indices (000, 090, 180, 270) */}
            <text x="300" y="52" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" textAnchor="middle" letterSpacing="2">000°</text>
            <text x="548" y="303" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" textAnchor="start" letterSpacing="2">090°</text>
            <text x="300" y="556" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" textAnchor="middle" letterSpacing="2">180°</text>
            <text x="52" y="303" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" textAnchor="end" letterSpacing="2">270°</text>

            {/* Elliptical Primary Orbit Ring */}
            <ellipse
              id="orbit-outer"
              cx="300"
              cy="300"
              rx="230"
              ry="70"
              stroke="rgba(124, 91, 245, 0.25)"
              strokeWidth="1.2"
              transform="rotate(-18 300 300)"
            />

            {/* Counter-Tilted Secondary Orbit Ring */}
            <ellipse
              id="orbit-mid"
              cx="300"
              cy="300"
              rx="185"
              ry="50"
              stroke="rgba(0, 212, 255, 0.2)"
              strokeWidth="1"
              transform="rotate(32 300 300)"
            />

            {/* Outer Structural Beveled Hexagon Shield */}
            <polygon
              id="hex-outer"
              points="300,140 435,218 435,382 300,460 165,382 165,218"
              stroke="rgba(124, 91, 245, 0.3)"
              strokeWidth="1.5"
              fill="rgba(124, 91, 245, 0.02)"
            />

            {/* Corner Structural Brackets */}
            <path d="M 165 235 L 165 218 L 182 218" stroke="#00d4ff" strokeWidth="1.5" fill="none" opacity="0.8" />
            <path d="M 435 235 L 435 218 L 418 218" stroke="#00d4ff" strokeWidth="1.5" fill="none" opacity="0.8" />
            <path d="M 165 365 L 165 382 L 182 382" stroke="#7c5bf5" strokeWidth="1.5" fill="none" opacity="0.8" />
            <path d="M 435 365 L 435 382 L 418 382" stroke="#7c5bf5" strokeWidth="1.5" fill="none" opacity="0.8" />
          </g>

          {/* ============================================================
              LAYER: SIGNAL (Laser Alignment, Crosshairs, Telemetry Arrays)
              ============================================================ */}
          <g id="layer-signal" className="transition-transform duration-75">
            {/* Axial Telemetry Guides */}
            <line id="sig-1" x1="300" y1="110" x2="300" y2="185" stroke="rgba(0, 212, 255, 0.4)" strokeWidth="1" strokeDasharray="3 4" />
            <line id="sig-2" x1="300" y1="415" x2="300" y2="490" stroke="rgba(0, 212, 255, 0.4)" strokeWidth="1" strokeDasharray="3 4" />
            <line id="sig-3" x1="110" y1="300" x2="185" y2="300" stroke="rgba(124, 91, 245, 0.4)" strokeWidth="1" strokeDasharray="3 4" />
            <line id="sig-4" x1="415" y1="300" x2="490" y2="300" stroke="rgba(124, 91, 245, 0.4)" strokeWidth="1" strokeDasharray="3 4" />

            {/* Glowing Sensor Nodes */}
            <circle cx="300" cy="110" r="3" fill="#00d4ff" filter="url(#neon-glow)" />
            <circle cx="300" cy="490" r="3" fill="#00d4ff" filter="url(#neon-glow)" />
            <circle cx="110" cy="300" r="3" fill="#7c5bf5" filter="url(#neon-glow)" />
            <circle cx="490" cy="300" r="3" fill="#7c5bf5" filter="url(#neon-glow)" />

            {/* Dynamic Telemetry Arc Rays */}
            <path
              d="M 120 240 Q 300 90 480 240"
              stroke="url(#telemetry-arc)"
              strokeWidth="1.2"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M 100 370 Q 300 520 500 370"
              stroke="url(#telemetry-arc)"
              strokeWidth="0.9"
              fill="none"
              opacity="0.4"
            />
          </g>

          {/* ============================================================
              LAYER: ENERGY (Floating Crystalline Shards & Glowing Fragments)
              ============================================================ */}
          <g id="layer-energy" className="transition-transform duration-75">
            {/* Shard 1 — Top Right High-Energy Prism */}
            <polygon
              id="shard-1"
              points="410,150 445,185 420,210 385,175"
              fill="url(#shard-cyan)"
              filter="url(#neon-glow)"
              opacity="0.85"
            />
            {/* Shard 2 — Bottom Left Resonant Crystal */}
            <polygon
              id="shard-2"
              points="190,440 155,405 180,380 215,415"
              fill="url(#shard-violet)"
              filter="url(#neon-glow)"
              opacity="0.85"
            />
            {/* Shard 3 — Top Left Auxiliary Node */}
            <polygon
              id="shard-3"
              points="190,150 155,185 180,210 215,175"
              fill="url(#shard-cyan)"
              filter="url(#neon-glow)"
              opacity="0.75"
            />
            {/* Shard 4 — Bottom Right Horizon Shard */}
            <polygon
              id="shard-4"
              points="455,340 485,370 455,395 425,365"
              fill="url(#shard-violet)"
              filter="url(#neon-glow)"
              opacity="0.8"
            />
          </g>

          {/* ============================================================
              LAYER: CORE (The Quantum Reactor, Pulsing Diamond Matrix)
              ============================================================ */}
          <g id="layer-core" className="transition-transform duration-75">
            {/* Inner Precision Hexagonal Frame */}
            <polygon
              id="hex-inner"
              points="300,185 380,230 380,370 300,415 220,370 220,230"
              stroke="rgba(0, 212, 255, 0.4)"
              strokeWidth="1.2"
              fill="rgba(0, 212, 255, 0.03)"
            />

            {/* Central Diamond Crystal Lattice */}
            <polygon
              id="diamond-frame"
              points="300,215 345,300 300,385 255,300"
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth="1.4"
              fill="rgba(124, 91, 245, 0.08)"
            />

            {/* Outer Plasma Containment Halo */}
            <circle
              id="core-outer"
              cx="300"
              cy="300"
              r="58"
              fill="rgba(124, 91, 245, 0.15)"
              stroke="rgba(124, 91, 245, 0.4)"
              strokeWidth="1.5"
              filter="url(#neon-glow)"
            />

            {/* Mid Resonant Chamber */}
            <circle
              id="core-mid"
              cx="300"
              cy="300"
              r="38"
              fill="rgba(0, 212, 255, 0.25)"
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth="1.4"
            />

            {/* Inner Quantum Reactor */}
            <circle
              id="core-inner"
              cx="300"
              cy="300"
              r="20"
              fill="url(#plasma-core)"
              filter="url(#hyper-glow)"
            />

            {/* Center Specular Singularity Spark */}
            <circle
              id="core-bright"
              cx="300"
              cy="300"
              r="7"
              fill="#ffffff"
              filter="url(#neon-glow)"
            />
          </g>

          {/* Sub-Pixel Orbital Node Satellites */}
          <circle id="orbit-node-1" cx="530" cy="300" r="3.5" fill="#00d4ff" filter="url(#neon-glow)" />
          <circle id="orbit-node-2" cx="70" cy="300" r="3.5" fill="#7c5bf5" filter="url(#neon-glow)" />
          <circle id="orbit-node-3" cx="300" cy="70" r="3.5" fill="#00d4ff" filter="url(#neon-glow)" />
          <circle id="orbit-node-4" cx="300" cy="530" r="3.5" fill="#7c5bf5" filter="url(#neon-glow)" />
        </svg>

        {/* Real-time Subsystem Vector Coordinate HUD Overlay */}
        <div
          className="absolute bottom-6 left-6 flex flex-col gap-1 pointer-events-none select-none"
          aria-hidden="true"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono-custom text-[9px] tracking-widest text-emerald-400 font-bold">
              SYS-01 // STABLE
            </span>
          </div>
          <span className="font-mono-custom text-[8px] tracking-widest text-white/40">
            X 034.82 // Y 092.14 // Z 018.90
          </span>
          <span className="font-mono-custom text-[8px] tracking-widest text-white/30">
            ROT: QUATERNION // FLUX: 1.4 GHz
          </span>
        </div>

        {/* Top-Right Core Status Callout */}
        <div
          className="absolute top-6 right-6 flex items-center gap-2 px-2.5 py-1 rounded bg-black/40 border border-white/10 backdrop-blur-md pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00d4ff]" />
          <span className="font-mono-custom text-[8px] tracking-[0.2em] text-cyan-300 font-semibold uppercase">
            ENERGY HARMONIC 99.8%
          </span>
        </div>
      </div>
    </div>
  );
}
