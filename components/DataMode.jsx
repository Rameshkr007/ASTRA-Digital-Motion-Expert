"use client";
import { useRef, useEffect } from "react";

/**
 * DataMode — scroll-synchronized data visualization panel.
 * STAGE 05 (progress 0.55 → 0.72):
 * Counters count smoothly from 0 to target as the user scrolls,
 * and count down smoothly in reverse when scrolling back up.
 */
export default function DataMode({ progress = 0 }) {
  const metrics = [
    { id: "dm-perf", label: "PERFORMANCE", value: 92, unit: "%" },
    { id: "dm-resp", label: "RESPONSE", value: 3.8, unit: "x", decimals: 1 },
    { id: "dm-eff", label: "EFFICIENCY", value: 68, unit: "%" },
  ];

  const barRefs = useRef([]);
  const numRefs = useRef([]);

  useEffect(() => {
    // Stage 05 normalized window (0.55 to 0.72)
    const stageRatio = Math.min(1, Math.max(0, (progress - 0.55) / 0.17));

    metrics.forEach((m, i) => {
      const bar = barRefs.current[i];
      const num = numRefs.current[i];
      if (!bar || !num) return;

      const currentVal = m.value * stageRatio;
      bar.style.width = `${stageRatio * 100}%`;

      if (m.decimals) {
        num.textContent = currentVal.toFixed(1) + m.unit;
      } else {
        num.textContent = Math.round(currentVal) + m.unit;
      }
    });
  }, [progress]);

  return (
    <div
      id="data-mode"
      className="absolute inset-0 flex flex-col justify-center items-center gap-7 md:gap-9 px-6 bg-[#050508]/85 backdrop-blur-md rounded-2xl border border-white/10"
      style={{ opacity: 0, pointerEvents: "none" }}
      aria-label="Performance data telemetry visualization"
    >
      {/* Header */}
      <div className="text-center flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono-custom text-[9px] tracking-[0.3em] text-cyan-400 font-bold uppercase">
            STAGE 05 // DATA MODE
          </span>
        </div>
        <span className="font-mono-custom text-[8px] tracking-[0.2em] text-white/40">
          SCROLL-SYNCHRONIZED TELEMETRY
        </span>
      </div>

      {/* Metrics List */}
      <div className="flex flex-col gap-6 w-full max-w-xs md:max-w-sm">
        {metrics.map((m, i) => (
          <div
            key={m.id}
            id={m.id}
            className="w-full flex flex-col gap-2"
            style={{ opacity: 0 }}
          >
            {/* Metric Label & Counter */}
            <div className="flex justify-between items-baseline">
              <span className="font-mono-custom text-[10px] tracking-[0.22em] text-white/50 uppercase">
                {m.label}
              </span>
              <span
                ref={(el) => (numRefs.current[i] = el)}
                className="font-display text-2xl md:text-3xl text-white font-bold tracking-tight"
              >
                0{m.unit}
              </span>
            </div>

            {/* Glowing Progress Bar */}
            <div className="relative w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
              <div
                ref={(el) => (barRefs.current[i] = el)}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-500 via-cyan-400 to-blue-400 shadow-[0_0_10px_rgba(0,212,255,0.5)]"
                style={{ width: "0%" }}
              />
            </div>

            {/* Sub-label Target */}
            <div className="flex justify-between text-[8px] font-mono-custom text-white/30 tracking-widest">
              <span>ACTIVE METRIC</span>
              <span>INDEX: {m.value}{m.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
