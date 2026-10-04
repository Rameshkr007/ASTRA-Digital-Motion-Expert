"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

/**
 * useLenis — integrates Lenis smooth scroll engine with GSAP ScrollTrigger ticker.
 * Provides 120fps interpolated inertia scrolling while keeping ScrollTrigger
 * pin and scrub completely synchronized without jitter.
 */
export function useLenis() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || reduced) return;

    // Check touch devices — Lenis can run on desktop or smooth touch
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return; // Allow native momentum on mobile for maximum responsiveness

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential ease
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Bind GSAP ticker to Lenis requestAnimationFrame
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
    };
  }, [reduced]);
}
