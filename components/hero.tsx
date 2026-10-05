import Image from "next/image";

/* Homepage hero — a full-bleed photograph of the fleet at golden hour.
   The copy sits bottom-left over a two-axis scrim so the headline stays
   readable against both the bright sky and the dark tarmac. */

const EQUIPMENT = [
  { label: "53′ Dry Van", detail: "up to 45,000 lb payload" },
  { label: "53′ Reefer", detail: "−20°F to 75°F · 24/7 telemetry" },
  { label: "48′–53′ Flatbed", detail: "straps, chains & tarps" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[max(620px,calc(100svh-64px))] items-end overflow-hidden bg-graphite-950">
      {/* Decorative: the headline carries the meaning, so alt is empty */}
      <Image
        src="/hero.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Scrim — heaviest at the tarmac (copy), clear by the sky (truck) */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-graphite-950/95 from-0% via-graphite-950/55 via-30% to-graphite-950/15 to-100%"
        aria-hidden
      />
      {/* Extra veil behind the text column on wide screens */}
      <div
        className="absolute inset-0 hidden bg-gradient-to-r from-graphite-950/80 via-graphite-950/30 via-45% to-transparent md:block"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 text-fog-50 md:px-16 md:pb-20 lg:px-24">
        <p className="fade-up text-xs font-semibold uppercase tracking-[0.3em] text-signal-300">
          24/7 dispatch · nationwide coverage
        </p>
        <h1
          className="fade-up mt-4 max-w-4xl font-display text-5xl font-bold uppercase italic leading-[0.95] tracking-tight md:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          The right equipment for every load.
        </h1>
        <p
          className="fade-up mt-6 max-w-xl text-sm leading-relaxed text-fog-200 md:text-base"
          style={{ animationDelay: "140ms" }}
        >
          Dry van, reefer, and flatbed capacity across 96% of US ZIP codes —
          backed by a modern fleet and a dispatch team that answers around the
          clock.
        </p>
        <div
          className="fade-up mt-8 flex flex-wrap gap-3"
          style={{ animationDelay: "200ms" }}
        >
          <a
            href="#contact"
            className="rounded-full bg-signal-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-graphite-950 transition-colors duration-150 hover:bg-signal-600"
          >
            Ship with us
          </a>
          <a
            href="/drive-for-us"
            className="rounded-full border border-fog-50/30 px-6 py-3 text-xs font-bold uppercase tracking-wider text-fog-50 transition-colors duration-150 hover:border-fog-50 hover:bg-fog-50/10"
          >
            Drive with us
          </a>
        </div>

        {/* Equipment rail — the specs the old 3D showroom used to surface */}
        <ul className="mt-14 hidden gap-10 border-t border-fog-50/15 pt-6 sm:grid sm:grid-cols-3">
          {EQUIPMENT.map((item) => (
            <li
              key={item.label}
              className="border-l-2 border-signal-500/70 pl-4"
            >
              <p className="font-display text-xl font-bold uppercase tracking-tight">
                {item.label}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-fog-400">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
