import Image from "next/image";
import Link from "next/link";
import TiltCard from "./tilt-card";

type SplitCard = {
  title: string;
  body: string;
  cta: string;
  href: string;
  image: string;
  alt: string;
};

const CARDS: SplitCard[] = [
  {
    title: "Drive with us",
    body: "Join the Gepard Trans Logistics team as a skilled driver. We're hiring experienced drivers to join our dynamic fleet and be part of our mission to revolutionize logistics.",
    cta: "Apply now",
    href: "/drivers",
    image: "/driver.webp",
    alt: "Gepard Trans driver behind the wheel at sunset",
  },
  {
    title: "Our fleet",
    body: "Discover Gepard Trans Logistics's diverse fleet of modern trucks, optimized for efficiency and reliability. Contact us for details.",
    cta: "See the fleet",
    href: "/fleet",
    image: "/fleet.webp",
    alt: "Gepard Trans red semi trucks lined up at the yard",
  },
];

export default function SectionSplitCards() {
  return (
    <section id="drive" className="bg-fog-50 px-6 py-24 md:px-16 md:py-32 lg:px-24">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        {CARDS.map((card) => (
          <TiltCard key={card.title} max={5} glare={false} className="rounded-2xl">
            <Link
              href={card.href}
              className="group relative flex h-full min-h-[26rem] flex-col justify-between overflow-hidden rounded-2xl p-8 md:p-10"
            >
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="absolute inset-0 scale-[1.12] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.18]"
              />
            {/* Legibility scrim — heavy at bottom, light at top */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70 transition-colors duration-500 group-hover:from-black/50 group-hover:to-black/80"
              aria-hidden
            />
            <h3 className="fade-up relative z-10 font-display text-4xl font-bold uppercase italic tracking-tight text-fog-50 md:text-5xl">
              {card.title}
            </h3>
            <div className="relative z-10">
              <p className="max-w-md text-sm leading-relaxed text-fog-200 md:text-base">
                {card.body}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-signal-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-graphite-950 transition-colors duration-150 group-hover:bg-signal-600">
                {card.cta}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            </Link>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}