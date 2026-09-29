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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-fog-50 px-6 py-24 md:px-16 md:py-32 lg:px-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div>
          <h2 className="fade-up font-display text-4xl font-bold uppercase italic tracking-tight text-graphite-950 md:text-5xl">
            Frequently asked <span className="text-signal-500">questions</span>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-graphite-600 md:text-base">
            Can&apos;t find what you&apos;re looking for? Our dispatch team is
            on hand 24/7.
          </p>
          <Link
            href="/#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-graphite-950 px-6 py-3 text-xs font-bold uppercase tracking-wider text-fog-50 transition-colors duration-150 hover:bg-graphite-800"
          >
            Get in touch
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="divide-y divide-graphite-900/10 border-y border-graphite-900/10">
          {FAQS.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span
                    className={`font-display text-lg font-semibold tracking-wide transition-colors duration-150 md:text-xl ${
                      open ? "text-graphite-950" : "text-graphite-700 group-hover:text-graphite-950"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      open
                        ? "rotate-45 bg-signal-500 text-graphite-950"
                        : "bg-graphite-950/5 text-graphite-700 group-hover:bg-graphite-950/10"
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
                    <p className="max-w-2xl pb-6 text-sm leading-relaxed text-graphite-600 md:text-base">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}