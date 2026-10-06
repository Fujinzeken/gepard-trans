import TiltCard from "./tilt-card";
import { US_MAP_PATH, US_MAP_VIEWBOX } from "./us-map-path";

/* "Deliver farther" — the coverage/services section, our answer to Prime's
 * map-and-equipment block at #deliver-farther.
 *
 * Two halves:
 *   1. A US map panel with animated freight routes between seven cities.
 *      The outline is real data — components/us-map-path.ts is generated from
 *      the PublicaMundi us-states GeoJSON, so state borders are accurate to
 *      source rather than hand-traced. Routes are quadratic curves through
 *      projected city coordinates (same projection as the generator), marching
 *      via the .route-dash keyframes in globals.css. Chicago is the hub.
 *   2. Equipment cards with hand-drawn truck line art. This is the shipped
 *      form of the client's "3D truck model" ask: the trucks get depth from
 *      TiltCard's pointer-tracked CSS-3D perspective tilt rather than a WebGL
 *      model. A true glTF truck can later replace the SVGs in these same
 *      cards without touching layout — the cards are built for it. */

type Route = { d: string };

/* City coordinates projected exactly like the generator (cos 38° x-scale,
   y = -lat, scaled into the 1000x533 viewBox). */
const ROUTES: Route[] = [
  { d: "M112 337 Q 225 250 342 212" }, // Los Angeles -> Denver
  { d: "M342 212 Q 490 160 642 165" }, // Denver -> Chicago
  { d: "M483 365 Q 560 270 642 165" }, // Dallas -> Chicago
  { d: "M642 165 Q 760 145 875 190" }, // Chicago -> Newark
  { d: "M875 190 Q 820 290 698 344" }, // Newark -> Atlanta
  { d: "M698 344 Q 745 440 771 519" }, // Atlanta -> Miami
];

const HUB: [number, number] = [642, 165]; // Chicago
const STOPS: [number, number][] = [
  [112, 337],
  [342, 212],
  [483, 365],
  [875, 190],
  [698, 344],
  [771, 519],
];

function CoverageMap() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-fog-50/10 bg-graphite-900 p-4 md:p-6">
      <svg
        viewBox={US_MAP_VIEWBOX}
        role="img"
        aria-label="Map of the contiguous United States with Gepard Trans freight routes linking Los Angeles, Denver, Dallas, Chicago, Newark, Atlanta and Miami"
        className="h-auto w-full"
      >
        <path
          d={US_MAP_PATH}
          fill="var(--color-graphite-800)"
          stroke="var(--color-fog-500)"
          strokeOpacity={0.18}
          strokeWidth={1.2}
          vectorEffect="non-scaling-stroke"
        />
        {ROUTES.map((route, i) => (
          <path
            key={i}
            d={route.d}
            fill="none"
            stroke={i % 2 ? "var(--color-signal-300)" : "var(--color-signal-500)"}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray="6 10"
            className="route-dash"
            style={{ animationDelay: `${i * -0.4}s` }}
          />
        ))}
        {STOPS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={5} fill="var(--color-fog-300)" />
        ))}
        <circle
          cx={HUB[0]}
          cy={HUB[1]}
          r={9}
          fill="none"
          stroke="var(--color-signal-500)"
          strokeWidth={2}
        />
        <circle cx={HUB[0]} cy={HUB[1]} r={5.5} fill="var(--color-signal-500)" />
      </svg>
      <p className="absolute bottom-4 left-4 rounded-full border border-fog-50/15 bg-graphite-950/85 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-fog-200 md:bottom-6 md:left-6">
        96% of US ZIP codes covered
      </p>
    </div>
  );
}

/* Truck line art — side view, facing right, drawn on a shared 220x96 grid so
   the three variants align (ground at y=84, wheels r=9, deck at y=62). */
function TruckFrame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 220 96"
      aria-hidden
      className="h-20 w-auto text-fog-300"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
      {/* Wheels shared by all three bodies */}
      <circle cx={40} cy={69} r={9} />
      <circle cx={64} cy={69} r={9} />
      <circle cx={180} cy={69} r={9} />
      {/* Ground shadow line */}
      <line x1={10} y1={84} x2={210} y2={84} strokeOpacity={0.35} strokeWidth={1.5} />
    </svg>
  );
}

/* The tractor every variant shares: hood + windshield slant over the drives */
function Cab() {
  return <path d="M148 62 V34 Q148 26 156 26 H172 L196 46 V62 Z" />;
}

function DryVanIcon() {
  return (
    <TruckFrame>
      <rect x={8} y={16} width={132} height={46} rx={3} />
      <Cab />
      {/* Brand stripe in signal red */}
      <line x1={8} y1={24} x2={140} y2={24} stroke="var(--color-signal-500)" strokeWidth={3} />
    </TruckFrame>
  );
}

function ReeferIcon() {
  return (
    <TruckFrame>
      <rect x={8} y={16} width={132} height={46} rx={3} />
      <Cab />
      {/* Thermo unit on the trailer nose */}
      <rect x={141} y={20} width={7} height={18} rx={2} stroke="var(--color-signal-500)" />
      {/* Snowflake */}
      <g stroke="var(--color-signal-500)" strokeWidth={2}>
        <line x1={62} y1={27} x2={62} y2={51} />
        <line x1={52} y1={33} x2={72} y2={45} />
        <line x1={52} y1={45} x2={72} y2={33} />
      </g>
    </TruckFrame>
  );
}

function FlatbedIcon() {
  return (
    <TruckFrame>
      {/* Deck */}
      <line x1={8} y1={62} x2={200} y2={62} />
      <line x1={8} y1={57} x2={200} y2={57} strokeOpacity={0.4} />
      <Cab />
      {/* Load: two crates, strapped down */}
      <rect x={22} y={33} width={30} height={24} />
      <rect x={60} y={27} width={36} height={30} />
      <line x1={16} y1={40} x2={22} y2={48} stroke="var(--color-signal-500)" />
      <line x1={54} y1={40} x2={60} y2={44} stroke="var(--color-signal-500)" />
      <line x1={96} y1={40} x2={102} y2={52} stroke="var(--color-signal-500)" />
    </TruckFrame>
  );
}

const EQUIPMENT = [
  {
    name: "53′ Dry Van",
    specs: ["Up to 45,000 lb payload", "Drop trailers available"],
    Icon: DryVanIcon,
  },
  {
    name: "53′ Reefer",
    specs: ["−20°F to 75°F", "24/7 temperature telemetry"],
    Icon: ReeferIcon,
  },
  {
    name: "48′–53′ Flatbed",
    specs: ["Straps, chains & tarps", "Overweight & oversized"],
    Icon: FlatbedIcon,
  },
];

export default function SectionCoverage() {
  return (
    <section id="coverage" className="bg-graphite-950 px-6 py-24 md:px-16 md:py-32 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="fade-up flex items-center gap-3">
              <span className="h-px w-8 bg-signal-500" aria-hidden />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-signal-300">
                Transportation &amp; logistics services
              </span>
            </p>
            <h2
              className="fade-up mt-5 font-display text-5xl font-bold uppercase italic leading-[0.95] tracking-tight text-fog-50 md:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              Deliver farther
            </h2>
            <p
              className="fade-up mt-8 max-w-xl text-base leading-relaxed text-fog-200 md:text-lg"
              style={{ animationDelay: "140ms" }}
            >
              From the Pacific Northwest to the tip of Florida, our trucks run
              the lanes that keep American supply chains moving. One call puts
              dry van, reefer, or flatbed capacity on your lane — routed,
              tracked, and delivered by a dispatch team that never clocks out.
            </p>
            <p className="fade-up mt-10" style={{ animationDelay: "200ms" }}>
              <a
                href="#contact"
                className="rounded-full border border-fog-50 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-fog-50 transition-colors duration-150 hover:bg-fog-50/10"
              >
                Get a quote
              </a>
            </p>
          </div>

          <div className="fade-up" style={{ animationDelay: "160ms" }}>
            <CoverageMap />
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3 md:mt-20">
          {EQUIPMENT.map(({ name, specs, Icon }, i) => (
            <TiltCard key={name} max={6} className="rounded-2xl">
              <div
                className="fade-up h-full rounded-2xl border border-fog-50/10 bg-graphite-900 p-8"
                style={{ animationDelay: `${200 + i * 80}ms` }}
              >
                <Icon />
                <h3 className="mt-6 font-display text-2xl font-bold uppercase italic tracking-tight text-fog-50">
                  {name}
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-fog-400">
                  {specs.map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

