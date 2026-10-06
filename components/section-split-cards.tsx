import Image from "next/image";
import Link from "next/link";

/* Prime-style alternating split rows — second pass. The first pass copied
 * Prime's structure but none of its craft: a flat white column, floating
 * text stats, and a hard seam. What actually makes Prime's #why-prime read
 * as designed:
 *
 *   1. Photography graded to the brand. Prime's photos are color-graded to
 *      their palette; ours are stock. So the images here run through a red
 *      duotone (grayscale -> signal multiply -> graphite depth gradient),
 *      which both art-directs the stock shots and kills their "stock" look.
 *   2. Density in the copy column. Ghost index numerals, a red-dash eyebrow,
 *      a checklist of concrete proof points, and a secondary action line —
 *      the column carries itself instead of floating in dead space.
 *   3. Designed stats. Each proof point gets a signal rule, display-italic
 *      value and tracked uppercase label, right-aligned into the photo's
 *      scrim — Prime's "9,000+ / 24/7 / TOP PAY" stack, properly typeset.
 *   4. A seam that's drawn, not accidental. A full-height signal hairline
 *      sits on the photo's inner edge; rows alternate so the seams mirror.
 *
 * No app-store band — Gepard has no driver app, so that Prime slot is
 * dropped rather than faked. */

type SplitRow = {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  cta: string;
  href: string;
  secondary: { text: string; href: string };
  image: string;
  alt: string;
  stats: { value: string; label: string }[];
  photoSide: "left" | "right";
};

const PHONE = "+1 (262) 256-3782";

const ROWS: SplitRow[] = [
  {
    index: "01",
    eyebrow: "Drive for Gepard",
    title: "Start your career",
    body: "Become part of the fleet that keeps America rolling. Whether you're an experienced driver or just getting your CDL, you get modern equipment, a dispatch team that picks up the phone, and a company that treats you like family.",
    points: [
      "Late-model tractors, maintained in-house",
      "Consistent home time — no ghost loads",
      "Weekly pay, transparent per-mile rates",
    ],
    cta: "Apply now",
    href: "/drive-for-us",
    secondary: { text: `or call recruiting — ${PHONE}`, href: `tel:+12622563782` },
    image: "/driver.webp",
    alt: "Gepard Trans driver behind the wheel at sunset",
    stats: [
      { value: "100+", label: "Trucks in operation" },
      { value: "24/7", label: "Dispatch, around the clock" },
      { value: "5+", label: "Years on the road" },
    ],
    photoSide: "right",
  },
  {
    index: "02",
    eyebrow: "Our fleet",
    title: "Modern equipment, ready to roll",
    body: "Behind every load is a fleet of late-model Kenworth and Freightliner Cascadia tractors, paired with the trailer your freight actually needs — and kept road-ready by our own maintenance program, not a third-party shop.",
    points: [
      "Dry van, reefer, and flatbed trailers",
      "Model years 2021–2025, no outrun trucks",
      "96% of US ZIP codes covered",
    ],
    cta: "See the fleet",
    href: "/fleet",
    secondary: { text: `or talk to dispatch — ${PHONE}`, href: `tel:+12622563782` },
    image: "/fleet.webp",
    alt: "Gepard Trans red semi trucks lined up at the yard",
    stats: [
      { value: "2021–25", label: "Tractor model years" },
      { value: "3", label: "Trailer types on hand" },
      { value: "96%", label: "US ZIP codes covered" },
    ],
    photoSide: "left",
  },
];

function SplitEntry({ row }: { row: SplitRow }) {
  const photoOnRight = row.photoSide === "right";

  const photo = (
    <div className="group relative h-72 w-full overflow-hidden sm:h-96 lg:h-auto lg:min-h-[36rem]">
      {/* Brand duotone: grayscale source -> signal-red multiply wash -> graphite
          depth gradient. Slows to a subtle zoom on hover. */}
      <Image
        src={row.image}
        alt={row.alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="scale-[1.03] object-cover object-center grayscale transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
      />
      <div
        className="absolute inset-0 bg-signal-600 opacity-50 mix-blend-multiply"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-graphite-950/90 via-graphite-950/10 to-graphite-950/30"
        aria-hidden
      />
      {/* Editorial inner frame, echoing Prime's inset-image treatment */}
      <div
        className="pointer-events-none absolute inset-4 hidden border border-fog-50/15 lg:block"
        aria-hidden
      />
      {/* Drawn seam: full-height signal hairline on the photo's inner edge */}
      <div
        className={`absolute top-0 z-20 h-full w-1 bg-signal-500 ${
          photoOnRight ? "left-0" : "right-0"
        }`}
        aria-hidden
      />
      {/* Proof stack — signal rule, display value, tracked label */}
      <div
        className={`absolute bottom-10 z-10 flex flex-col gap-6 ${
          photoOnRight ? "right-0 items-end pr-10 md:pr-14" : "left-0 items-start pl-10 md:pl-14"
        }`}
      >
        {row.stats.map((stat) => (
          <div key={stat.value} className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            <span className="mb-2.5 block h-0.5 w-9 bg-signal-500" aria-hidden />
            <p className="font-display text-4xl font-bold italic leading-none tracking-tight text-fog-50 md:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-fog-200/90">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const copy = (
    <div className="relative flex items-center overflow-hidden px-6 py-16 md:px-16 lg:py-24 lg:px-16 xl:px-24">
      {/* Ghost index numeral — oversized, outlined, bleeding off the outer edge */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 select-none font-display text-[11rem] font-bold italic leading-none md:text-[14rem]"
        style={{
          WebkitTextStroke: "1.5px rgba(17,19,24,0.09)",
          color: "transparent",
          ...(photoOnRight ? { left: "-1rem" } : { right: "-1rem" }),
        }}
      >
        {row.index}
      </span>

      <div className="relative max-w-xl">
        <p className="fade-up flex items-center gap-3">
          <span className="h-px w-10 bg-signal-500" aria-hidden />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-signal-600">
            {row.eyebrow}
          </span>
        </p>
        <h3
          className="fade-up mt-6 font-display text-5xl font-bold uppercase italic leading-[0.92] tracking-tight text-graphite-950 md:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          {row.title}
        </h3>
        <p
          className="fade-up mt-7 text-base leading-relaxed text-graphite-600 md:text-lg"
          style={{ animationDelay: "140ms" }}
        >
          {row.body}
        </p>

        {/* Proof checklist — the density Prime earns with real copy */}
        <ul className="fade-up mt-8 space-y-3.5" style={{ animationDelay: "180ms" }}>
          {row.points.map((point) => (
            <li
              key={point}
              className="flex items-center gap-3 text-sm font-medium text-graphite-700 md:text-base"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal-500/15 text-signal-600">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path
                    d="M2 6.2 4.8 9 10 3.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {point}
            </li>
          ))}
        </ul>

        <div
          className="fade-up mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
          style={{ animationDelay: "220ms" }}
        >
          <Link
            href={row.href}
            className="group/btn inline-flex items-center gap-2.5 rounded-full bg-signal-500 px-8 py-4 text-xs font-bold uppercase tracking-wider text-graphite-950 shadow-[0_10px_30px_-12px_rgba(226,32,56,0.55)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-signal-600 hover:text-fog-50"
          >
            {row.cta}
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            >
              <path
                d="M2 8h11M9 3.5 13.5 8 9 12.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <a
            href={row.secondary.href}
            className="border-b border-graphite-500/40 pb-0.5 text-xs font-semibold uppercase tracking-wider text-graphite-600 transition-colors duration-150 hover:border-signal-500 hover:text-signal-600"
          >
            {row.secondary.text}
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-2">
      {row.photoSide === "left" ? (
        <>
          {photo}
          {copy}
        </>
      ) : (
        <>
          {copy}
          {photo}
        </>
      )}
    </div>
  );
}

export default function SectionSplitCards() {
  return (
    <section id="drive" className="bg-fog-50">
      {ROWS.map((row) => (
        <SplitEntry key={row.eyebrow} row={row} />
      ))}
    </section>
  );
}
