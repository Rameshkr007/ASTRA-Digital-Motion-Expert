# ASTRA — Digital Motion Experience

> *"Motion that responds to you."*

An original, production-grade scroll-driven digital hero experience built with **Next.js 15**, **React 19**, **GSAP ScrollTrigger**, **Lenis**, and **Tailwind CSS v4**. Designed as a portfolio showcase and technical interview demonstration.

---

## 🌟 Live Demo & Architecture Highlights

- **Normalized Scroll Scrubbing** — 320vh pinned viewport driven by a single master GSAP timeline.
- **Bi-directional Scrub** — Scrolling forward advances the narrative; scrolling backward smoothly reverses it.
- **Lenis 120fps Smooth Scrolling** — Seamless inertia scrolling bound directly to GSAP's ticker.
- **100% Original Vector & CSS Composition** — Zero external image/video assets. No copyright dependencies.
- **Interactive 3D Mouse Parallax** — Holographic gyro-tilt responds to cursor movements in 3D space (`perspective: 1200px`).
- **7-Stage Narrative Storytelling** — Intro → Depth → Orbit → Break Apart → Data Mode → Reassembly → Final Frame.
- **Procedural Web Audio Engine** — Pure code-generated sound synthesis (ambient cyber harmonic drone, UI hover chimes, and scroll velocity frequency modulation).
- **Adaptive Canvas Particles** — Lightweight particle field (55 desktop / 25 mobile) with real-time velocity streaking and Page Visibility API pause.
- **Context-Aware Dynamic Cursor** — Precision dot and ring with `EXPLORE`, `OPEN`, and expansion states via event delegation (touch-safe).
- **Magnetic CTA Interaction** — Elastic hover pull (max 10px) with GSAP `quickTo`.
- **Accessibility First** — Full `prefers-reduced-motion: reduce` safe path, visible focus states, ARIA roles, and `<noscript>` fallback.

---

## 📐 7-Stage Scroll Narrative

```
Master ScrollTrigger Timeline (Progress 0.00 → 1.00)
│
├── STAGE 01: INTRO       [0.00 → 0.10]  "ENTER THE SYSTEM" // Centered core, ambient glow, subtle drift
├── STAGE 02: DEPTH       [0.10 → 0.25]  "DEPTH // 01" // Object scales forward, letters disperse with parallax
├── STAGE 03: ORBIT       [0.25 → 0.40]  Camera orbit illusion // 3D tilt, floating labels (CORE, ENERGY, MOTION, SYSTEM)
├── STAGE 04: BREAK APART [0.40 → 0.55]  Core separates into 4 isometric layers (CORE, FRAME, ENERGY, SIGNAL) & crystalline shards scatter
├── STAGE 05: DATA MODE   [0.55 → 0.72]  Telemetry visualization // Performance counters (92%, 3.8x, 68%) count up/down with scroll
├── STAGE 06: REASSEMBLY  [0.72 → 0.88]  Components snap back together // Crossfade to "MOVE BEYOND LIMITS"
└── STAGE 07: FINAL FRAME [0.88 → 1.00]  ASTRA endcard // "MOTION WITHOUT LIMITS" + Magnetic CTA "EXPLORE EXPERIENCE →"
```

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| **Next.js 15** | App Router, Server Components, Production Optimization |
| **React 19** | Component Architecture, Custom Hooks (`useGsap`, `useLenis`, `useReducedMotion`) |
| **GSAP 3.15** | Core Animation Engine |
| **GSAP ScrollTrigger** | Master Scrubbed Timeline & Scroll Velocity Telemetry |
| **Lenis** | 120fps Inertia Smooth Scrolling |
| **Tailwind CSS v4** | Hardware-Accelerated Design Tokens & Micro-Interactions |
| **Space Grotesk** | Display Typography |
| **Space Mono** | Metadata & Telemetry Typography |
| **Web Audio API** | Procedural Sound Synthesis (Ambient hum, hover chimes, velocity mod) |
| **HTML5 Canvas API** | Lightweight Particle System with High-DPI DPR Clamping |

---

## ⚡ Performance Engineering

1. **Pure Compositor Properties**: All animations strictly mutate `transform`, `opacity`, `scale`, `rotation`, and `translate3d`. No layout reflows (`width`, `height`, `margin`, `top`) during scrub.
2. **`will-change` Declarations**: Applied strategically to animated layers for dedicated GPU composition passes.
3. **Single Master Timeline**: Avoided dozens of uncoordinated scroll listeners by binding all stages to one scrubbed timeline.
4. **GSAP `quickTo`**: Used for the custom cursor, magnetic button pull, and 3D mouse parallax tilt to eliminate memory allocations in mousemove loops.
5. **Page Visibility API**: Particle canvas pauses automatically (`cancelAnimationFrame`) when the user switches tabs.
6. **Zero External Assets**: No 3D GLTF models, heavy raster PNGs, or unoptimized media. Instant first-paint and zero network latency.

---

## ♿ Accessibility & Standards

- **Reduced Motion Support**: Detects `prefers-reduced-motion: reduce` and immediately presents content in static, fully readable layouts without aggressive motion.
- **Touch-Device Intelligence**: Dynamic cursor and magnetic hover are disabled on touch screens (`(hover: none)`).
- **Screen Reader Friendly**: Proper ARIA landmarks (`banner`, `main`, `contentinfo`, `progressbar`), descriptive `aria-label`s, and live telemetry announcements.
- **No-JS `<noscript>` Fallback**: Static, readable presentation for environments where JavaScript is disabled.

---

## 📁 Project Structure

```
astra/
├── app/
│   ├── globals.css              # Design tokens, typography utilities, animations & accessibility
│   ├── layout.js                # Space Grotesk & Space Mono fonts + full SEO & OpenGraph tags
│   └── page.js                  # Master page orchestrator, telemetry console, and interactive sections
│
├── components/
│   ├── Loader.jsx               # Cinematic boot sequence (0 → 100%) with GSAP intro & auto-cleanup
│   ├── Navbar.jsx               # Minimal navigation (ASTRA, EXPERIENCE, SYSTEM, ABOUT, ● SYSTEM ONLINE)
│   ├── Hero.jsx                 # Master 7-stage pinned scroll experience with GSAP ScrollTrigger
│   ├── HeroVisual.jsx           # 3D gyro-tilt vector core (SVG, glowing shards, rings, compass indices)
│   ├── HeroStats.jsx            # Performance metrics: 92% Interaction, 3.8x Response, 68% Engagement
│   ├── ParticleField.jsx        # Canvas particle system with real-time scroll velocity responsiveness
│   ├── ScrollProgress.jsx       # Scroll intelligence indicator (0%, 25%, 50%, 75%, 100%, FWD ↓ / REV ↑)
│   ├── FloatingLabels.jsx       # Stage 3-4 labels (CORE, ENERGY, MOTION, SYSTEM) with connecting lines
│   ├── DataMode.jsx             # Stage 5 scroll-synchronized data visualization panel
│   ├── MagneticButton.jsx       # Subtle 8-12px magnetic elastic hover pull (GSAP quickTo)
│   ├── CustomCursor.jsx         # Context-aware cursor (EXPLORE / OPEN / expand states, touch-safe)
│   └── SectionTransition.jsx   # Non-linear section bridges with animated glow lines and coordinates
│
├── hooks/
│   ├── useGsap.js               # Safe React lifecycle GSAP context wrapper
│   ├── useLenis.js              # Lenis smooth scroll engine integration with GSAP ticker
│   ├── useMediaQuery.js         # Responsive matchMedia hook
│   └── useReducedMotion.js      # prefers-reduced-motion accessibility hook
│
├── utils/
│   └── audio.js                 # Procedural Web Audio synthesizer (ambient drone, hover chimes)
│
├── next.config.mjs              # Optimized Next.js configuration
├── package.json                 # Next.js 15, React 19, GSAP 3.15, Lenis, Tailwind CSS v4
└── README.md                    # Technical documentation
```

---

## 🚀 Local Development

```bash
# Navigate to the project directory
cd astra

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deployment Guide

### Deploying to Vercel (Recommended)
1. Push your repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Deploy with standard Next.js preset. Zero configuration required.

### Deploying to GitHub Pages (Static Export)
To deploy as a static site on GitHub Pages:
1. Update `next.config.mjs`:
   ```javascript
   const nextConfig = {
     output: "export",
     basePath: "/astra", // replace with your repository name
     images: { unoptimized: true },
   };
   export default nextConfig;
   ```
2. Run `npm run build`. The static files will be generated in `./out`.
3. Push `./out` to your `gh-pages` branch or configure GitHub Actions.

---

## 📜 License

MIT License. Crafted as an original, production-quality digital experience.
