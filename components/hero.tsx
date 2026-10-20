import Image from "next/image";

import HeroVideo from "./hero-video";

/* Full-width hero under the solid white nav. Poster is LCP; HeroVideo streams
   a 720p faststart MP4 so first frames arrive without waiting on the full file. */

const EQUIPMENT = [
  { label: "53′ Dry Van", detail: "up to 45,000 lb payload" },
  { label: "53′ Reefer", detail: "−20°F to 75°F · 24/7 telemetry" },
  { label: "48′–53′ Flatbed", detail: "straps, chains & tarps" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[max(560px,calc(100svh-68px))] items-center overflow-hidden bg-graphite-950">
      <Image
        src="/dispatch.webp"
        alt=""
        fill
        preload
        sizes="100vw"
        className="z-0 object-cover object-center"
      />

      <HeroVideo />

      {/* Soft brand overlay for readable centered copy */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-graphite-950/55 via-graphite-950/40 to-graphite-950/65"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-signal-600/20 mix-blend-multiply"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-20 text-center md:px-10 md:py-24">
        <p className="fade-up">
          <span className="inline-block bg-signal-500 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white">
            24/7 dispatch · nationwide coverage
          </span>
        </p>
        <h1
          className="fade-up mt-5 font-display text-4xl font-bold uppercase italic leading-[0.95] tracking-tight text-fog-50 md:text-6xl lg:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          The right equipment for every load.
        </h1>
        <p
          className="fade-up mx-auto mt-6 max-w-xl text-sm leading-relaxed text-fog-200 md:text-base"
          style={{ animationDelay: "140ms" }}
        >
          Dry van, reefer, and flatbed capacity across 96% of US ZIP codes —
          backed by a modern fleet and a dispatch team that answers around the
          clock.
        </p>
        <div
          className="fade-up mt-8 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "200ms" }}
        >
          <a href="#contact" className="btn-primary">
            Ship with us
          </a>
          <a
            href="/drive-for-us"
            className="inline-flex items-center justify-center border border-fog-50 px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-fog-50 transition-colors duration-150 hover:bg-fog-50 hover:text-signal-600"
          >
            Drive with us
          </a>
        </div>

        <ul className="mx-auto mt-12 hidden max-w-3xl gap-8 border-t border-fog-50/20 pt-6 sm:grid sm:grid-cols-3">
          {EQUIPMENT.map((item) => (
            <li key={item.label} className="border-l-2 border-signal-500 pl-4 text-left">
              <p className="font-display text-lg font-bold uppercase tracking-tight text-fog-50 md:text-xl">
                {item.label}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-fog-300">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
