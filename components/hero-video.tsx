"use client";

import { useEffect, useRef } from "react";

/* Full-bleed hero clip — muted autoplay loop. muted is set on the DOM node
   (required for reliable autoplay). Faststart 720p MP4 streams first frames
   without waiting for the whole file. */

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.pause();
      return;
    }

    const tryPlay = () => {
      el.muted = true;
      void el.play().catch(() => {});
    };

    tryPlay();
    el.addEventListener("canplay", tryPlay);
    return () => el.removeEventListener("canplay", tryPlay);
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/dispatch.webp"
      src="/hero-video.mp4?v=720p2"
      className="absolute inset-0 z-[1] h-full w-full object-cover object-center"
    />
  );
}
