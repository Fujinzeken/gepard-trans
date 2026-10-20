"use client";

import { useCountUp } from "./use-count-up";

const STATS = [
  { label: "Years on the road", value: 5, suffix: "+" },
  { label: "Cargos delivered", value: 20000, suffix: "+" },
  { label: "Trucks in operation", value: 100, suffix: "+" },
  { label: "US ZIP codes covered", value: 96, suffix: "%" },
];

function Stat({ label, value, suffix }: (typeof STATS)[number]) {
  const [ref, display] = useCountUp(value, 1800);
  return (
    <li ref={ref as React.RefObject<HTMLLIElement | null>} className="border-l-2 border-signal-500 pl-4 text-left">
      <p className="font-display text-3xl font-bold italic tracking-tight text-fog-50 md:text-4xl">
        {display.toLocaleString("en-US")}
        <span className="text-signal-300">{suffix}</span>
      </p>
      <p className="mt-1 text-xs uppercase tracking-wider text-fog-300">{label}</p>
    </li>
  );
}

export default function HeroStats() {
  return (
    <ul className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-6 border-t border-fog-50/20 pt-6 sm:grid-cols-4">
      {STATS.map((s) => (
        <Stat key={s.label} {...s} />
      ))}
    </ul>
  );
}
