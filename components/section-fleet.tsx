"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const PHOTOS = [
  { src: "/fleet/branded-studio.jpg", alt: "Gepard Trans Logistics branded blue tractor in studio lighting", span: "md:col-span-2 md:row-span-2" },
  { src: "/fleet/night-haul.jpg", alt: "Gepard Trans blue Cascadia with trailer parked at night", span: "md:col-span-2" },
  { src: "/fleet/fleet-lineup.jpg", alt: "Gepard Trans red, blue, and navy tractors lined up at the yard", span: "" },
  { src: "/fleet/volvo-reefer.jpg", alt: "Blue Volvo tractor with a white reefer trailer under clear skies", span: "" },
  { src: "/fleet/peterbilt-1833.jpg", alt: "Bright blue Peterbilt tractor unit 1833", span: "md:row-span-2" },
  { src: "/fleet/volvo-yard.jpg", alt: "Dark blue Volvo tractor with bull bar at the yard", span: "" },
  { src: "/fleet/cascadia-white.jpg", alt: "White Freightliner Cascadia parked beside a blue tractor", span: "" },
  { src: "/fleet/cascadia-yard.jpg", alt: "Bright blue Freightliner Cascadia at the yard", span: "md:col-span-2" },
];

export default function SectionFleet() {
  const [active, setActive] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setActive(null);
    opener.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setActive((i) => (i === null ? i : (i + d + PHOTOS.length) % PHOTOS.length)),
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active === null, close, step]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section id="fleet" className="scroll-mt-20 bg-fog-50 px-6 py-24 md:px-16 md:py-32 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <p className="flex items-center gap-3">
          <span className="h-px w-8 bg-signal-500" aria-hidden />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-signal-600">Our fleet</span>
        </p>
        <h2 className="mt-5 max-w-3xl font-display text-5xl font-bold uppercase italic leading-[0.95] tracking-tight text-graphite-950 md:text-6xl">
          Built to move your freight
        </h2>

        <ul className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {PHOTOS.map((p, i) => (
            <motion.li
              key={p.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className={`${p.span} min-h-0`}
            >
              <button
                type="button"
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setActive(i);
                }}
                aria-label={`Enlarge photo: ${p.alt}`}
                className="group relative block h-full w-full overflow-hidden rounded-xl bg-graphite-800"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-graphite-950/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Fleet photo viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-graphite-950/95 p-4 md:p-10"
          >
            <div className="relative h-full w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
              <Image key={active} src={PHOTOS[active].src} alt={PHOTOS[active].alt} fill sizes="100vw" className="object-contain" />
            </div>
            <button ref={closeRef} type="button" onClick={close} aria-label="Close" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center bg-signal-500 text-white md:right-8 md:top-8">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(d);
                }}
                aria-label={d < 0 ? "Previous photo" : "Next photo"}
                className={`absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-fog-50/40 text-fog-50 transition-colors hover:bg-fog-50 hover:text-graphite-950 ${d < 0 ? "left-3 md:left-8" : "right-3 md:right-8"}`}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d < 0 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} /></svg>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
