"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * MagneticButton — CTA button with subtle magnetic hover pull.
 * Maximum 10px movement, respects reduced motion.
 */
export default function MagneticButton({ children, className = "", onClick, dataCursor = "open", ...props }) {
  const btnRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const btn = btnRef.current;
    if (!btn) return;

    const MAX_MOVE = 10;

    const onMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      gsap.to(btn, {
        x: dx * MAX_MOVE,
        y: dy * MAX_MOVE,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
    };

    btn.addEventListener("mousemove", onMouseMove);
    btn.addEventListener("mouseleave", onMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", onMouseMove);
      btn.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [reduced]);

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      data-cursor={dataCursor}
      className={`magnetic-btn ${className}`}
      {...props}
    >
      <span className="magnetic-btn-inner">{children}</span>
    </button>
  );
}
