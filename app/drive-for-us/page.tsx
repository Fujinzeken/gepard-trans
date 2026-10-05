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
            until its WIDTH covers, then cropping the rest. A short band therefore
            cuts a 4:3 photo down to a narrow centre strip (500px tall at a 1440px
            viewport showed only ~46% of the frame) and reads as "zoomed in".
            Keeping it near the viewport height restores most of the composition.
            From `md` up only: a phone's band is a tall, narrow window, so extra
            height there would crop the frame's WIDTH instead — more zoom, not
            less — so mobile keeps its content-driven height. */}
        <section className="relative isolate overflow-hidden bg-graphite-950 px-6 pb-44 pt-24 text-center md:min-h-[max(560px,80svh)] md:px-16 md:pb-56 md:pt-32 lg:px-24">
          <Image
            src="/truck1.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover"
          />
          <div
            className="-z-10 bg-gradient-to-b from-graphite-950/85 via-graphite-950/60 to-graphite-950/40"
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
