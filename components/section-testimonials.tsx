import Link from "next/link";

/* Client testimonials — light-mode editorial rebuild.
 *
 * The previous version was a dark full-bleed marquee: fun to watch, but the
 * quotes sat in 380px tiles at 14px, so nothing was ever actually *read* —
 * and it was the only dark band on an otherwise light page, so it read as a
 * leftover rather than a choice. This pass promotes the strongest quote to a
 * full-width editorial block (giant ghost quotation mark, big italic type)
 * and keeps the rest as a quiet supporting grid. Same craft language as the
 * split-card rows: red-dash eyebrow, ghost display type, drawn signal
 * seams, verified footer.
 *
 * No client JS — the TiltCard dependency and ticker CSS are gone. */

type Testimonial = {
  quote: string;
  name: string;
  company: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Great service. We were kept up to date from the moment we booked the load. Thank you!",
    name: "Connor McAfee",
    company: "LYNC Logistics, LLC",
  },
  {
    quote:
      "True professionals! Appreciate your high level of professionalism and fast response! Yes, I recommend this company.",
    name: "Alex",
    company: "HMD Transport Inc",
  },
  {
    quote:
      "You guys are good to go! Thank you so much! Tell your drivers they are my favorite!",
    name: "Ashley Davidson",
    company: "TMC Logistics",
  },
  {
    quote: "Good morning team. Thank you for your flexibility! It's greatly appreciated.",
    name: "Wyatt Sieber",
    company: "NTG",
  },
  {
    quote: "Load went well. We appreciated the frequent location updates!",
    name: "JP Mattis",
    company: "Longship",
  },
];

const PHONE = "+1 (262) 256-3782";

/** Shared verified footer — verdict green, same as before, on light ink. */
function VerifiedFooter() {
  return (
    <div className="flex items-center gap-2 border-t border-fog-300 pt-4 text-[11px] font-semibold uppercase tracking-wider text-verdict-500">
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="m5.2 8.2 1.9 1.9 3.7-4.2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Delivered on time
    </div>
  );
}

/** Full-width editorial quote — the strongest note gets the loudest type. */
function FeaturedQuote({ t }: { t: Testimonial }) {
  return (
    <figure className="relative overflow-hidden border border-fog-300 bg-white p-8 md:p-14 lg:p-16">
      {/* Ghost quotation mark — outlined display type bleeding off the corner,
          echoing the ghost index numerals on the split rows. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 right-4 select-none font-display text-[16rem] font-bold italic leading-none md:-top-16 md:text-[24rem]"
        style={{ WebkitTextStroke: "1.5px rgba(17,19,24,0.07)", color: "transparent" }}
      >
        &ldquo;
      </span>

      {/* Drawn seam — the signal hairline motif from the split rows. */}
      <span className="absolute inset-y-0 left-0 w-1 bg-signal-500" aria-hidden />

      <div className="relative max-w-4xl">
        <blockquote className="fade-up font-display text-3xl font-bold uppercase italic leading-[1.05] tracking-tight text-graphite-950 md:text-5xl">
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        <figcaption
          className="fade-up mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          style={{ animationDelay: "120ms" }}
        >
          <div className="flex items-center gap-4">
            {/* Signal monogram block, mirroring the stat typesetting */}
            <span className="flex h-11 w-11 items-center justify-center bg-signal-500 font-display text-sm font-bold uppercase text-fog-50">
              {t.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </span>
            <div>
              <div className="font-display text-base font-bold uppercase tracking-wide text-graphite-950">
                {t.name}
              </div>
              <div className="text-xs font-medium uppercase tracking-wider text-graphite-500">
                {t.company}
              </div>
            </div>
          </div>
          <div className="min-w-[180px] flex-1 md:max-w-xs">
            <VerifiedFooter />
          </div>
        </figcaption>
      </div>
    </figure>
  );
}

/** Supporting card: index numeral, quote, attribution, verified footer.
 *  The signal top rule draws in on hover — the seam motif, animated. */
function QuoteCard({ t, index, delay }: { t: Testimonial; index: string; delay: number }) {
  return (
    <figure
      className="fade-up group relative flex flex-col justify-between overflow-hidden border border-fog-300 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(17,19,24,0.35)]"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Seam draws in from the left on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-signal-500 transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:scale-x-100"
      />

      <div>
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-signal-600">
            {index}
          </span>
          <span aria-hidden className="font-display text-4xl font-bold italic leading-none text-fog-300">
            &rdquo;
          </span>
        </div>

        <blockquote className="mt-4 text-sm leading-relaxed text-graphite-700 md:text-[15px]">
          {t.quote}
        </blockquote>
      </div>

      <div className="mt-8">
        <figcaption className="flex items-baseline gap-2">
          <span className="font-display text-sm font-bold uppercase tracking-wide text-graphite-950">
            {t.name}
          </span>
          <span className="text-xs text-graphite-500">{t.company}</span>
        </figcaption>
        <div className="mt-4">
          <VerifiedFooter />
        </div>
      </div>
    </figure>
  );
}

export default function SectionTestimonials() {
  const [featured, ...rest] = TESTIMONIALS;

  return (
    <section className="border-t border-fog-200 bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-24">
        {/* Header — red-dash eyebrow + display headline, same rhythm as the
            split rows so the page reads as one system. */}
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="fade-up flex items-center gap-3">
              <span className="h-[3px] w-8 bg-signal-500" aria-hidden />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-signal-600">
                Client feedback
              </span>
            </p>
            <h2
              className="fade-up mt-6 max-w-2xl font-display text-5xl font-bold uppercase italic leading-[0.92] tracking-tight text-graphite-950 md:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              Straight from the <span className="text-signal-600">load board</span>
            </h2>
          </div>
          <p
            className="fade-up max-w-xs text-sm leading-relaxed text-graphite-600"
            style={{ animationDelay: "140ms" }}
          >
            Unfiltered notes from brokers and shippers we move freight for — every one delivered on time.
          </p>
        </div>

        {/* Featured quote */}
        <div className="fade-up mt-14 md:mt-20" style={{ animationDelay: "180ms" }}>
          <FeaturedQuote t={featured} />
        </div>

        {/* Supporting grid */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((t, i) => (
            <QuoteCard
              key={t.name}
              t={t}
              index={String(i + 2).padStart(2, "0")}
              delay={220 + i * 60}
            />
          ))}
        </div>

        {/* CTA row — red pill + phone secondary, matching the split rows */}
        <div
          className="fade-up mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-6 border-t border-fog-300 pt-10"
          style={{ animationDelay: "300ms" }}
        >
          <p className="font-display text-2xl font-bold uppercase italic leading-tight tracking-tight text-graphite-950 md:text-3xl">
            Your load <span className="text-signal-600">next</span>
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/#contact"
              className="group/btn inline-flex items-center gap-2.5 rounded-full bg-signal-500 px-8 py-4 text-xs font-bold uppercase tracking-wider text-graphite-950 shadow-[0_10px_30px_-12px_rgba(226,32,56,0.55)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-signal-600 hover:text-fog-50"
            >
              Get a quote
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
              href="tel:+12622563782"
              className="border-b border-graphite-500/40 pb-0.5 text-xs font-semibold uppercase tracking-wider text-graphite-600 transition-colors duration-150 hover:border-signal-500 hover:text-signal-600"
            >
              or call dispatch — {PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}