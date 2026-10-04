"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * useGsap — wraps GSAP context for safe React integration.
 * Automatically reverts animations on unmount.
 *
 * @param {function} callback - GSAP animation setup function
 * @param {React.RefObject} scope - container ref for GSAP context
 * @param {Array} deps - dependency array
 */
export function useGsap(callback, scope, deps = []) {
  const ctx = useRef(null);

  useEffect(() => {
    ctx.current = gsap.context(callback, scope);
    return () => ctx.current?.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ctx;
}
