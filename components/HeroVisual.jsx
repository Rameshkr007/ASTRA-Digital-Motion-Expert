"use client";
import { useRef, useEffect } from "react";

/**
 * HeroVisual — the central futuristic CSS/SVG visual object.
 * Entirely original, no external assets.
 *
 * Composed of:
 * - Outer orbit rings
 * - Inner geometric core with glow
 * - Floating geometric shards
 * - Energy pulse rings
 * - Light trails
 * - Coordinate labels
 *
 * All layers have individual IDs for GSAP animation targeting.
 */
export default function HeroVisual() {
  return (
    <div
      className="astra-core"
      id="astra-visual"
      data-cursor="explore"
      aria-label="ASTRA energy core visualization"
      role="img"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {/* SVG-based core visual */}
      <svg
        id="visual-svg"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "560px",
          maxHeight: "560px",
          overflow: "visible",
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c5bf5" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#4a9eff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#050508" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="inner-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#c4b5fd" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#7c5bf5" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#050508" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="energy-ring-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0" />
            <stop offset="70%" stopColor="#00d4ff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
          </radialGradient>

          <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="soft-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="shard-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c5bf5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="shard-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a9eff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7c5bf5" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="trail-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c5bf5" stopOpacity="0" />
            <stop offset="50%" stopColor="#7c5bf5" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Background glow */}
        <circle id="bg-glow" cx="250" cy="250" r="220" fill="url(#core-glow)" />

        {/* Outer orbit ring — large */}
        <ellipse
          id="orbit-outer"
          cx="250" cy="250"
          rx="195" ry="55"
          stroke="rgba(124,91,245,0.12)"
          strokeWidth="1"
          transform="rotate(-15 250 250)"
        />

        {/* Orbit ring 2 */}
        <ellipse
          id="orbit-mid"
          cx="250" cy="250"
          rx="155" ry="40"
          stroke="rgba(74,158,255,0.15)"
          strokeWidth="0.8"
          transform="rotate(30 250 250)"
        />

        {/* Orbit ring 3 — tighter */}
        <ellipse
          id="orbit-inner-ring"
          cx="250" cy="250"
          rx="110" ry="28"
          stroke="rgba(0,212,255,0.1)"
          strokeWidth="0.6"
          transform="rotate(-45 250 250)"
        />

        {/* Energy pulse rings */}
        <circle id="pulse-1" cx="250" cy="250" r="140" stroke="rgba(124,91,245,0.06)" strokeWidth="1" fill="none" />
        <circle id="pulse-2" cx="250" cy="250" r="110" stroke="rgba(74,158,255,0.08)" strokeWidth="1" fill="none" />
        <circle id="pulse-3" cx="250" cy="250" r="80" stroke="rgba(0,212,255,0.1)" strokeWidth="1" fill="none" />

        {/* Light trail arcs */}
        <path
          id="trail-1"
          d="M 100 200 Q 250 80 400 200"
          stroke="url(#trail-grad)"
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
        <path
          id="trail-2"
          d="M 80 310 Q 250 440 420 310"
          stroke="url(#trail-grad)"
          strokeWidth="0.6"
          fill="none"
          opacity="0.3"
        />

        {/* Floating geometric shards — CORE layer */}
        <g id="layer-core">
          {/* Main hexagonal frame */}
          <polygon
            id="hex-outer"
            points="250,120 340,175 340,285 250,340 160,285 160,175"
            stroke="rgba(124,91,245,0.25)"
            strokeWidth="1.5"
            fill="rgba(124,91,245,0.03)"
          />

          {/* Inner hex */}
          <polygon
            id="hex-inner"
            points="250,155 315,193 315,267 250,305 185,267 185,193"
            stroke="rgba(74,158,255,0.2)"
            strokeWidth="1"
            fill="rgba(74,158,255,0.03)"
          />

          {/* Diamond core frame */}
          <polygon
            id="diamond-frame"
            points="250,185 280,230 250,275 220,230"
            stroke="rgba(0,212,255,0.3)"
            strokeWidth="1.2"
            fill="rgba(0,212,255,0.04)"
          />
        </g>

        {/* FRAME layer — outer structural elements */}
        <g id="layer-frame">
          {/* Corner connector lines */}
          <line id="line-tl" x1="160" y1="175" x2="120" y2="135" stroke="rgba(124,91,245,0.2)" strokeWidth="0.8" />
          <line id="line-tr" x1="340" y1="175" x2="380" y2="135" stroke="rgba(124,91,245,0.2)" strokeWidth="0.8" />
          <line id="line-bl" x1="160" y1="285" x2="120" y2="325" stroke="rgba(74,158,255,0.2)" strokeWidth="0.8" />
          <line id="line-br" x1="340" y1="285" x2="380" y2="325" stroke="rgba(74,158,255,0.2)" strokeWidth="0.8" />

          {/* Floating corner accents */}
          <rect id="acc-tl" x="108" y="123" width="14" height="14" stroke="rgba(124,91,245,0.35)" strokeWidth="1" fill="none" transform="rotate(45 115 130)" />
          <rect id="acc-tr" x="368" y="123" width="14" height="14" stroke="rgba(124,91,245,0.35)" strokeWidth="1" fill="none" transform="rotate(45 375 130)" />
          <rect id="acc-bl" x="108" y="313" width="14" height="14" stroke="rgba(74,158,255,0.35)" strokeWidth="1" fill="none" transform="rotate(45 115 320)" />
          <rect id="acc-br" x="368" y="313" width="14" height="14" stroke="rgba(74,158,255,0.35)" strokeWidth="1" fill="none" transform="rotate(45 375 320)" />
        </g>

        {/* ENERGY layer — glowing shard fragments */}
        <g id="layer-energy">
          {/* Shard 1 — top right */}
          <polygon
            id="shard-1"
            points="340,130 365,155 345,175 320,150"
            fill="url(#shard-grad-1)"
            opacity="0.7"
            filter="url(#soft-glow)"
          />

          {/* Shard 2 — bottom left */}
          <polygon
            id="shard-2"
            points="160,350 135,325 155,305 180,330"
            fill="url(#shard-grad-2)"
            opacity="0.6"
            filter="url(#soft-glow)"
          />

          {/* Shard 3 — top left */}
          <polygon
            id="shard-3"
            points="160,130 135,155 155,175 180,150"
            fill="url(#shard-grad-1)"
            opacity="0.5"
            filter="url(#soft-glow)"
          />

          {/* Shard 4 — right side */}
          <polygon
            id="shard-4"
            points="390,230 415,250 390,270 370,250"
            fill="url(#shard-grad-2)"
            opacity="0.5"
            filter="url(#soft-glow)"
          />
        </g>

        {/* SIGNAL layer — data connection lines */}
        <g id="layer-signal">
          <line id="sig-1" x1="250" y1="100" x2="250" y2="155" stroke="rgba(124,91,245,0.3)" strokeWidth="0.8" strokeDasharray="3,4" />
          <line id="sig-2" x1="250" y1="345" x2="250" y2="400" stroke="rgba(74,158,255,0.3)" strokeWidth="0.8" strokeDasharray="3,4" />
          <line id="sig-3" x1="100" y1="250" x2="155" y2="250" stroke="rgba(0,212,255,0.25)" strokeWidth="0.8" strokeDasharray="3,4" />
          <line id="sig-4" x1="345" y1="250" x2="400" y2="250" stroke="rgba(0,212,255,0.25)" strokeWidth="0.8" strokeDasharray="3,4" />

          {/* Terminal dots */}
          <circle cx="250" cy="100" r="2" fill="rgba(124,91,245,0.6)" />
          <circle cx="250" cy="400" r="2" fill="rgba(74,158,255,0.6)" />
          <circle cx="100" cy="250" r="2" fill="rgba(0,212,255,0.5)" />
          <circle cx="400" cy="250" r="2" fill="rgba(0,212,255,0.5)" />
        </g>

        {/* Central energy core */}
        <circle
          id="core-outer"
          cx="250" cy="250" r="42"
          fill="rgba(124,91,245,0.12)"
          stroke="rgba(124,91,245,0.3)"
          strokeWidth="1"
          filter="url(#glow-filter)"
        />
        <circle
          id="core-mid"
          cx="250" cy="250" r="28"
          fill="rgba(124,91,245,0.2)"
          stroke="rgba(200,180,255,0.4)"
          strokeWidth="1.2"
        />
        <circle
          id="core-inner"
          cx="250" cy="250" r="14"
          fill="url(#inner-core)"
          filter="url(#glow-filter)"
        />
        {/* Core bright center */}
        <circle
          id="core-bright"
          cx="250" cy="250" r="5"
          fill="rgba(255,255,255,0.95)"
          filter="url(#glow-filter)"
        />

        {/* Orbit node indicators */}
        <circle id="orbit-node-1" cx="445" cy="250" r="3" fill="rgba(124,91,245,0.5)" />
        <circle id="orbit-node-2" cx="55" cy="250" r="3" fill="rgba(74,158,255,0.5)" />
        <circle id="orbit-node-3" cx="250" cy="55" r="3" fill="rgba(0,212,255,0.4)" />
        <circle id="orbit-node-4" cx="250" cy="445" r="3" fill="rgba(0,212,255,0.4)" />
      </svg>

      {/* Floating coordinate labels */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: "5%",
          display: "flex",
          flexDirection: "column",
          gap: "3px",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <span className="font-mono-custom coord-label">X 034</span>
        <span className="font-mono-custom coord-label">Y 092</span>
        <span className="font-mono-custom coord-label">Z 018</span>
      </div>

      {/* Energy state indicator */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "5%",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <div className="status-dot" style={{ width: 4, height: 4 }} />
        <span className="font-mono-custom coord-label">CORE ACTIVE</span>
      </div>
    </div>
  );
}
