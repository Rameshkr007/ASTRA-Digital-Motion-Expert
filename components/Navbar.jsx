"use client";
import { useState, useEffect, useRef } from "react";
import { soundEngine } from "@/utils/audio";

/**
 * Navbar — futuristic minimal navigation bar for ASTRA.
 * Features:
 * - ASTRA branding with system revision
 * - Interactive links with smooth target scrolling
 * - Web Audio Synthesizer toggle with dynamic visualizer EQ bars
 * - Online pulse telemetry indicator
 */
export default function Navbar() {
  const [soundActive, setSoundActive] = useState(false);
  const barsRef = useRef([]);

  const toggleSound = () => {
    const active = soundEngine.toggle();
    setSoundActive(active);
  };

  const navLinks = [
    { label: "EXPERIENCE", href: "#experience" },
    { label: "SYSTEM", href: "#system" },
    { label: "ABOUT", href: "#about" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    soundEngine.playClick();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Real-time mini audio visualizer loop
  useEffect(() => {
    let animId;
    const updateEq = () => {
      if (soundActive) {
        const spectrum = soundEngine.getSpectrumData();
        if (spectrum && barsRef.current.length > 0) {
          barsRef.current.forEach((bar, idx) => {
            if (bar) {
              const val = spectrum[idx * 3] || 30;
              const heightPct = Math.min(100, Math.max(15, (val / 255) * 100));
              bar.style.height = `${heightPct}%`;
            }
          });
        }
      }
      animId = requestAnimationFrame(updateEq);
    };

    animId = requestAnimationFrame(updateEq);
    return () => cancelAnimationFrame(animId);
  }, [soundActive]);

  return (
    <header
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ opacity: 0 }}
      role="banner"
    >
      <nav
        className="flex items-center justify-between px-6 md:px-14 py-5 bg-gradient-to-b from-[#030305]/95 via-[#030305]/70 to-transparent backdrop-blur-sm"
        aria-label="Primary navigation"
      >
        {/* Brand / Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            soundEngine.playClick();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onMouseEnter={() => soundEngine.playHover()}
          className="flex flex-col items-start gap-0.5 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-400"
          data-cursor="open"
        >
          <span
            className="font-display text-sm tracking-[0.45em] text-white group-hover:text-cyan-400 transition-colors"
          >
            ASTRA
          </span>
          <span
            className="font-mono-custom text-[8px] tracking-[0.25em] text-white/40"
          >
            / 01 // DIGITAL MOTION
          </span>
        </a>

        {/* Center Nav Links */}
        <ul className="hidden md:flex items-center gap-10" role="list">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={() => soundEngine.playHover()}
                className="nav-link font-mono-custom text-[11px] tracking-[0.2em] text-white/60 hover:text-white transition-colors"
                aria-label={link.label}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Status & Audio Controls */}
        <div className="flex items-center gap-4">
          {/* Audio Synthesizer Toggle with Real-Time EQ Visualizer */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => soundEngine.playHover()}
            data-cursor="open"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:border-violet-500/40 hover:bg-white/10 transition-all text-[10px] font-mono-custom text-white/70"
            title="Toggle procedural ambient soundscape"
            aria-label={soundActive ? "Mute audio" : "Unmute audio"}
          >
            {/* 4-Bar Mini Equalizer */}
            <div className="flex items-end gap-0.5 h-3 w-3.5" aria-hidden="true">
              {[0, 1, 2, 3].map((idx) => (
                <span
                  key={idx}
                  ref={(el) => (barsRef.current[idx] = el)}
                  className={`w-[2px] rounded-full transition-all duration-75 ${
                    soundActive ? "bg-cyan-400" : "bg-white/30 h-1"
                  }`}
                  style={{ height: soundActive ? "40%" : "20%" }}
                />
              ))}
            </div>

            <span className="hidden sm:inline">
              AUDIO: {soundActive ? "ONLINE" : "MUTED"}
            </span>
          </button>

          {/* System Online Status Indicator */}
          <div
            className="flex items-center gap-2"
            aria-label="System status: online"
          >
            <div className="status-dot" aria-hidden="true" />
            <span className="hidden sm:inline font-mono-custom text-[10px] tracking-[0.2em] text-white/60">
              SYSTEM ONLINE
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}
