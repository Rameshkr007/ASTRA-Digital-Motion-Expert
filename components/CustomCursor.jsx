"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * CustomCursor — premium context-aware cursor system for desktop.
 * - Precision dot that follows mouse instantly
 * - Smooth lagging ring with GSAP quickTo
 * - Context states:
 *   - Over main visual: expands, label shows "EXPLORE"
 *   - Over CTA buttons: expands, label shows "OPEN"
 *   - Over general interactive elements: ring expands smoothly
 * - Built using event delegation for dynamic elements
 * - Completely disabled on touch devices and prefers-reduced-motion
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Disable on touch devices & reduced motion
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    // Use GSAP quickTo for 60-120fps mouse following
    const xToDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power3" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power3" });
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.18, ease: "power2.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.18, ease: "power2.out" });
    const xToLabel = gsap.quickTo(label, "x", { duration: 0.18, ease: "power2.out" });
    const yToLabel = gsap.quickTo(label, "y", { duration: 0.18, ease: "power2.out" });

    let isVisible = false;

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      if (!isVisible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
        isVisible = true;
      }

      xToDot(x - 4);
      yToDot(y - 4);
      xToRing(x - 18);
      yToRing(y - 18);
      xToLabel(x + 18);
      yToLabel(y - 8);
    };

    const onMouseLeaveDoc = () => {
      gsap.to([dot, ring, label], { opacity: 0, duration: 0.3 });
      isVisible = false;
    };

    // Context handling via event delegation
    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]");
      if (cursorTarget) {
        const mode = cursorTarget.getAttribute("data-cursor");
        if (mode === "explore") {
          gsap.to(ring, {
            width: 64,
            height: 64,
            borderColor: "rgba(124, 91, 245, 0.8)",
            backgroundColor: "rgba(124, 91, 245, 0.08)",
            duration: 0.3,
            ease: "power2.out",
          });
          label.textContent = "EXPLORE";
          gsap.to(label, { opacity: 1, duration: 0.2 });
          return;
        } else if (mode === "open") {
          gsap.to(ring, {
            width: 64,
            height: 64,
            borderColor: "rgba(0, 212, 255, 0.8)",
            backgroundColor: "rgba(0, 212, 255, 0.08)",
            duration: 0.3,
            ease: "power2.out",
          });
          label.textContent = "OPEN";
          gsap.to(label, { opacity: 1, duration: 0.2 });
          return;
        }
      }

      // Check general interactive elements (buttons, links)
      const interactive = target.closest("a, button, [role='button'], input, select");
      if (interactive) {
        gsap.to(ring, {
          width: 48,
          height: 48,
          borderColor: "rgba(240, 240, 248, 0.8)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(label, { opacity: 0, duration: 0.15 });
        return;
      }

      // Normal state
      gsap.to(ring, {
        width: 36,
        height: 36,
        borderColor: "rgba(124, 91, 245, 0.6)",
        backgroundColor: "transparent",
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.to(label, { opacity: 0, duration: 0.15 });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeaveDoc);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeaveDoc);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
        style={{ opacity: 0, pointerEvents: "none" }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
        style={{ opacity: 0, pointerEvents: "none" }}
      />
      <div
        ref={labelRef}
        className="cursor-label font-mono-custom"
        aria-hidden="true"
        style={{ opacity: 0, pointerEvents: "none" }}
      />
    </>
  );
}
