"use client";
import { useState } from "react";
import { soundEngine } from "@/utils/audio";

/**
 * Navbar — futuristic minimal navigation bar for ASTRA.
 * Features:
 * - ASTRA branding with system revision
 * - Interactive links with smooth target scrolling
 * - Web Audio Synthesizer toggle (Mute / Unmute ambient soundscapes)
 * - Online pulse telemetry indicator
 */
export default function Navbar() {
  const [soundActive, setSoundActive] = useState(false);

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

  return (
    <header
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ opacity: 0 }}
      role="banner"
    >
      <nav
        className="flex items-center justify-between px-6 md:px-14 py-5 bg-gradient-to-b from-[#050508]/90 via-[#050508]/60 to-transparent backdrop-blur-sm"
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
        <div className="flex items-center gap-5">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => soundEngine.playHover()}
            data-cursor="open"
            className="flex items-center gap-2 px-2.5 py-1 rounded border border-white/10 bg-white/5 hover:border-violet-500/40 transition-colors text-[10px] font-mono-custom text-white/70"
            title="Toggle procedural ambient soundscape"
            aria-label={soundActive ? "Mute audio" : "Unmute audio"}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                soundActive ? "bg-cyan-400 shadow-[0_0_8px_#00d4ff]" : "bg-white/30"
              }`}
            />
            <span className="hidden sm:inline">
              AUDIO: {soundActive ? "ON" : "OFF"}
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
