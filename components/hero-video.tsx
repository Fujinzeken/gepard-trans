"use client";

import { useEffect, useRef } from "react";

/* Progressive hero clip — full-bleed, muted, looping. Starts playback as soon
   as the first frames are buffered so the poster isn't stuck waiting for the
   whole ~24MB file. Reduced-motion visitors never mount the element. */

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tryPlay = () => {
      const p = el.play();
      if (p) void p.catch(() => {});
    };

    if (el.readyState >= 2) tryPlay();
    else el.addEventListener("loadeddata", tryPlay, { once: true });

    return () => el.removeEventListener("loadeddata", tryPlay);
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
      className="absolute inset-0 h-full w-full object-cover object-center motion-reduce:hidden"
    >
      <source src="/hero-video.mp4?v=yard" type="video/mp4" />
    </video>
  );
}
