"use client";

import { useEffect, useState } from "react";

/** Returns true/false once mounted, null before hydration. */
export function useWebGL(): boolean | null {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    const detect = () => {
      try {
        const canvas = document.createElement("canvas");
        setOk(Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl")));
      } catch {
        setOk(false);
      }
    };
    // call in a microtask callback rather than synchronously in the effect body
    const id = window.setTimeout(detect, 0);
    return () => window.clearTimeout(id);
  }, []);
  return ok;
}
