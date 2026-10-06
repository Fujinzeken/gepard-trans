"use client";

import Image from "next/image";
import { useCountUp } from "./use-count-up";
import TiltCard from "./tilt-card";
type Stat = {
  label: string;
  value: number;
  suffix?: string;
};

const STATS: Stat[] = [
  { label: "Years of experience", value: 5, suffix: "+" },
  { label: "Cargos delivered", value: 20000, suffix: "+" },
  { label: "US ZIP codes covered", value: 96, suffix: "%" },
  { label: "Trucks in operation", value: 100, suffix: "+" },
];

/* "Why choose us" — modelled on Prime's #why-prime split: one dominant photo
 * flush to the viewport's left edge, copy column on the light right half, and
 * the proof-point stat row beneath.
 *
 * The photo is hero.jpg — the one unused image left in /public, and the reason
 * this slot exists at all. At 5081x2638 (1.93:1) it is the only wide source in
 * the set, so it gets the only wide slot: the left column lands at roughly
 * 1.4:1 on a 1440 desktop, which trims 28% of its width off the right edge
 * (object-cover, centered) instead of the 59% a 3:4 portrait tile would have
 * thrown away. The portrait pair that used to sit here (truck5.jpg,
 * contact.jpg) is retired rather than squeezed in beside a full-bleed photo —
 * Prime reads as credible because the truck is huge and the copy is quiet.
 *
 * The stats below are the actual "why": four proof points with count-up, kept
 * from the previous version of this section. */

function StatTile({ label, value, suffix }: Stat) {
  const [ref, display] = useCountUp(value);
  return (
    <TiltCard max={8} className="rounded-2xl">
      <div
        ref={ref}
        className="group relative h-full overflow-hidden rounded-2xl border border-graphite-900/10 bg-white p-6 transition-colors duration-300 hover:border-signal-500/40 md:p-8"
      >
        <span
          className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-signal-500/60 to-transparent"
          aria-hidden
        />
        <p className="text-sm font-medium text-graphite-600">{label}</p>
        <p className="mt-4 font-display text-5xl font-bold italic tracking-tight text-graphite-950 md:text-6xl">
          {display.toLocaleString("en-US")}
          <span className="text-signal-500">{suffix}</span>
        </p>
      </div>
    </TiltCard>
  );
}

export default function SectionIntro() {
  return (
    <section className="bg-fog-50">
      {/* Prime-style split: photo column full-bleed left, copy column right.
          The photo carries the section on desktop (no container, no padding);
          on tablet/phone it becomes a banner above the copy. */}
      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        <div className="relative h-72 w-full sm:h-96 lg:h-auto lg:min-h-[36rem]">
          <Image
            src="/hero.jpg"
            alt="A Gepard Trans tractor on the open highway"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="flex items-center px-6 py-16 md:px-16 lg:py-24 lg:pl-16 lg:pr-24">
          <div className="max-w-xl">
            <p className="fade-up flex items-center gap-3">
              <span className="h-px w-8 bg-signal-500" aria-hidden />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-signal-600">
                Why shippers choose Gepard
              </span>
            </p>
            <h2
              className="fade-up mt-5 font-display text-5xl font-bold uppercase italic leading-[0.95] tracking-tight text-graphite-950 md:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              The partner that answers at 2 a.m.
            </h2>
            <div
              className="fade-up mt-8 space-y-6 text-base leading-relaxed text-graphite-600 md:text-lg"
              style={{ animationDelay: "140ms" }}
            >
              <p>
                Through collaboration, integrity, and continuous innovation, we
                provide outstanding logistics services — safely, efficiently, and
                reliably. Our dedicated dispatch team is on hand{" "}
                <strong className="font-semibold text-graphite-950">24/7</strong> to
                keep your operations running seamlessly, no matter the time.
              </p>
              <p>
                Success is built on strong relationships with brokers and
                drivers. We work closely with every client to understand their
                unique needs and develop customized logistics solutions — dry
                van, reefer, or flatbed — that help them achieve their goals.
              </p>
            </div>
            <p
              className="fade-up mt-10"
              style={{ animationDelay: "200ms" }}
            >
              <a
                href="#contact"
                className="rounded-full bg-signal-500 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-graphite-950 transition-colors duration-150 hover:bg-signal-600 hover:text-fog-50"
              >
                Ship with us
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Proof points — the stat row from the previous intro, unchanged */}
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-16 md:pb-32 lg:px-24">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StatTile key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}