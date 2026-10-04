# ASTRA — Digital Motion Experience

> *"Motion that responds to you."*

A premium, scroll-driven interactive hero experience built with Next.js, React, GSAP ScrollTrigger, and Tailwind CSS. Designed as a portfolio-quality frontend engineering demonstration.

---

## Overview

ASTRA is a futuristic digital landing experience where scroll becomes the primary navigation mechanism. The visitor controls the entire narrative through scrolling — forward plays the story, backward reverses it. The experience unfolds across 7 distinct stages, each with its own visual personality.

---

## Features

- **Cinematic Loader** — ASTRA boot sequence with real-time progress bar
- **7-Stage Scroll Narrative** — Intro → Depth → Orbit → Break Apart → Data Mode → Reassembly → Final Frame
- **Master GSAP Timeline** — Single `ScrollTrigger` drives all animations synchronously
- **Original SVG Visual** — Fully original geometric energy core (no external assets)
- **Canvas Particle System** — 55 particles with visibility API pause, DPR optimization
- **Custom Cursor** — Context-aware cursor with EXPLORE / OPEN states
- **Magnetic CTA** — Elastic hover pull with GSAP `quickTo`
- **Scroll Progress Indicator** — 0–100% with stage markers
- **Parallax Grid** — 6-layer depth system
- **Floating Labels** — CORE / ENERGY / MOTION / SYSTEM with connecting SVG lines
- **Data Mode** — Scroll-synchronized performance metrics (no random counting)
- **Reduced Motion Support** — Full `prefers-reduced-motion` safe path
- **No-JS Fallback** — Readable static content without JavaScript
- **Semantic HTML** — ARIA labels, roles, focus states throughout

---

## Tech Stack

| Technology | Role |
|---|---|
| **Next.js 15** | App Router, SSR, metadata API |
| **React 19** | Component architecture, hooks |
| **GSAP 3** | Animation engine |
| **GSAP ScrollTrigger** | Scroll-driven master timeline |
| **Tailwind CSS v4** | Utility styling |
| **Space Grotesk** | Display / body typography |
| **Space Mono** | Monospace / metadata typography |
| **Canvas API** | Particle field rendering |
| **SVG** | Original ASTRA visual |

---

## Animation Architecture

```
Master ScrollTrigger Timeline (0 → 1)
│
├── Stage 01: INTRO     [0.00 → 0.10]  Particles, static visual
├── Stage 02: DEPTH     [0.10 → 0.25]  Scale forward, text separates
├── Stage 03: ORBIT     [0.25 → 0.40]  Rotation, floating labels, parallax
├── Stage 04: BREAK     [0.40 → 0.55]  Layers scatter, SVG fragments
├── Stage 05: DATA      [0.55 → 0.72]  Performance metrics visualization
├── Stage 06: REASSEMBLY[0.72 → 0.88]  Layers return, new headline
└── Stage 07: FINAL     [0.88 → 1.00]  ASTRA endcard + CTA
```

GSAP Context is properly scoped to the Hero container ref, ensuring safe React lifecycle (no memory leaks, clean unmount via `ctx.revert()`).

`gsap.matchMedia()` handles responsive animation differences between desktop and mobile without code duplication.

---

## Performance

### Techniques Used

- **`will-change: transform`** on all animated elements
- **`transform` + `opacity` only** — no layout-triggering properties in animations
- **`gsap.quickTo`** for cursor following
- **Canvas DPR optimization** — `Math.min(devicePixelRatio, 2)` cap
- **Visibility API** — particle animation pauses when tab is hidden
- **Dynamic import** — `CustomCursor` is client-only, loaded with `next/dynamic` + `ssr: false`
- **No unnecessary React re-renders** — GSAP animates DOM refs directly, not state
- **Single master ScrollTrigger** — no dozens of independent scroll listeners
- **`scrub: 1.5`** — smooth scroll timeline interpolation

### Particle Count
- Desktop: 55 particles
- Mobile: 25 particles

---

## Accessibility

- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels on interactive regions
- `prefers-reduced-motion` respected — animations disabled, content remains readable
- Custom cursor hidden on touch devices (`hover: none`)
- Magnetic button disabled on touch devices
- `role="progressbar"` on scroll indicator
- No-JS `<noscript>` fallback with full content
- Keyboard navigation supported (nav links have visible focus states)
- Sufficient color contrast (WCAG AA compliant text)

---

## Responsive Design

| Breakpoint | Experience |
|---|---|
| 1440px+ | Full experience with horizontal layout |
| 768–1439px | Tablet — reduced parallax, adjusted sizing |
| 320–767px | Mobile — stacked layout, 25 particles, no cursor/magnetic |

On mobile:
- Custom cursor disabled
- Magnetic button disabled
- Particle count reduced to 25
- 3D rotation effects reduced
- Typography recalculated with `clamp()`

---

## Local Development

### Prerequisites
- Node.js 18+
- npm 9+

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/astra.git
cd astra

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Commands

```bash
npm run dev        # Development server (hot reload)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint check
```

---

## Deployment

### Vercel (Recommended — Zero Config)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect GitHub repo at vercel.com/new
```

### GitHub Pages (Static Export)

> Note: GitHub Pages requires static export. Add to `next.config.mjs`:

```js
const nextConfig = {
  output: "export",
  basePath: "/astra",        // Replace with your repo name
  assetPrefix: "/astra/",
  trailingSlash: true,
};
```

Then:

```bash
npm run build
# Deploys the `out/` directory to GitHub Pages via Actions
```

Add `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

---

## Project Structure

```
astra/
├── app/
│   ├── globals.css          # Design system, CSS variables, utilities
│   ├── layout.js            # Root layout, fonts, SEO metadata
│   └── page.js              # Main page entry point
│
├── components/
│   ├── Navbar.jsx           # Fixed navigation with status indicator
│   ├── Hero.jsx             # Master scroll experience (main component)
│   ├── HeroVisual.jsx       # Original SVG energy core visual
│   ├── HeroStats.jsx        # Performance metrics display
│   ├── ParticleField.jsx    # Canvas particle system
│   ├── ScrollProgress.jsx   # Scroll progress indicator
│   ├── FloatingLabels.jsx   # Stage 3-4 floating text + SVG lines
│   ├── MagneticButton.jsx   # Elastic hover CTA button
│   ├── CustomCursor.jsx     # Context-aware cursor system
│   ├── DataMode.jsx         # Stage 5 data visualization panel
│   └── Loader.jsx           # Cinematic boot sequence
│
├── hooks/
│   ├── useGsap.js           # GSAP context lifecycle hook
│   ├── useMediaQuery.js     # Reactive media query hook
│   └── useReducedMotion.js  # Prefers-reduced-motion detection
│
├── next.config.mjs          # Next.js configuration
├── postcss.config.mjs       # Tailwind CSS PostCSS config
└── README.md                # This file
```

---

## Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#050508` | Main background |
| `--bg-secondary` | `#0a0a12` | Secondary background |
| `--text-primary` | `#f0f0f8` | Primary text |
| `--text-secondary` | `rgba(240,240,248,0.55)` | Secondary text |
| `--text-muted` | `rgba(240,240,248,0.3)` | Metadata, labels |
| `--accent-violet` | `#7c5bf5` | Primary accent |
| `--accent-cyan` | `#00d4ff` | Secondary accent |
| `--accent-blue` | `#4a9eff` | Tertiary accent |

### Typography Scale

| Name | Usage | Font |
|---|---|---|
| Display | Hero headline (ASTRA) | Space Grotesk 800 |
| Hero | Stage headlines | Space Grotesk 700 |
| Supporting | Body, labels | Space Grotesk 400 |
| Metadata | Coordinates, tags | Space Mono 400 |

---

## Screenshots

> Add screenshots after deployment

---

## Live Demo

> Add live demo URL after deployment

---

## License

MIT — built as a portfolio/educational demonstration.

---

*ASTRA — Motion that responds to you.*
