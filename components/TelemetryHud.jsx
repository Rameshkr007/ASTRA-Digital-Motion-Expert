"use client";
import { useState, useEffect, useRef } from "react";

/**
 * TelemetryHud — Real-Time Cyber Flight Recorder & Performance HUD.
 * Features:
 * - Live FPS frame meter calculated via requestAnimationFrame
 * - Real-time scroll velocity tachometer gauge (px/s)
 * - Current active stage tracker (Stage 01 to Stage 07)
 * - Minimal, futuristic design language
 */
export default function TelemetryHud({ velocity = 0, progress = 0 }) {
  const [fps, setFps] = useState(60);
  const [isOpen, setIsOpen] = useState(true);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const animRef = useRef(null);

  useEffect(() => {
    const loop = (now) => {
      frameCountRef.current++;
      const elapsed = now - lastTimeRef.current;
      if (elapsed >= 500) {
        const currentFps = Math.round((frameCountRef.current * 1000) / elapsed);
        setFps(Math.min(currentFps, 144));
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // Determine stage based on scroll progress
  const getStageInfo = (p) => {
    if (p < 0.1) return { num: "01", name: "INTRO" };
    if (p < 0.25) return { num: "02", name: "DEPTH" };
    if (p < 0.4) return { num: "03", name: "ORBIT" };
    if (p < 0.55) return { num: "04", name: "BREAK APART" };
    if (p < 0.72) return { num: "05", name: "DATA MODE" };
    if (p < 0.88) return { num: "06", name: "REASSEMBLY" };
    return { num: "07", name: "FINAL FRAME" };
  };

  const stage = getStageInfo(progress);
  const absVelocity = Math.round(Math.abs(velocity));
  const velPercentage = Math.min(absVelocity / 2000, 1);

  return (
    <div
      className="fixed top-20 right-6 z-40 hidden lg:flex flex-col gap-2 font-mono-custom pointer-events-none select-none"
      aria-label="Real-time Performance Telemetry HUD"
    >
      <div className="flex flex-col gap-2 p-3 rounded-lg bg-[#05050a]/75 backdrop-blur-md border border-white/10 shadow-xl pointer-events-auto">
        {/* Header with status */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] tracking-widest text-white/50 uppercase">
              FLIGHT TELEMETRY
            </span>
          </div>
          <span className="text-[8px] text-cyan-400/80 px-1.5 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20">
            LIVE
          </span>
        </div>

        {/* Meters Grid */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {/* FPS Counter */}
          <div className="flex flex-col">
            <span className="text-[8px] text-white/40 tracking-wider">FRAMERATE</span>
            <div className="flex items-baseline gap-1">
              <span className={`text-base font-bold ${fps >= 55 ? "text-emerald-400" : "text-amber-400"}`}>
                {fps}
              </span>
              <span className="text-[8px] text-white/40">FPS</span>
            </div>
          </div>

          {/* Velocity Tachometer */}
          <div className="flex flex-col">
            <span className="text-[8px] text-white/40 tracking-wider">VELOCITY</span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold text-cyan-400">
                {absVelocity}
              </span>
              <span className="text-[8px] text-white/40">PX/S</span>
            </div>
          </div>
        </div>

        {/* Velocity Gauge Bar */}
        <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden mt-0.5">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 transition-all duration-75"
            style={{ width: `${velPercentage * 100}%` }}
          />
        </div>

        {/* Current Active Stage */}
        <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[9px]">
          <span className="text-white/40">STAGE {stage.num}:</span>
          <span className="text-violet-300 font-semibold tracking-wider uppercase">
            {stage.name}
          </span>
        </div>
      </div>
    </div>
  );
}
