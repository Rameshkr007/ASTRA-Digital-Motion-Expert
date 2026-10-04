"use client";
import { useRef, useEffect } from "react";

/**
 * ScrollProgress — futuristic scroll progress indicator.
 * Displays:
 * - "SCROLL PROGRESS" technical title
 * - Checkpoint markers: 0%, 25%, 50%, 75%, 100%
 * - Real-time animated track fill
 * - Dynamic scroll direction indicator (DOWN ↓ / UP ↑)
 * Synchronized with master GSAP ScrollTrigger progress.
 */
export default function ScrollProgress({ progress = 0, direction = 1 }) {
  const fillRef = useRef(null);
  const pctRef = useRef(null);
  const dirRef = useRef(null);

  useEffect(() => {
    const pct = Math.min(100, Math.max(0, Math.round(progress * 100)));
    if (fillRef.current) {
      fillRef.current.style.height = `${pct}%`;
    }
    if (pctRef.current) {
      pctRef.current.textContent = `${pct}%`;
    }
    if (dirRef.current) {
      dirRef.current.textContent = direction >= 0 ? "FWD ↓" : "REV ↑";
    }
  }, [progress, direction]);

  const markers = [0, 25, 50, 75, 100];

  return (
    <aside
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 pointer-events-none select-none"
      aria-label="Scroll progress intelligence"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Top technical label */}
      <div className="flex flex-col items-center gap-1">
        <span
          className="font-mono-custom text-[8px] tracking-[0.25em] text-white/40 uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          SCROLL PROGRESS
        </span>
      </div>

      {/* Progress Track with Tick Markers */}
      <div className="relative flex items-center">
        {/* Checkpoint percentage labels on left */}
        <div className="hidden lg:flex flex-col justify-between h-[120px] mr-2 text-right">
          {markers.map((m) => (
            <span
              key={m}
              className="font-mono-custom text-[8px] transition-colors duration-200"
              style={{
                color: progress * 100 >= m ? "rgba(124, 91, 245, 0.9)" : "rgba(255, 255, 255, 0.2)",
              }}
            >
              {m}%
            </span>
          ))}
        </div>

        {/* The Track Line */}
        <div className="relative w-[2px] h-[120px] bg-white/10 rounded-full overflow-hidden">
          <div
            ref={fillRef}
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-violet-500 via-cyan-400 to-blue-500 transition-all duration-75"
            style={{ height: "0%" }}
          />
        </div>

        {/* Marker tick dots */}
        <div className="absolute top-0 left-[1px] w-full h-[120px] pointer-events-none">
          {markers.map((m) => (
            <div
              key={m}
              className="absolute -left-[3px] w-2 h-[2px] transition-colors duration-200"
              style={{
                top: `${m}%`,
                transform: "translateY(-50%)",
                backgroundColor: progress * 100 >= m ? "#00d4ff" : "rgba(255, 255, 255, 0.25)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Real-time Percentage & Direction Status */}
      <div className="flex flex-col items-center gap-1 text-center">
        <span
          ref={pctRef}
          className="font-mono-custom text-[11px] font-bold tracking-wider text-white"
        >
          0%
        </span>
        <span
          ref={dirRef}
          className="font-mono-custom text-[7px] tracking-[0.2em] text-cyan-400/80 uppercase"
        >
          FWD ↓
        </span>
      </div>
    </aside>
  );
}
