"use client";

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

function StatTile({ label, value, suffix }: Stat) {
  const [ref, display] = useCountUp(value);
  return (
    <TiltCard max={8} className="rounded-2xl">
      <div
        ref={ref}
        className="group relative h-full overflow-hidden rounded-2xl border border-graphite-800 bg-graphite-850 p-6 transition-colors duration-300 hover:border-signal-500/40 md:p-8"
      >
        <span
          className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-signal-500/60 to-transparent"
          aria-hidden
        />
        <p className="text-sm font-medium text-fog-400">{label}</p>
        <p className="mt-4 font-display text-5xl font-bold italic tracking-tight text-fog-50 md:text-6xl">
          {display.toLocaleString("en-US")}
          <span className="text-signal-500">{suffix}</span>
        </p>
      </div>
    </TiltCard>
  );
}

export default function SectionIntro() {
  return (
    <section className="bg-graphite-950 px-6 py-24 text-fog-200 md:px-16 md:py-32 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <h2 className="fade-up font-display text-5xl font-bold uppercase italic leading-[0.95] tracking-tight text-fog-50 md:text-6xl">
            Scalable capacity
            <br />
            for <span className="text-signal-500">every load</span>
          </h2>
          <div className="space-y-6 text-base leading-relaxed text-fog-300 md:text-lg">
            <p>
              Through collaboration, integrity, and continuous innovation, we
              provide outstanding logistics services — safely, efficiently, and
              reliably. Our dedicated dispatch team is on hand{" "}
              <strong className="font-semibold text-fog-50">24/7</strong> to
              keep your operations running seamlessly, no matter the time.
            </p>
            <p>
              Success is built on strong relationships with brokers and
              drivers. We work closely with every client to understand their
              unique needs and develop customized logistics solutions — dry
              van, reefer, or flatbed — that help them achieve their goals.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
          {STATS.map((stat) => (
            <StatTile key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}