"use client";

import { useEffect, useRef, useState } from "react";

/** Returns [ref, inView]. `inView` flips true once the element enters the
 *  viewport and stays true (one-shot), so animations don't reverse on scroll-out. */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.35,
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    // Fallback for environments without IntersectionObserver: reveal after a tick.
    if (typeof IntersectionObserver === "undefined") {
      const t = setTimeout(() => setInView(true), 0);
      return () => {
        clearTimeout(t);
        observer.disconnect();
      };
    }
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}