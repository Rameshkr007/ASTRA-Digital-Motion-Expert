"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * HeroVisual — Master Futuristic Central Visual for ASTRA.
 * Dynamic Energy Modes: VIOLET, EMERALD, SOLAR, OVERDRIVE.
 * Click-to-discharge kinetic shockwaves.
 */
export default function HeroVisual({ energyMode = "violet", onCoreClick }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const reduced = useReducedMotion();

  // Color schemes for energy modes
  const modeThemes = {
    violet: {
      primary: "#00d4ff",
      secondary: "#7c5bf5",
      accent: "#c084fc",
      coreCenter: "#ffffff",
      glow: "rgba(124, 91, 245, 0.35)",
    },
    emerald: {
      primary: "#34d399",
      secondary: "#059669",
      accent: "#6ee7b7",
      coreCenter: "#ffffff",
      glow: "rgba(16, 185, 129, 0.4)",
    },
    solar: {
      primary: "#fbbf24",
      secondary: "#ea580c",
      accent: "#fde047",
      coreCenter: "#ffffff",
      glow: "rgba(245, 158, 11, 0.45)",
    },
    overdrive: {
      primary: "#f43f5e",
      secondary: "#8b5cf6",
      accent: "#38bdf8",
      coreCenter: "#ffffff",
      glow: "rgba(244, 63, 94, 0.55)",
    },
  };

  const currentTheme = modeThemes[energyMode] || modeThemes.violet;

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

  // Click pulse animation
  const handleInteraction = () => {
    if (onCoreClick) onCoreClick();

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.94 },
        { scale: 1, duration: 0.5, ease: "elastic.out(1.2, 0.4)" }
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className="astra-core relative w-full h-full flex items-center justify-center cursor-pointer select-none"
      style={{ perspective: "1200px" }}
      data-cursor="explore"
      onClick={handleInteraction}
      aria-label="ASTRA Interactive Digital Core Visual — Click to discharge shockwave"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleInteraction();
        }
      }}
    >
      <div
        ref={cardRef}
        id="astra-visual"
        className="relative w-full h-full flex items-center justify-center transition-shadow duration-500"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
          filter: `drop-shadow(0 0 55px ${currentTheme.glow})`,
        }}
      >
        {/* Main Vector Hologram SVG */}
        <svg
          id="visual-svg"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-[560px] max-h-[560px] overflow-visible"
          aria-hidden="true"
        >
          <defs>
            {/* Atmospheric Core Plasma Gradient */}
            <radialGradient id="plasma-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={currentTheme.coreCenter} stopOpacity="1" />
              <stop offset="25%" stopColor={currentTheme.primary} stopOpacity="0.9" />
              <stop offset="55%" stopColor={currentTheme.secondary} stopOpacity="0.8" />
              <stop offset="85%" stopColor="#05050a" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#050508" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="ambient-aura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={currentTheme.secondary} stopOpacity="0.5" />
              <stop offset="45%" stopColor={currentTheme.primary} stopOpacity="0.25" />
              <stop offset="80%" stopColor="#050508" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="shard-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentTheme.primary} stopOpacity="0.95" />
              <stop offset="100%" stopColor={currentTheme.secondary} stopOpacity="0.35" />
            </linearGradient>

            <linearGradient id="shard-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={currentTheme.accent} stopOpacity="0.9" />
              <stop offset="100%" stopColor={currentTheme.secondary} stopOpacity="0.3" />
            </linearGradient>

            <linearGradient id="telemetry-arc" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={currentTheme.secondary} stopOpacity="0" />
              <stop offset="50%" stopColor={currentTheme.primary} stopOpacity="0.85" />
              <stop offset="100%" stopColor={currentTheme.secondary} stopOpacity="0" />
            </linearGradient>

            <filter id="neon-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="hyper-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="14" result="blur2" />
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
              stroke={currentTheme.secondary}
              strokeWidth="0.8"
              opacity="0.3"
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
              stroke={currentTheme.secondary}
              strokeWidth="1.2"
              opacity="0.35"
              transform="rotate(-18 300 300)"
            />

            {/* Counter-Tilted Secondary Orbit Ring */}
            <ellipse
              id="orbit-mid"
              cx="300"
              cy="300"
              rx="185"
              ry="50"
              stroke={currentTheme.primary}
              strokeWidth="1"
              opacity="0.3"
              transform="rotate(32 300 300)"
            />

            {/* Outer Structural Beveled Hexagon Shield */}
            <polygon
              id="hex-outer"
              points="300,140 435,218 435,382 300,460 165,382 165,218"
              stroke={currentTheme.secondary}
              strokeWidth="1.5"
              opacity="0.4"
              fill="rgba(124, 91, 245, 0.02)"
            />

            {/* Corner Structural Brackets */}
            <path d="M 165 235 L 165 218 L 182 218" stroke={currentTheme.primary} strokeWidth="1.5" fill="none" opacity="0.8" />
            <path d="M 435 235 L 435 218 L 418 218" stroke={currentTheme.primary} strokeWidth="1.5" fill="none" opacity="0.8" />
            <path d="M 165 365 L 165 382 L 182 382" stroke={currentTheme.secondary} strokeWidth="1.5" fill="none" opacity="0.8" />
            <path d="M 435 365 L 435 382 L 418 382" stroke={currentTheme.secondary} strokeWidth="1.5" fill="none" opacity="0.8" />
          </g>

          {/* ============================================================
              LAYER: SIGNAL (Laser Alignment, Crosshairs, Telemetry Arrays)
              ============================================================ */}
          <g id="layer-signal" className="transition-transform duration-75">
            {/* Axial Telemetry Guides */}
            <line id="sig-1" x1="300" y1="110" x2="300" y2="185" stroke={currentTheme.primary} strokeWidth="1" strokeDasharray="3 4" opacity="0.5" />
            <line id="sig-2" x1="300" y1="415" x2="300" y2="490" stroke={currentTheme.primary} strokeWidth="1" strokeDasharray="3 4" opacity="0.5" />
            <line id="sig-3" x1="110" y1="300" x2="185" y2="300" stroke={currentTheme.secondary} strokeWidth="1" strokeDasharray="3 4" opacity="0.5" />
            <line id="sig-4" x1="415" y1="300" x2="490" y2="300" stroke={currentTheme.secondary} strokeWidth="1" strokeDasharray="3 4" opacity="0.5" />

            {/* Glowing Sensor Nodes */}
            <circle cx="300" cy="110" r="3.5" fill={currentTheme.primary} filter="url(#neon-glow)" />
            <circle cx="300" cy="490" r="3.5" fill={currentTheme.primary} filter="url(#neon-glow)" />
            <circle cx="110" cy="300" r="3.5" fill={currentTheme.secondary} filter="url(#neon-glow)" />
            <circle cx="490" cy="300" r="3.5" fill={currentTheme.secondary} filter="url(#neon-glow)" />

            {/* Dynamic Telemetry Arc Rays */}
            <path
              d="M 120 240 Q 300 90 480 240"
              stroke="url(#telemetry-arc)"
              strokeWidth="1.2"
              fill="none"
              opacity="0.65"
            />
            <path
              d="M 100 370 Q 300 520 500 370"
              stroke="url(#telemetry-arc)"
              strokeWidth="0.9"
              fill="none"
              opacity="0.45"
            />
          </g>

          {/* ============================================================
              LAYER: ENERGY (Floating Crystalline Shards & Glowing Fragments)
              ============================================================ */}
          <g id="layer-energy" className="transition-transform duration-75">
            <polygon
              id="shard-1"
              points="410,150 445,185 420,210 385,175"
              fill="url(#shard-grad-1)"
              filter="url(#neon-glow)"
              opacity="0.9"
            />
            <polygon
              id="shard-2"
              points="190,440 155,405 180,380 215,415"
              fill="url(#shard-grad-2)"
              filter="url(#neon-glow)"
              opacity="0.9"
            />
            <polygon
              id="shard-3"
              points="190,150 155,185 180,210 215,175"
              fill="url(#shard-grad-1)"
              filter="url(#neon-glow)"
              opacity="0.8"
            />
            <polygon
              id="shard-4"
              points="455,340 485,370 455,395 425,365"
              fill="url(#shard-grad-2)"
              filter="url(#neon-glow)"
              opacity="0.85"
            />
          </g>

          {/* ============================================================
              LAYER: CORE (The Quantum Reactor, Pulsing Diamond Matrix)
              ============================================================ */}
          <g id="layer-core" className="transition-transform duration-75">
            <polygon
              id="hex-inner"
              points="300,185 380,230 380,370 300,415 220,370 220,230"
              stroke={currentTheme.primary}
              strokeWidth="1.2"
              opacity="0.5"
              fill="rgba(0, 212, 255, 0.03)"
            />

            <polygon
              id="diamond-frame"
              points="300,215 345,300 300,385 255,300"
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth="1.5"
              fill="rgba(124, 91, 245, 0.08)"
            />

            <circle
              id="core-outer"
              cx="300"
              cy="300"
              r="58"
              fill={currentTheme.secondary}
              opacity="0.2"
              stroke={currentTheme.secondary}
              strokeWidth="1.5"
              filter="url(#neon-glow)"
            />

            <circle
              id="core-mid"
              cx="300"
              cy="300"
              r="38"
              fill={currentTheme.primary}
              opacity="0.35"
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            <circle
              id="core-inner"
              cx="300"
              cy="300"
              r="22"
              fill="url(#plasma-core)"
              filter="url(#hyper-glow)"
            />

            <circle
              id="core-bright"
              cx="300"
              cy="300"
              r="8"
              fill="#ffffff"
              filter="url(#neon-glow)"
            />
          </g>

          {/* Sub-Pixel Orbital Node Satellites */}
          <circle id="orbit-node-1" cx="530" cy="300" r="3.5" fill={currentTheme.primary} filter="url(#neon-glow)" />
          <circle id="orbit-node-2" cx="70" cy="300" r="3.5" fill={currentTheme.secondary} filter="url(#neon-glow)" />
          <circle id="orbit-node-3" cx="300" cy="70" r="3.5" fill={currentTheme.primary} filter="url(#neon-glow)" />
          <circle id="orbit-node-4" cx="300" cy="530" r="3.5" fill={currentTheme.secondary} filter="url(#neon-glow)" />
        </svg>

        {/* HUD Interactive Callout Badge */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md opacity-80 hover:opacity-100 transition-opacity"
          aria-hidden="true"
        >
          <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: currentTheme.primary }} />
          <span className="font-mono-custom text-[8px] tracking-[0.2em] text-white/70 uppercase">
            CLICK CORE TO DISCHARGE SHOCKWAVE
          </span>
        </div>
      </div>
    </div>
  );
}
