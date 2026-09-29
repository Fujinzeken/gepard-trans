"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";
import { useInView } from "./use-in-view";

/** Animated integer count-up, fired once when the element scrolls into view.
 *  Returns [ref, displayValue]. Respects prefers-reduced-motion (jumps to end). */
export function useCountUp(target: number, durationMs = 1400): [React.RefObject<HTMLDivElement | null>, number] {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      if (reducedMotion) {
        setValue(target);
        return;
      }
      // ease-out-quart
      setValue(Math.round(target * (1 - Math.pow(1 - t, 4))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reducedMotion, target, durationMs]);

  return [ref, value];
}