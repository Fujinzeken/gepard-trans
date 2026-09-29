import Link from "next/link";
import TiltCard from "./tilt-card";

type Testimonial = {
  quote: string;
  name: string;
  company: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "True professionals! Appreciate your high level of professionalism and fast response! Yes, I recommend this company.",
    name: "Alex",
    company: "HMD Transport Inc",
  },
  {
    quote:
      "Great service. We were kept up to date from the moment we booked the load. Thank you!",
    name: "Connor McAfee",
    company: "LYNC Logistics, LLC",
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

/** Dispatch-ticket card: amber spine, quote, attribution, verified footer.
 *  `aria-hidden` on duplicate runs keeps screen readers to a single pass. */
function Ticket({ t, hidden }: { t: Testimonial; hidden?: boolean }) {
  return (
    <TiltCard max={6} className="w-[320px] shrink-0 rounded-xl md:w-[380px]">
      <figure
        aria-hidden={hidden}
        className="relative h-full w-full overflow-hidden rounded-xl border border-graphite-800 bg-graphite-850"
      >
      {/* Amber spine */}
      <span className="absolute inset-y-0 left-0 w-1 bg-signal-500" aria-hidden />

      <div className="flex flex-col gap-5 p-6 pl-7 md:p-7 md:pl-8">
        <blockquote className="text-sm leading-relaxed text-fog-200 md:text-[15px]">
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        <figcaption className="flex items-baseline gap-2">
          <span className="font-display text-base font-bold uppercase tracking-wide text-fog-50">
            {t.name}
          </span>
          <span className="text-xs text-fog-400">{t.company}</span>
        </figcaption>

        <div className="flex items-center gap-2 border-t border-graphite-800 pt-4 text-[11px] font-semibold uppercase tracking-wider text-verdict-500">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="m5.2 8.2 1.9 1.9 3.7-4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Delivered on time
        </div>
      </div>
    </figure>
    </TiltCard>
  );
}

/** One continuous run of tickets, duplicated for the seamless -50% loop. */
function TickerRun({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div aria-hidden={ariaHidden} className="flex w-max gap-4 pr-4">
      {TESTIMONIALS.map((t) => (
        <Ticket key={`${t.name}-${ariaHidden ? "dup" : "orig"}`} t={t} />
      ))}
      <Link
        href="/#contact"
        tabIndex={ariaHidden ? -1 : 0}
        className="group flex w-[320px] shrink-0 flex-col justify-between rounded-xl border border-signal-500/40 bg-signal-500/10 p-6 pl-7 transition-colors duration-300 hover:bg-signal-500/20 md:w-[380px] md:p-7 md:pl-8"
      >
        <p className="font-display text-2xl font-bold uppercase italic leading-tight tracking-tight text-fog-50 md:text-3xl">
          Your load
          <br />
          <span className="text-signal-500">next</span>
        </p>
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-signal-500 transition-colors duration-150 group-hover:text-signal-300">
          Get a quote
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>
    </div>
  );
}

export default function SectionTestimonials() {
  return (
    <section className="overflow-hidden bg-graphite-950 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="fade-up font-display text-4xl font-bold uppercase italic tracking-tight text-fog-50 md:text-5xl">
            What our <span className="text-signal-500">clients say</span>
          </h2>
          <p className="fade-up max-w-xs text-sm text-fog-400" style={{ animationDelay: "100ms" }}>
            Unfiltered notes from brokers and shippers — straight off the load board.
          </p>
        </div>
      </div>

      {/* Full-bleed ticker — bleeds past the container for a load-board feel.
          Hovering either row pauses it so quotes can be read in full. */}
      <div
        className="ticker-viewport mt-12 space-y-4 md:mt-16"
        style={{ "--ticker-duration": "70s" } as React.CSSProperties}
      >
        <div className="ticker-track flex w-max">
          <TickerRun />
          <TickerRun ariaHidden />
        </div>
        <div
          className="ticker-track ticker-track--reverse flex w-max"
          style={{ "--ticker-duration": "90s" } as React.CSSProperties}
        >
          {/* Row 2 runs the reversed order so both rows don't mirror identically */}
          <div className="flex w-max gap-4 pr-4">
            {[...TESTIMONIALS].reverse().map((t) => (
              <Ticket key={`${t.name}-r2`} t={t} />
            ))}
          </div>
          <div aria-hidden className="flex w-max gap-4 pr-4">
            {[...TESTIMONIALS].reverse().map((t) => (
              <Ticket key={`${t.name}-r2-dup`} t={t} hidden />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}