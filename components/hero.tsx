import Image from "next/image";

/* Homepage hero — the client's own drone footage of the yard, under a dark veil.

   Source clip: gepardtrans.net/wp-content/uploads/2024/10/gepard.mp4 — 1560x760
   H.264 Main\@L4.1, 25 fps, 9.84 s, 1.0 Mbps, no audio track, and already
   faststart (moov in the first 256 bytes), so it ships byte-for-byte unmodified
   as /hero-video.mp4 — no transcode, no generation loss. For scale, the Prime
   hero clip this was modelled on is 1920x1080\@3.8 Mbps and 4.6 MB; theirs is
   also desktop-only, whereas this one plays on phones too.

   The veil is a graphite-950 band anchored to the hero's bottom edge (see
   .hero-veil), not a gradient sized to the frame, because the copy is
   bottom-anchored as well: its distance above the fold is identical on a 656px
   hero and an 876px one, even though its position as a fraction of the frame is
   not.

   It is dark, and the ink light, because this clip is a sunlit aerial of white
   trailer roofs on pale concrete: against footage that bright a light scrim can
   only average out towards milk, which is what this hero used to do. Dark is also
   the cheaper direction to defend — it flips the worst case along with the ink,
   from the darkest pixel under each element (pure black, in the trailer shadows)
   to the brightest one (sunlit grass, rgb(231,255,214)), and white ink needs less
   scrim there than near-black ink did.

   The stops were solved against all ten sampled frames of the clip, composited the
   way CSS actually paints them, at seven real viewports, each read through its own
   object-cover crop, taking the brightest pixel under each element as the worst
   case and each element's own ink colour:

     h1, fog-50, 72px bold           5.84:1   (3:1 required — large text)
     paragraph, fog-200, 16px        6.92:1   (4.5:1 required)
     CTA row, fog-50, 12px           7.52:1   (4.5:1 — the outline pill's label)
     rail label, fog-50, 20px bold   8.35:1   (3:1 required — large text)
     rail detail, fog-200, 12px      8.35:1   (4.5:1 required)

   Three of those beat the light veil they replace (h1 4.07:1 -> 5.84:1, paragraph
   5.95:1 -> 6.92:1, CTA 7.40:1 -> 7.52:1), and the h1 gains the most: white ink
   sits far from the luminance of a veiled background, where near-black ink sat
   almost on top of it. The rail trades part of an oversized margin (9.11:1 ->
   8.35:1) and is still nearly double what 12px text needs.

   Red still appears only as *surfaces* here — the eyebrow chip, the primary
   button, the rail bars. Red text over this footage tops out near 3:1 and cannot
   be made compliant at any veil strength, dark or light. */

const EQUIPMENT = [
  { label: "53′ Dry Van", detail: "up to 45,000 lb payload" },
  { label: "53′ Reefer", detail: "−20°F to 75°F · 24/7 telemetry" },
  { label: "48′–53′ Flatbed", detail: "straps, chains & tarps" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[max(620px,calc(100svh-64px))] items-end overflow-hidden bg-graphite-950">
      {/* The clip's own first frame. It is preloaded as the LCP candidate, and
          it is what reduced-motion visitors keep, since the video is removed
          for them rather than merely paused. */}
      <Image
        src="/dispatch.webp"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Decorative footage: muted, looping, no controls, no captions needed */}
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/dispatch.webp"
        className="absolute inset-0 h-full w-full object-cover object-center motion-reduce:hidden"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Veil — stops and the measurements behind them are documented above */}
      <div className="hero-veil" aria-hidden />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 md:px-16 md:pb-20 lg:px-24">
        <p className="fade-up">
          <span className="inline-block rounded-full bg-signal-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-fog-50">
            24/7 dispatch · nationwide coverage
          </span>
        </p>
        <h1
          className="fade-up mt-4 max-w-4xl font-display text-5xl font-bold uppercase italic leading-[0.95] tracking-tight text-fog-50 md:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          The right equipment for every load.
        </h1>
        <p
          className="fade-up mt-6 max-w-xl text-sm leading-relaxed text-fog-200 md:text-base"
          style={{ animationDelay: "140ms" }}
        >
          Dry van, reefer, and flatbed capacity across 96% of US ZIP codes —
          backed by a modern fleet and a dispatch team that answers around the
          clock.
        </p>
        <div
          className="fade-up mt-8 flex flex-wrap gap-3"
          style={{ animationDelay: "200ms" }}
        >
          {/* Hover matches the brand's own button hover (#cb0201, white label),
              which also keeps both states above 5:1 */}
          <a
            href="#contact"
            className="rounded-full bg-signal-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-graphite-950 transition-colors duration-150 hover:bg-signal-600 hover:text-fog-50"
          >
            Ship with us
          </a>
          {/* A solid fog-50 border, not the shared component's graphite-900/45: over
              the veiled footage a 45% hairline only reaches ~2.6:1 against it, below
              the 3:1 WCAG asks of a UI boundary. Solid fog-50 clears that by a wide
              margin and matches the pill's label ink. */}
          <a
            href="/drive-for-us"
            className="rounded-full border border-fog-50 px-6 py-3 text-xs font-bold uppercase tracking-wider text-fog-50 transition-colors duration-150 hover:bg-fog-50/10"
          >
            Drive with us
          </a>
        </div>

        {/* Equipment rail — the specs the old 3D showroom used to surface */}
        <ul className="mt-14 hidden gap-10 border-t border-fog-50/20 pt-6 sm:grid sm:grid-cols-3">
          {EQUIPMENT.map((item) => (
            <li key={item.label} className="border-l-2 border-signal-500 pl-4">
              <p className="font-display text-xl font-bold uppercase tracking-tight text-fog-50">
                {item.label}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-fog-200">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

