"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

/**
 * Loader — cinematic loading sequence.
 * Shows ASTRA logo, initializing text, 0→100% progress bar.
 * Transitions out smoothly then removes itself from DOM flow.
 * If assets are pre-cached, loading completes quickly.
 */
export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const barRef = useRef(null);
  const pctRef = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const bar = barRef.current;
    const pct = pctRef.current;
    if (!loader || !bar || !pct) return;

    // Check for prefers-reduced-motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      loader.style.display = "none";
      onComplete?.();
      return;
    }

    // Intro reveal
    const tl = gsap.timeline();

    tl.from("#loader-logo", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
    })
    .from("#loader-status", {
      opacity: 0,
      duration: 0.4,
    }, "-=0.2")
    .from(bar.parentElement, {
      opacity: 0,
      duration: 0.3,
    }, "-=0.1");

    // Progress bar animation
    const startTime = Date.now();
    const TOTAL_MS = 1800; // Total load time

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / TOTAL_MS, 1);
      const pctNum = Math.round(progress * 100);

      bar.style.width = `${pctNum}%`;
      pct.textContent = pctNum + "%";

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Exit sequence
        gsap.to(loader, {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: "power2.in",
          onComplete: () => {
            loader.style.display = "none";
            onComplete?.();
          },
        });
      }
    };

    // Small delay before starting
    setTimeout(() => requestAnimationFrame(tick), 200);

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9000] flex flex-col items-center justify-center gap-8"
      style={{ background: "var(--bg-primary)" }}
      aria-label="Loading ASTRA experience"
      aria-live="polite"
    >
      {/* Grid bg */}
      <div className="grid-bg absolute inset-0 opacity-20" aria-hidden="true" />

      {/* Logo */}
      <div id="loader-logo" className="flex flex-col items-center gap-3">
        <span
          className="font-display"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            letterSpacing: "0.4em",
            background: "linear-gradient(135deg, #f0f0f8 0%, rgba(240,240,248,0.5) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          ASTRA
        </span>
        <div
          style={{
            width: "60%",
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--border-bright), transparent)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Status text */}
      <div id="loader-status" className="flex flex-col items-center gap-4">
        <span
          className="font-mono-custom"
          style={{ fontSize: "0.55rem", letterSpacing: "0.3em", color: "var(--text-muted)" }}
        >
          INITIALIZING EXPERIENCE...
        </span>

        {/* Progress bar */}
        <div className="flex flex-col items-center gap-2">
          <div className="loader-progress-track">
            <div ref={barRef} className="loader-progress-bar" style={{ width: "0%" }} />
          </div>
          <span
            ref={pctRef}
            className="font-mono-custom"
            style={{ fontSize: "0.5rem", letterSpacing: "0.15em", color: "var(--text-muted)" }}
          >
            0%
          </span>
        </div>
      </div>

      {/* Corner decoration */}
      <div
        className="absolute bottom-8 right-8 font-mono-custom coord-label"
        aria-hidden="true"
      >
        DIGITAL MOTION SYSTEM
      </div>
      <div
        className="absolute top-8 left-8 font-mono-custom coord-label"
        aria-hidden="true"
      >
        ASTRA / BOOT
      </div>
    </div>
  );
}
