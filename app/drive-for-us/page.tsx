import type { Metadata } from "next";
import Image from "next/image";

import DriveApplicationForm from "@/components/drive-application-form";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Drive For Us — Apply to drive | Gepard Trans Logistics INC",
  description:
    "CDL Class A and Class B drivers welcome — and if you don't hold a license yet, we'll help you get one. Apply online and a recruiter will contact you about our driver opportunities.",
};

export default function DriveForUsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        {/* Hero — full-bleed truck photo behind the application pitch. The band
            is deliberately tall: object-cover fills the box by scaling the photo
            until its WIDTH (not its height) covers, then crops the rest. A short
            band therefore cuts a tall photo down to a narrow centre strip.
            truck5.jpg is 2:3 portrait, the reverse of a landscape shot, so the
            visible fraction is small and very band-sensitive — 26% of the frame
            height at 1920x760, 32% at 1440x700, 49% at 768x560. Measured on the
            real crop, the cab's roof keeps >=3.7% headroom in all three, so the
            truck is never decapitated; a taller band is simply more generous.
            From `md` up only: a phone's band is a tall, narrow window, so extra
            height there would crop the frame's WIDTH instead — more zoom, not
            less — so mobile keeps its content-driven height (and, at ~0.74 box
            aspect against a 0.67 photo, mobile shows nearly the whole frame). */}
        <section className="relative isolate overflow-hidden bg-graphite-950 px-6 pb-44 pt-24 text-center md:min-h-[max(560px,80svh)] md:px-16 md:pb-56 md:pt-32 lg:px-24">
          <Image
            src="/truck5.jpg"
            alt=""
            fill
            preload
            sizes="100vw"
            className="-z-10 object-cover object-center"
          />

          {/* Scrim for the copy. Two things matter here:
              1. `absolute inset-0` is load-bearing. A static div has no content,
                 so it collapses to zero height and paints nothing at all —
                 which left the headline white-on-teal-sky and unreadable.
              2. Direction is top-heavy, the opposite of the homepage hero: there
                 the copy sits on the tarmac at the bottom, here it sits on the
                 sky at the top. The brightest thing in this frame (a white cab)
                 sits dead centre, right where the paragraph lands, so the middle
                 stop stays high too. The bottom stays comparatively clear — the
                 white card overlaps it anyway. */}
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-b from-graphite-950/90 from-0% via-graphite-950/78 via-50% to-graphite-950/30 to-100%"
            aria-hidden
          />
          <div className="mx-auto max-w-3xl">
            <h1 className="fade-up font-display text-5xl font-bold uppercase italic leading-[0.95] tracking-tight text-fog-50 md:text-7xl">
              Apply to drive
            </h1>
            <p
              className="fade-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-fog-200 md:text-lg"
              style={{ animationDelay: "80ms" }}
            >
              Thank you for your interest in Gepard Trans Logistics INC. To
              apply for a driving position, please complete this form to have a
              recruiter contact you about our driver opportunities.
            </p>
          </div>
        </section>

        {/* Application — white card overlapping the hero, as on the live site */}
        <section className="bg-fog-50 px-6 pb-24 md:px-16 md:pb-32 lg:px-24">
          <div className="mx-auto -mt-32 max-w-5xl md:-mt-44">
            <div className="fade-up rounded-2xl border border-graphite-900/10 bg-white p-6 shadow-2xl shadow-graphite-950/10 md:p-12">
              <h2 className="font-display text-4xl font-bold uppercase italic leading-none tracking-tight text-graphite-950 md:text-5xl">
                Drive for us
              </h2>
              <div className="mt-10">
                <DriveApplicationForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
