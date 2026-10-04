"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Shockwave — Fullscreen Radial Energy Discharge.
 * Triggers on core interaction with expanding holographic wave rings.
 */
export default function Shockwave({ triggerId = 0, color = "#00d4ff" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (triggerId === 0) return;
    const container = containerRef.current;
    if (!container) return;

    const ring1 = container.querySelector(".shock-ring-1");
    const ring2 = container.querySelector(".shock-ring-2");
    const flash = container.querySelector(".shock-flash");

    const tl = gsap.timeline();

    tl.set([ring1, ring2], { scale: 0.1, opacity: 1 })
      .set(flash, { opacity: 0.35 })
      .to(flash, { opacity: 0, duration: 0.35, ease: "power2.out" })
      .to(
        ring1,
        {
          scale: 3.5,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
        },
        0
      )
      .to(
        ring2,
        {
          scale: 2.8,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
        },
        0.08
      );

    return () => tl.kill();
  }, [triggerId]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {/* Radial Flash Light */}
      <div
        className="shock-flash absolute inset-0 opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${color}33 0%, transparent 70%)`,
        }}
      />

      {/* Primary Expanding Ring */}
      <div
        className="shock-ring-1 w-[400px] h-[400px] rounded-full border-2 opacity-0 pointer-events-none"
        style={{
          borderColor: color,
          boxShadow: `0 0 40px ${color}, inset 0 0 20px ${color}`,
        }}
      />

      {/* Secondary Lagging Ring */}
      <div
        className="shock-ring-2 w-[400px] h-[400px] rounded-full border opacity-0 pointer-events-none"
        style={{
          borderColor: `${color}88`,
          boxShadow: `0 0 25px ${color}66`,
        }}
      />
    </div>
  );
}
