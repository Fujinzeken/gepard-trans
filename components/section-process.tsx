"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  { title: "Request a quote", body: "Tell us the lanes, equipment and weight. Dispatch replies fast — any hour, any day." },
  { title: "Pickup", body: "A Gepard tractor and the right trailer — dry van or reefer — arrives on schedule." },
  { title: "In transit", body: "Your load is monitored on the road, with a live dispatcher a call away 24/7." },
  { title: "Delivery", body: "Delivered on time, paperwork handled, ready for the next load." },
];

function Truck({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 32" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 6h34v16H2zM36 11h11l7 7v4H36z" />
      <circle cx="14" cy="25" r="4" fill="var(--color-graphite-950)" />
      <circle cx="44" cy="25" r="4" fill="var(--color-graphite-950)" />
    </svg>
  );
}

export default function SectionProcess() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const pct = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} id="how-it-works" className="scroll-mt-20 bg-graphite-950 px-6 py-24 text-fog-50 md:px-16 md:py-32 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <p className="flex items-center gap-3">
          <span className="h-px w-8 bg-signal-500" aria-hidden />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-signal-300">How it works</span>
        </p>
        <h2 className="mt-5 max-w-3xl font-display text-5xl font-bold uppercase italic leading-[0.95] tracking-tight md:text-6xl">
          From request to delivery in four steps
        </h2>

        <div className="relative mt-16 lg:mt-24">
          {/* Track — vertical on mobile, horizontal on lg */}
          <div className="absolute bottom-0 left-5 top-0 w-px bg-graphite-600 lg:bottom-auto lg:left-0 lg:right-0 lg:top-5 lg:h-px lg:w-auto" aria-hidden>
            <motion.div style={{ height: pct }} className="w-full bg-signal-500 lg:hidden" />
            <motion.div style={{ width: pct }} className="hidden h-full bg-signal-500 lg:block" />
          </div>
          <motion.div style={{ top: pct }} className="absolute left-5 z-10 -ml-4 -mt-4 text-signal-300 lg:hidden" aria-hidden>
            <Truck className="h-8 w-16 -rotate-90" />
          </motion.div>
          <motion.div style={{ left: pct }} className="absolute top-5 z-10 -ml-8 -mt-4 hidden text-signal-300 lg:block" aria-hidden>
            <Truck className="h-8 w-16" />
          </motion.div>

          <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                className="relative pl-16 lg:pl-0 lg:pt-16"
              >
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center border border-signal-500 bg-graphite-950 font-display text-lg font-bold text-signal-300">
                  {i + 1}
                </span>
                <h3 className="font-display text-2xl font-bold uppercase italic tracking-tight">{step.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-fog-300">{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
