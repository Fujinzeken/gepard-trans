"use client";

import { useState } from "react";
import Link from "next/link";

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: "What types of loads do you handle?",
    a: "We specialize in transporting dry van, refrigerated (reefer), and flatbed loads across the United States.",
  },
  {
    q: "What types of trucks are in the Gepard Trans Logistics fleet?",
    a: "Our fleet includes Kenworth and Freightliner Cascadia trucks, with models ranging from 2021 to 2025.",
  },
  {
    q: "What qualifications are required for hiring drivers?",
    a: "Candidates must possess a CDL Class A license and have a minimum of 6 months of driving experience.",
  },
  {
    q: "What if a driver lacks experience?",
    a: "We offer comprehensive training programs conducted by professional instructors for drivers without prior experience.",
  },
  {
    q: "What kind of support do drivers receive?",
    a: "Our drivers benefit from 24/7 assistance provided by our dedicated dispatch, maintenance, Pre-Trip Inspection (PTI), and fuel teams.",
  },
  {
    q: "What incentives do you offer for drivers?",
    a: "We provide bonuses to each driver for maintaining a clean inspection record.",
  },
  {
    q: "What discounts are available for owner-operators?",
    a: "Owner-operators receive discounts at the UGL Truck Center repair shop and Montgomery Truck Wash.",
  },
];

export default function SectionFaq() {
  /* First question starts open — an all-collapsed accordion reads as a dead
   * wall of rules; one open answer teaches the interaction at a glance. */
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-fog-50 px-6 py-24 md:px-16 md:py-32 lg:px-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        {/* Left — header column, same craft layer as the other sections */}
        <div className="relative">
          {/* Ghost question mark — outlined display type bleeding off the
              column edge, kin to the split rows' ghost numerals and the
              testimonials' ghost quotation mark. */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-6 -top-14 hidden select-none font-display text-[13rem] font-bold italic leading-none lg:block"
            style={{ WebkitTextStroke: "1.5px rgba(17,19,24,0.07)", color: "transparent" }}
          >
            ?
          </span>

          <p className="fade-up flex items-center gap-3">
            <span className="h-[3px] w-8 bg-signal-500" aria-hidden />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-signal-600">
              FAQ
            </span>
          </p>
          <h2
            className="fade-up mt-6 font-display text-5xl font-bold uppercase italic leading-[0.92] tracking-tight text-graphite-950 md:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            Frequently asked <span className="text-signal-600">questions</span>
          </h2>
          <p
            className="fade-up mt-6 max-w-sm text-sm leading-relaxed text-graphite-600 md:text-base"
            style={{ animationDelay: "140ms" }}
          >
            Can&apos;t find what you&apos;re looking for? Our dispatch team is
            on hand 24/7.
          </p>
          <div
            className="fade-up mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
            style={{ animationDelay: "180ms" }}
          >
            <Link
              href="/#contact"
              className="group/btn inline-flex items-center gap-2.5 rounded-full bg-signal-500 px-8 py-4 text-xs font-bold uppercase tracking-wider text-graphite-950 shadow-[0_10px_30px_-12px_rgba(226,32,56,0.55)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-signal-600 hover:text-fog-50"
            >
              Get in touch
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className="transition-transform duration-300 group-hover/btn:translate-x-1">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href="tel:+12622563782"
              className="border-b border-graphite-500/40 pb-0.5 text-xs font-semibold uppercase tracking-wider text-graphite-600 transition-colors duration-150 hover:border-signal-500 hover:text-signal-600"
            >
              or call dispatch — +1 (262) 256-3782
            </a>
          </div>
        </div>

        {/* Right — accordion, rebuilt below */}

        <div className="fade-up" style={{ animationDelay: "160ms" }}>
          {FAQS.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={faq.q} className={i > 0 ? "border-t border-graphite-900/10" : ""}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="group flex w-full items-center gap-6 py-6 text-left"
                >
                  <span
                    className={`hidden text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-200 sm:block ${
                      open ? "text-signal-600" : "text-graphite-500 group-hover:text-signal-600"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 font-display text-lg font-bold uppercase italic tracking-wide transition-colors duration-150 md:text-xl ${
                      open ? "text-graphite-950" : "text-graphite-700 group-hover:text-graphite-950"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      open
                        ? "rotate-45 bg-signal-500 text-fog-50"
                        : "bg-graphite-950/5 text-graphite-700 group-hover:bg-signal-500/15 group-hover:text-signal-600"
                    }`}
                    aria-hidden
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    {/* Open answer gets the drawn seam — a signal hairline on
                        its leading edge, aligned under the index numeral. */}
                    <p className="mb-7 max-w-2xl border-l-2 border-signal-500 pl-5 text-sm leading-relaxed text-graphite-600 md:pl-6 md:text-base">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="border-t border-graphite-900/10" />
        </div>
      </div>
    </section>
  );
}