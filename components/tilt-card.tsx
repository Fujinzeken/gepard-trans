"use client";

import { useCallback, useRef } from "react";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Pointer-tracked 3D tilt (CSS perspective). Wrap any card to give it depth:
 * the card rotates toward the cursor and catches a moving glare highlight.
 * Respects prefers-reduced-motion and no-ops on touch (no hover to tilt with).
 */
export default function TiltCard({
  children,
  className = "",
  max = 7,
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  max?: number;
  glare?: boolean;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);
  const reduced = useReducedMotion();

  const apply = useCallback(
    (x: number, y: number) => {
      const inner = innerRef.current;
      const glareEl = glareRef.current;
      const outer = outerRef.current;
      if (!inner || !outer) return;
      const r = outer.getBoundingClientRect();
      const px = (x - r.left) / r.width; // 0..1
      const py = (y - r.top) / r.height;
      const rx = (0.5 - py) * max * 2;
      const ry = (px - 0.5) * max * 2;
      inner.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(0)`;
      if (glareEl) {
        glareEl.style.opacity = "1";
        glareEl.style.background = `radial-gradient(circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(255,255,255,0.14), transparent 55%)`;
      }
    },
    [max],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduced || e.pointerType === "touch") return;
      const { clientX, clientY } = e;
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        apply(clientX, clientY);
      });
    },
    [apply, reduced],
  );

  const reset = useCallback(() => {
    if (raf.current) {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    }
    const inner = innerRef.current;
    const glareEl = glareRef.current;
    if (inner) inner.style.transform = "";
    if (glareEl) glareEl.style.opacity = "0";
  }, []);

  return (
    <div
      ref={outerRef}
      className={`group/tilt ${className}`}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      <div
        ref={innerRef}
        className="relative h-full w-full transition-transform duration-200 ease-out will-change-transform"
      >
        {children}
        {glare && (
          <span
            ref={glareRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
          />
        )}
      </div>
    </div>
  );
}