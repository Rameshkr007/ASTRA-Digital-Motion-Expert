"use client";
import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollProgress from "@/components/ScrollProgress";
import SectionTransition from "@/components/SectionTransition";
import MagneticButton from "@/components/MagneticButton";
import { useLenis } from "@/hooks/useLenis";
import { soundEngine } from "@/utils/audio";

// Client-only dynamic imports to prevent SSR mismatch
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function AstraPage() {
  const [loaded, setLoaded] = useState(false);
  const [scrollData, setScrollData] = useState({ progress: 0, direction: 1, velocity: 0 });
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState([
    "ASTRA MOTION SYSTEM v2.4 ONLINE",
    "Type 'help' or click presets for telemetry diagnostics.",
  ]);

  // Activate Lenis 120fps smooth scrolling
  useLenis();

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleProgressChange = useCallback((data) => {
    setScrollData(data);
    soundEngine.modulateVelocity(data.velocity);
  }, []);

  const runTerminalCommand = (cmd) => {
    soundEngine.playClick();
    const trimmed = cmd.trim().toLowerCase();
    let res = "";
    switch (trimmed) {
      case "help":
        res = "Commands: 'specs', 'timeline', 'metrics', 'clear'";
        break;
      case "specs":
        res = "PIPELINE: GSAP 3.15 + Lenis // GPU: Transform3D // FPS TARGET: 120 // REFLOWS: 0";
        break;
      case "timeline":
        res = "STAGES: [01:INTRO] -> [02:DEPTH] -> [03:ORBIT] -> [04:BREAK] -> [05:DATA] -> [06:REASSEMBLE] -> [07:FINAL]";
        break;
      case "metrics":
        res = "EFFICIENCY: 98.4% // MEMORY: <38MB // COMPOSITOR LAYERS: 6 // DOM PARTICLE COUNT: 0 (Canvas)";
        break;
      case "clear":
        setTerminalOutput(["ASTRA TERMINAL READY"]);
        setTerminalInput("");
        return;
      default:
        res = `Unknown command: '${cmd}'. Type 'help' for diagnostics.`;
    }
    setTerminalOutput((prev) => [...prev, `> ${cmd}`, res]);
    setTerminalInput("");
  };

  return (
    <main id="astra-root" className="relative bg-[#030305] text-[#f0f0f8] overflow-x-hidden min-h-screen selection:bg-cyan-500/30 selection:text-white">
      {/* Fallback for non-JS clients */}
      <noscript>
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-[#030305]">
          <h1 className="text-5xl font-extrabold tracking-widest text-white mb-4">ASTRA</h1>
          <p className="text-sm font-mono text-white/60 mb-6">A DIGITAL MOTION EXPERIENCE</p>
          <p className="max-w-md text-xs font-mono text-white/40 leading-relaxed">
            ASTRA is an advanced scroll-driven experience that requires JavaScript to drive its GSAP timeline.
          </p>
        </div>
      </noscript>

      {/* Cinematic Initial Loader */}
      <Loader onComplete={handleLoaderComplete} />

      {/* Desktop Custom Cursor with Dynamic Context States */}
      <CustomCursor />

      {/* Futuristic Fixed Navigation */}
      <Navbar />

      {/* Scroll Intelligence Progress Bar */}
      {loaded && (
        <ScrollProgress
          progress={scrollData.progress}
          direction={scrollData.direction}
        />
      )}

      {/* Master Hero Experience with 7-Stage Timeline */}
      {loaded && (
        <Hero onProgressChange={handleProgressChange} />
      )}

      {/* SECTION 1 TRANSITION */}
      <SectionTransition stageNumber="01" stageName="INTERACTION ARCHITECTURE" />

      {/* ============================================================
          SECTION: EXPERIENCE (Interactive Motion Matrix)
          ============================================================ */}
      <section
        id="experience"
        className="relative py-20 px-6 md:px-16 max-w-7xl mx-auto z-20"
        aria-label="ASTRA Experience Features"
      >
        <div className="flex flex-col gap-4 mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono-custom text-[10px] tracking-[0.3em] text-cyan-400 uppercase">
              EXPERIENCE CAPABILITIES
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight text-white">
            ENGINEERED FOR NATURAL MOTION
          </h2>
          <p className="font-mono-custom text-xs md:text-sm text-white/60 max-w-2xl leading-relaxed">
            Scroll becomes your camera controller. The interface responds with surgical fluid physics,
            distributing animation load entirely through compositor threads to eliminate frame drops.
          </p>
        </div>

        {/* Feature Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: "01",
              title: "Normalized Scroll Scrubbing",
              desc: "A single master ScrollTrigger scrubs across 320vh of pinned viewport. Reversible at every sub-millisecond scroll increment.",
              tag: "GSAP Scrub: 1.4",
            },
            {
              id: "02",
              title: "Zero-Reflow Compositing",
              desc: "Animations mutate strictly transform3d, scale, rotation, and opacity. No layout recalculations or paint triggers during interaction.",
              tag: "GPU Accelerated",
            },
            {
              id: "03",
              title: "Adaptive Particle Telemetry",
              desc: "Canvas particle density throttles dynamically between desktop and mobile with high-DPI retina clamping and velocity streaking.",
              tag: "HTML5 Canvas API",
            },
          ].map((card) => (
            <div
              key={card.id}
              className="relative p-8 rounded-lg border border-white/10 bg-[#0a0a12]/70 backdrop-blur-md hover:border-violet-500/40 hover:bg-[#0f0f1c]/80 transition-all duration-300 group"
              data-cursor="explore"
              onMouseEnter={() => soundEngine.playHover()}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono-custom text-xs text-violet-400 font-bold tracking-widest">
                  // {card.id}
                </span>
                <span className="font-mono-custom text-[9px] px-2.5 py-1 rounded border border-white/10 text-white/40">
                  {card.tag}
                </span>
              </div>
              <h3 className="font-display text-xl text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {card.title}
              </h3>
              <p className="font-mono-custom text-xs text-white/50 leading-relaxed">
                {card.desc}
              </p>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono-custom text-white/30">
                <span>STATUS: OPERATIONAL</span>
                <span>LATENCY: 0.1ms</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2 TRANSITION */}
      <SectionTransition stageNumber="02" stageName="SYSTEM TELEMETRY" />

      {/* ============================================================
          SECTION: SYSTEM (Diagnostics & Telemetry Console)
          ============================================================ */}
      <section
        id="system"
        className="relative py-20 px-6 md:px-16 max-w-7xl mx-auto z-20"
        aria-label="ASTRA System Telemetry"
      >
        <div className="flex flex-col gap-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
            <span className="font-mono-custom text-[10px] tracking-[0.3em] text-violet-400 uppercase">
              SUBSYSTEM DIAGNOSTICS
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight text-white">
            REAL-TIME PIPELINE MONITOR
          </h2>
        </div>

        {/* Live Interactive Telemetry Console */}
        <div className="border border-white/10 rounded-lg bg-[#08080e] p-6 md:p-8 font-mono-custom shadow-2xl">
          {/* Console Header */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-6 gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              <span className="text-xs text-white/50 ml-3 tracking-widest">
                ASTRA-DIAGNOSTIC-SHELL // PORT: 3000
              </span>
            </div>

            {/* Quick Command Buttons */}
            <div className="flex gap-2">
              {["specs", "timeline", "metrics", "clear"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => runTerminalCommand(cmd)}
                  data-cursor="open"
                  className="text-[10px] uppercase px-3 py-1 rounded bg-white/5 hover:bg-violet-600/30 text-white/70 hover:text-white border border-white/10 transition-colors"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>

          {/* Console Output Log */}
          <div
            className="flex flex-col gap-1.5 min-h-[140px] max-h-[220px] overflow-y-auto text-xs text-cyan-300/90 mb-6 font-mono-custom"
            aria-live="polite"
          >
            {terminalOutput.map((line, idx) => (
              <div key={idx} className={line.startsWith(">") ? "text-violet-400" : ""}>
                {line}
              </div>
            ))}
          </div>

          {/* Console Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (terminalInput) runTerminalCommand(terminalInput);
            }}
            className="flex items-center gap-3 pt-4 border-t border-white/10"
          >
            <span className="text-violet-400 text-sm font-bold">{">"}</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="Enter diagnostic command (e.g. specs, metrics, timeline)..."
              className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder-white/20 font-mono-custom"
              aria-label="Terminal command input"
            />
            <button
              type="submit"
              className="text-[10px] tracking-widest uppercase px-4 py-1.5 rounded bg-violet-600/40 text-violet-200 hover:bg-violet-600 hover:text-white transition-colors"
            >
              EXECUTE
            </button>
          </form>
        </div>
      </section>

      {/* SECTION 3 TRANSITION */}
      <SectionTransition stageNumber="03" stageName="MANIFESTO & ABOUT" />

      {/* ============================================================
          SECTION: ABOUT (Manifesto & Technology Stack)
          ============================================================ */}
      <section
        id="about"
        className="relative py-20 px-6 md:px-16 max-w-7xl mx-auto z-20 mb-20"
        aria-label="About ASTRA"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <span className="font-mono-custom text-[10px] tracking-[0.3em] text-cyan-400 uppercase">
              THE VISION
            </span>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight text-white leading-tight">
              MOTION THAT RESPONDS TO YOU.
            </h2>
            <p className="font-mono-custom text-xs md:text-sm text-white/60 leading-loose">
              ASTRA was conceived as a digital space where user agency is paramount. Rather than autoplaying
              uncontrollable animations, every single pixel of transformation is intimately tethered to
              the user’s scroll trajectory.
            </p>
            <p className="font-mono-custom text-xs md:text-sm text-white/40 leading-loose">
              By combining GSAP ScrollTrigger scrub mechanics with modern React architecture and
              precision SVG geometry, ASTRA pushes the boundaries of modern frontend craftsmanship.
            </p>

            <div className="pt-4 flex gap-4">
              <MagneticButton
                onClick={() => {
                  soundEngine.playClick();
                  if (typeof window !== "undefined") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="px-6 py-3 border border-white/20 rounded text-xs font-mono-custom text-white hover:border-cyan-400 transition-colors"
                dataCursor="open"
              >
                RETURN TO HERO ↑
              </MagneticButton>
            </div>
          </div>

          {/* Technical Specifications Accordion / Panel */}
          <div className="border border-white/10 rounded-lg p-8 bg-[#0a0a12]/70 backdrop-blur-md flex flex-col gap-6 font-mono-custom">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-xs text-white/40 uppercase tracking-widest">
                CORE TECHNICAL SPECIFICATIONS
              </span>
              <span className="text-[10px] text-violet-400 font-bold">2026 RELEASE</span>
            </div>

            <div className="flex flex-col gap-4 text-xs">
              {[
                ["FRAMEWORK", "Next.js 15 (App Router, Server Components)"],
                ["SMOOTH SCROLL", "Lenis 120fps inertia engine + GSAP ticker sync"],
                ["UI RUNTIME", "React 19 with useLayoutEffect Context Isolation"],
                ["ANIMATION ENGINE", "GSAP 3.15 + ScrollTrigger Master Scrubbing"],
                ["AUDIO SYSTEM", "Procedural Web Audio API (Zero external media files)"],
                ["STYLE ARCHITECTURE", "Tailwind CSS v4 + Hardware Accelerated CSS Custom Properties"],
                ["ACCESSIBILITY", "WCAG AA Standard + prefers-reduced-motion safe paths"],
                ["ASSET ORIGIN", "100% Procedural SVG & Canvas (Zero external image dependencies)"],
              ].map(([key, val]) => (
                <div key={key} className="flex flex-col sm:flex-row justify-between py-2 border-b border-white/5 gap-1">
                  <span className="text-white/40 tracking-wider text-[11px]">{key}</span>
                  <span className="text-white/80 text-right sm:max-w-xs">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer
        className="relative border-t border-white/10 py-10 px-6 md:px-16 bg-[#020204] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-custom text-[11px] text-white/40 z-20"
        role="contentinfo"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>ASTRA // DIGITAL MOTION SYSTEM</span>
        </div>
        <div>
          <span>PORTFOLIO EXHIBITION // PRODUCTION READY</span>
        </div>
        <div>
          <span className="text-violet-400">© 2026 ASTRA ALL RIGHTS RESERVED</span>
        </div>
      </footer>
    </main>
  );
}
