"use client";
import { useRef, useEffect, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroVisual from "./HeroVisual";
import HeroStats from "./HeroStats";
import FloatingLabels from "./FloatingLabels";
import DataMode from "./DataMode";
import ParticleField from "./ParticleField";
import MagneticButton from "./MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Hero — master scroll-driven experience component for ASTRA.
 *
 * Architecture:
 * - Single master ScrollTrigger timeline (progress 0 → 1)
 * - 7 narrative stages mapped to scroll progress
 * - All animations synchronized through scrubbed master timeline
 * - Real-time scroll velocity & direction telemetry
 * - Full reduced motion & responsive fallbacks
 *
 * Stages:
 * STAGE 01 — INTRO       (0.00 → 0.10)
 * STAGE 02 — DEPTH       (0.10 → 0.25)
 * STAGE 03 — ORBIT       (0.25 → 0.40)
 * STAGE 04 — BREAK APART (0.40 → 0.55)
 * STAGE 05 — DATA MODE   (0.55 → 0.72)
 * STAGE 06 — REASSEMBLY  (0.72 → 0.88)
 * STAGE 07 — FINAL FRAME (0.88 → 1.00)
 */
export default function Hero({ onProgressChange }) {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const headlineRef = useRef(null);
  const subHeadRef = useRef(null);
  const scrollHintRef = useRef(null);
  const stageTextRef = useRef(null);
  const finalFrameRef = useRef(null);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);

  const [dataModeProgress, setDataModeProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reducedMotion } = context.conditions;

          // ---- ACCESSIBILITY: REDUCED MOTION PATH ----
          if (reducedMotion) {
            gsap.set(
              [
                "#navbar",
                "#hero-headline",
                "#hero-sub",
                "#hero-stats",
                "#scroll-hint",
                "#corner-info",
                "#astra-visual",
                ".hero-letter",
              ],
              {
                opacity: 1,
                y: 0,
                scale: 1,
                clearProps: "all",
              }
            );
            return;
          }

          // ---- CINEMATIC INTRO SEQUENCE (0ms to 1200ms) ----
          const introTl = gsap.timeline({ defaults: { ease: "power2.out" } });

          introTl
            .to("#navbar", { opacity: 1, duration: 0.6 }, 0.15)
            .to("#hero-stage-label", { opacity: 1, y: 0, duration: 0.5 }, 0.3)
            .fromTo(
              ".hero-letter",
              { opacity: 0, y: 60, skewY: 4 },
              {
                opacity: 1,
                y: 0,
                skewY: 0,
                duration: 0.8,
                stagger: 0.06,
                ease: "power3.out",
              },
              0.45
            )
            .fromTo(
              "#hero-sub",
              { opacity: 0, y: 20, letterSpacing: "0.35em" },
              { opacity: 1, y: 0, letterSpacing: "0.2em", duration: 0.7 },
              0.85
            )
            .fromTo(
              "#astra-visual",
              { opacity: 0, scale: 0.82, y: 40 },
              { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power2.out" },
              0.6
            )
            .fromTo(
              ["#stat-0", "#stat-1", "#stat-2"],
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, stagger: 0.12, duration: 0.6 },
              1.0
            )
            .fromTo(
              "#scroll-hint",
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.5 },
              1.3
            )
            .fromTo(
              "#corner-info",
              { opacity: 0 },
              { opacity: 1, duration: 0.8 },
              1.1
            );

          // Subtle ambient idle breathing
          gsap.to("#scroll-hint", {
            y: 6,
            duration: 1.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.8,
          });

          gsap.to("#core-inner", {
            scale: 1.1,
            duration: 2.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            transformOrigin: "center center",
          });

          gsap.to("#core-bright", {
            scale: 1.35,
            opacity: 0.75,
            duration: 1.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            transformOrigin: "center center",
          });

          // Gentle ambient celestial rotation
          gsap.to("#visual-svg", {
            rotation: 360,
            duration: 140,
            ease: "none",
            repeat: -1,
            transformOrigin: "center center",
            svgOrigin: "250 250",
          });

          // ---- MASTER SCROLL-DRIVEN TIMELINE ----
          const heroH = isDesktop ? "320vh" : "280vh";
          if (sectionRef.current) {
            sectionRef.current.style.height = heroH;
          }

          const masterTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              pin: containerRef.current,
              pinSpacing: false,
              scrub: 1.4,
              anticipatePin: 1,
              onUpdate: (self) => {
                const p = self.progress;
                const dir = self.direction;
                const vel = self.getVelocity();

                if (onProgressChange) {
                  onProgressChange({ progress: p, direction: dir, velocity: vel });
                }
                setDataModeProgress(p);
                setScrollVelocity(vel);

                // Scroll velocity effect: subtle dynamic skew & tilt
                if (!isMobile) {
                  const normVel = Math.max(-1, Math.min(1, vel / 1800));
                  gsap.to("#astra-visual", {
                    skewY: normVel * 2.2,
                    overwrite: "auto",
                    duration: 0.35,
                    ease: "power2.out",
                  });
                }
              },
            },
          });

          // ------- STAGE 01 — INTRO (0.00 → 0.10) -------
          masterTl.to(
            "#hero-stage-text",
            {
              opacity: 1,
              y: 0,
              duration: 0.1,
            },
            0
          );

          // ------- STAGE 02 — DEPTH (0.10 → 0.25) -------
          // Visual advances toward viewer, typography separates with parallax
          masterTl.to(
            "#astra-visual",
            {
              scale: 1.2,
              duration: 0.15,
              ease: "power1.out",
            },
            0.1
          );

          masterTl.to(
            ".hero-letter",
            {
              y: isDesktop ? -32 : -16,
              opacity: 0.65,
              stagger: 0.015,
              duration: 0.12,
            },
            0.11
          );

          masterTl.to(
            "#grid-bg",
            {
              scale: 1.12,
              opacity: 0.65,
              duration: 0.15,
            },
            0.1
          );

          masterTl.to(
            "#depth-label",
            {
              opacity: 1,
              y: 0,
              duration: 0.06,
            },
            0.14
          );

          // ------- STAGE 03 — ORBIT (0.25 → 0.40) -------
          // Illusion of camera orbit around core, floating labels appear
          masterTl.to(
            "#visual-svg",
            {
              rotation: "+=32",
              duration: 0.15,
              ease: "none",
              svgOrigin: "250 250",
            },
            0.25
          );

          masterTl.to(
            "#astra-visual",
            {
              rotationY: isDesktop ? 14 : 0,
              rotationX: 6,
              scale: 1.24,
              duration: 0.15,
              ease: "power1.out",
            },
            0.25
          );

          masterTl.to(
            ["#fl-core", "#fl-energy", "#fl-motion", "#fl-system"],
            {
              opacity: 1,
              y: 0,
              stagger: 0.02,
              duration: 0.08,
            },
            0.26
          );

          masterTl.to(
            "#connect-svg",
            {
              opacity: 1,
              duration: 0.08,
            },
            0.28
          );

          masterTl.to(
            "#orbit-outer",
            {
              attr: { rx: 218, ry: 68 },
              duration: 0.15,
            },
            0.25
          );

          // Background parallax shift
          masterTl.to(
            "#grid-bg",
            {
              y: -35,
              duration: 0.15,
            },
            0.25
          );

          // ------- STAGE 04 — BREAK APART (0.40 → 0.55) -------
          // Core separates into conceptual layers (CORE, FRAME, ENERGY, SIGNAL)
          masterTl.to(
            "#layer-core",
            {
              x: 0,
              y: -26,
              opacity: 0.95,
              duration: 0.12,
            },
            0.4
          );

          masterTl.to(
            "#layer-frame",
            {
              x: 22,
              y: 16,
              opacity: 0.75,
              duration: 0.12,
            },
            0.4
          );

          masterTl.to(
            "#layer-energy",
            {
              x: -20,
              y: 12,
              opacity: 0.85,
              duration: 0.12,
            },
            0.4
          );

          masterTl.to(
            "#layer-signal",
            {
              x: 14,
              y: -20,
              opacity: 0.7,
              duration: 0.12,
            },
            0.4
          );

          masterTl.to("#shard-1", { x: 28, y: -22, opacity: 0.95, duration: 0.12 }, 0.42);
          masterTl.to("#shard-2", { x: -24, y: 20, opacity: 0.85, duration: 0.12 }, 0.43);
          masterTl.to("#shard-3", { x: -22, y: -18, opacity: 0.9, duration: 0.12 }, 0.42);
          masterTl.to("#shard-4", { x: 32, y: 10, opacity: 0.8, duration: 0.12 }, 0.44);

          // Headline fades out to make space for data mode
          masterTl.to(
            ".hero-letter",
            {
              opacity: 0,
              y: -45,
              stagger: 0.01,
              duration: 0.1,
            },
            0.42
          );

          masterTl.to(
            "#hero-sub",
            {
              opacity: 0,
              duration: 0.08,
            },
            0.42
          );

          masterTl.to(
            "#hero-stats",
            {
              opacity: 0,
              y: -20,
              duration: 0.08,
            },
            0.42
          );

          // ------- STAGE 05 — DATA MODE (0.55 → 0.72) -------
          // Visual steps back, telemetry counters animate synchronously with scroll
          masterTl.to(
            "#astra-visual",
            {
              opacity: 0.35,
              scale: 0.88,
              duration: 0.1,
            },
            0.55
          );

          masterTl.to(
            "#data-mode",
            {
              opacity: 1,
              pointerEvents: "none",
              duration: 0.1,
            },
            0.56
          );

          masterTl.to(
            ["#dm-perf", "#dm-resp", "#dm-eff"],
            {
              opacity: 1,
              stagger: 0.04,
              duration: 0.08,
            },
            0.58
          );

          masterTl.to(
            ["#fl-core", "#fl-energy", "#fl-motion", "#fl-system"],
            {
              opacity: 0,
              duration: 0.06,
            },
            0.55
          );

          masterTl.to(
            "#connect-svg",
            {
              opacity: 0,
              duration: 0.06,
            },
            0.55
          );

          // ------- STAGE 06 — REASSEMBLY (0.72 → 0.88) -------
          // Layers reunite, headline crossfades to "MOVE BEYOND LIMITS"
          masterTl.to(
            "#data-mode",
            {
              opacity: 0,
              duration: 0.06,
            },
            0.72
          );

          masterTl.to(
            ["#layer-core", "#layer-frame", "#layer-energy", "#layer-signal"],
            {
              x: 0,
              y: 0,
              duration: 0.12,
              ease: "power2.out",
            },
            0.72
          );

          masterTl.to(
            ["#shard-1", "#shard-2", "#shard-3", "#shard-4"],
            {
              x: 0,
              y: 0,
              duration: 0.12,
              ease: "power2.out",
            },
            0.72
          );

          masterTl.to(
            "#astra-visual",
            {
              opacity: 1,
              scale: 1.05,
              rotationY: 0,
              rotationX: 0,
              duration: 0.12,
              ease: "power2.out",
            },
            0.72
          );

          // Smooth crossfade to "MOVE BEYOND LIMITS"
          masterTl.to(
            "#hero-stage-text",
            {
              opacity: 0,
              duration: 0.04,
            },
            0.72
          );

          masterTl.to(
            "#reassembly-text",
            {
              opacity: 1,
              y: 0,
              duration: 0.1,
            },
            0.75
          );

          masterTl.to(
            "#hero-sub",
            {
              opacity: 0.8,
              duration: 0.08,
            },
            0.76
          );

          // ------- STAGE 07 — FINAL FRAME (0.88 → 1.00) -------
          masterTl.to(
            "#reassembly-text",
            {
              opacity: 0,
              y: -20,
              duration: 0.06,
            },
            0.88
          );

          masterTl.to(
            "#final-frame",
            {
              opacity: 1,
              y: 0,
              duration: 0.09,
            },
            0.9
          );

          masterTl.to(
            "#astra-visual",
            {
              scale: 0.98,
              opacity: 0.45,
              duration: 0.08,
            },
            0.9
          );

          masterTl.to(
            "#grid-bg",
            {
              opacity: 0.25,
              y: 0,
              duration: 0.08,
            },
            0.9
          );

          masterTl.to(
            "#cta-section",
            {
              opacity: 1,
              y: 0,
              duration: 0.08,
            },
            0.92
          );
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile, onProgressChange]);

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative w-full"
      style={{ minHeight: "300vh", height: "320vh" }}
      aria-label="ASTRA hero experience"
    >
      {/* PINNED HERO VIEWPORT */}
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
        style={{
          background: "var(--bg-primary)",
        }}
      >
        {/* Background Technical Grid */}
        <div
          id="grid-bg"
          ref={gridRef}
          className="grid-bg absolute inset-0"
          aria-hidden="true"
          style={{ opacity: 0.4 }}
        />

        {/* Cinematic Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, var(--bg-primary) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Reactive Particle Field */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <ParticleField scrollVelocity={scrollVelocity} isMobile={isMobile} />
        </div>

        {/* HERO COMPOSITION OVERLAY */}
        <div className="absolute inset-0 flex flex-col justify-between px-6 md:px-16 py-20 md:py-24 z-10 pointer-events-none">
          {/* TOP METADATA BAR */}
          <div className="flex items-center justify-between w-full">
            <div
              id="hero-stage-label"
              style={{ opacity: 0, transform: "translateY(-8px)" }}
            >
              <span
                id="hero-stage-text"
                className="font-mono-custom text-[10px] tracking-[0.35em] text-white/40 uppercase"
              >
                ENTER THE SYSTEM
              </span>
            </div>

            <div
              id="depth-label"
              style={{ opacity: 0, transform: "translateY(-4px)" }}
              aria-hidden="true"
            >
              <span className="font-mono-custom text-[10px] tracking-[0.25em] text-white/35">
                DEPTH // 01
              </span>
            </div>
          </div>

          {/* CENTER HERO ROW */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 flex-1 py-4">
            {/* LEFT: TYPOGRAPHY HIERARCHY */}
            <div className="flex flex-col gap-4 md:gap-6 max-w-xl z-20 pointer-events-auto">
              {/* Display Headline: ASTRA */}
              <div
                ref={headlineRef}
                className="overflow-hidden"
                aria-label="ASTRA"
              >
                <div className="flex items-baseline gap-2 md:gap-4 select-none">
                  {"ASTRA".split("").map((letter, i) => (
                    <span
                      key={i}
                      className="hero-letter font-display text-gradient-subtle inline-block"
                      style={{
                        fontSize: "clamp(4.2rem, 11vw, 9.5rem)",
                        opacity: 0,
                        transform: "translateY(60px)",
                        lineHeight: 0.9,
                        willChange: "transform, opacity",
                      }}
                      aria-hidden="true"
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>

              {/* Supporting Secondary Text */}
              <p
                id="hero-sub"
                ref={subHeadRef}
                className="font-mono-custom text-[11px] md:text-xs tracking-[0.22em] text-white/60 uppercase"
                style={{ opacity: 0 }}
              >
                A DIGITAL MOTION EXPERIENCE
              </p>

              {/* STAGE 06: REASSEMBLY HEADLINE CROSSFADE */}
              <div
                id="reassembly-text"
                className="absolute"
                style={{
                  opacity: 0,
                  transform: "translateY(20px)",
                  top: "38%",
                  left: "6%",
                  maxWidth: "480px",
                }}
                aria-hidden="true"
              >
                <p
                  className="font-display text-gradient-violet"
                  style={{
                    fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
                    lineHeight: 1.05,
                  }}
                >
                  MOVE BEYOND LIMITS
                </p>
                <p className="font-mono-custom text-[11px] tracking-[0.25em] text-white/50 mt-3 uppercase">
                  THE SYSTEM HAS REASSEMBLED
                </p>
              </div>
            </div>

            {/* CENTER / RIGHT: FUTURISTIC CENTRAL VISUAL */}
            <div
              ref={visualRef}
              className="relative flex-shrink-0 pointer-events-auto"
              style={{
                width: "clamp(280px, 42vw, 540px)",
                height: "clamp(280px, 42vw, 540px)",
              }}
            >
              <HeroVisual />
              <FloatingLabels />
              <DataMode progress={dataModeProgress} />
            </div>
          </div>

          {/* BOTTOM BAR: METRICS & SCROLL HINT */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pointer-events-auto">
            {/* Design Metrics */}
            <div id="hero-stats">
              <HeroStats />
            </div>

            {/* Scroll CTA Indicator */}
            <div
              id="scroll-hint"
              ref={scrollHintRef}
              style={{ opacity: 0 }}
              aria-label="Scroll to explore"
              className="self-center md:self-end"
            >
              <div className="flex flex-col items-center gap-1.5 cursor-pointer">
                <span className="font-mono-custom text-[9px] tracking-[0.25em] text-white/40 uppercase">
                  SCROLL TO EXPLORE
                </span>
                <span
                  className="text-white/40 text-xs font-mono-custom"
                  aria-hidden="true"
                >
                  ↓
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* STAGE 07 — FINAL FRAME OVERLAY */}
        <div
          id="final-frame"
          className="absolute inset-0 flex flex-col items-center justify-center gap-8 pointer-events-none z-30"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          <div className="text-center flex flex-col items-center gap-4 px-6">
            <span
              className="font-display text-gradient-violet"
              style={{
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
                letterSpacing: "0.18em",
              }}
            >
              ASTRA
            </span>
            <span className="font-mono-custom text-xs md:text-sm tracking-[0.35em] text-white/70 uppercase">
              MOTION WITHOUT LIMITS.
            </span>
          </div>

          <div
            id="cta-section"
            ref={ctaRef}
            className="flex flex-col items-center gap-4 pointer-events-auto"
            style={{ opacity: 0, transform: "translateY(12px)" }}
          >
            <MagneticButton
              onClick={() => {
                const el = document.getElementById("experience");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              dataCursor="open"
              className="px-8 py-4 border font-mono-custom rounded-sm transition-all duration-300"
              style={{
                borderColor: "rgba(124, 91, 245, 0.4)",
                fontSize: "0.7rem",
                letterSpacing: "0.28em",
                background: "rgba(124, 91, 245, 0.12)",
                color: "#f0f0f8",
              }}
              aria-label="Explore ASTRA experience"
            >
              EXPLORE EXPERIENCE →
            </MagneticButton>
          </div>
        </div>

        {/* CORNER TECHNICAL DECORATIONS */}
        <div
          id="corner-info"
          className="absolute inset-0 pointer-events-none z-10"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          {/* Top-left */}
          <div className="absolute top-6 left-6 md:left-12 flex flex-col gap-1 text-[9px] tracking-[0.2em] text-white/30">
            <span className="font-mono-custom">ASTRA / 01</span>
          </div>

          {/* Bottom-left */}
          <div className="absolute bottom-6 left-6 md:left-12">
            <span className="font-mono-custom coord-label text-[9px]">
              SCROLL TO EXPLORE
            </span>
          </div>

          {/* Bottom-right */}
          <div className="absolute bottom-6 right-6 md:right-12">
            <span className="font-mono-custom coord-label text-[9px]">
              03:42 // DIGITAL MOTION
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
