"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

/**
 * DataMode — scroll-driven data visualization panel.
 * Counters and bars sync to ScrollTrigger progress (not random counting).
 * Exposed via ref forwarding for external progress control.
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
    metrics.forEach((m, i) => {
      const bar = barRefs.current[i];
      const num = numRefs.current[i];
      if (!bar || !num) return;

      const pct = Math.min(1, Math.max(0, (progress - 0.1) / 0.5));
      const currentVal = m.value * pct;

      bar.style.width = `${(m.value / 100) * pct * 100}%`;

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
      className="absolute inset-0 flex flex-col justify-center items-center gap-8 md:gap-12 px-8"
      style={{ opacity: 0, pointerEvents: "none" }}
      aria-label="Performance data visualization"
    >
      {/* Header */}
      <div className="text-center mb-4">
        <span
          className="font-mono-custom"
          style={{ fontSize: "0.55rem", letterSpacing: "0.3em", color: "var(--text-muted)" }}
        >
          SYSTEM DATA // STAGE 05
        </span>
      </div>

      {/* Metrics */}
      {metrics.map((m, i) => (
        <div
          key={m.id}
          id={m.id}
          className="w-full max-w-xs md:max-w-sm"
          style={{ opacity: 0 }}
        >
          {/* Label */}
          <div className="flex justify-between items-baseline mb-2">
            <span
              className="font-mono-custom"
              style={{ fontSize: "0.55rem", letterSpacing: "0.22em", color: "var(--text-muted)" }}
            >
              {m.label}
            </span>
            <span
              ref={(el) => (numRefs.current[i] = el)}
              className="font-display"
              style={{ fontSize: "1.8rem", color: "var(--text-primary)", lineHeight: 1 }}
            >
              0{m.unit}
            </span>
          </div>

          {/* Progress bar */}
          <div className="data-bar">
            <div
              ref={(el) => (barRefs.current[i] = el)}
              className="data-bar-fill"
              style={{ width: "0%" }}
            />
          </div>

          {/* Target indicator */}
          <div className="flex justify-end mt-1">
            <span
              className="font-mono-custom"
              style={{ fontSize: "0.45rem", letterSpacing: "0.15em", color: "var(--text-muted)" }}
            >
              TARGET // {m.value}{m.unit}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
