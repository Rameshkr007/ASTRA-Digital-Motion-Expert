"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * SectionTransition — seamless non-linear transition between sections.
 * Features:
 * - Layered crossfade with scale & opacity
 * - Subtle geometric divider lines with glowing pulses
 * - Coordinate metadata labels
 * - Hardware-accelerated transforms
 */
export default function SectionTransition({
  stageNumber = "01",
  stageName = "ARCHITECTURE",
  direction = "down",
}) {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const glowRef = useRef(null);
  const labelRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const container = containerRef.current;
    const line = lineRef.current;
    const glow = glowRef.current;
    const label = labelRef.current;
    if (!container || !line || !glow) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        glow,
        { opacity: 0, scale: 0.6 },
        {
          opacity: 0.7,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            end: "top 35%",
            scrub: 1.2,
          },
        }
      );

      if (label) {
        gsap.fromTo(
          label,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 75%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-16 md:py-24 overflow-hidden flex flex-col items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      {/* Background glow node */}
      <div
        ref={glowRef}
        className="absolute w-96 h-24 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124, 91, 245, 0.25), transparent 70%)",
          filter: "blur(24px)",
          opacity: 0,
          willChange: "transform, opacity",
        }}
      />

      {/* Decorative technical line */}
      <div className="relative w-full max-w-4xl px-8 flex items-center justify-between">
        <span className="font-mono-custom coord-label text-[10px] text-white/30 tracking-widest">
          SEC // {stageNumber}
        </span>
        <div className="flex-1 mx-6 relative h-[1px]">
          <div
            ref={lineRef}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent origin-center"
            style={{ willChange: "transform, opacity" }}
          />
          {/* Subtle center marker dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00d4ff]" />
        </div>
        <span className="font-mono-custom coord-label text-[10px] text-white/30 tracking-widest">
          {stageName}
        </span>
      </div>

      {/* Stage Transition Title */}
      <div ref={labelRef} className="mt-4 text-center">
        <span className="font-mono-custom text-[11px] tracking-[0.35em] text-violet-400/80 uppercase">
          CONTINUOUS MOTION FLOW
        </span>
      </div>
    </div>
  );
}
