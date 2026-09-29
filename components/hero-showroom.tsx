"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Grid, Lightformer, OrbitControls } from "@react-three/drei";
import { Truck, type TrailerType } from "./truck";
import { useReducedMotion } from "./use-reduced-motion";

/* Homepage hero — drag to orbit, swap trailers, read the specs. */

const SPECS: Record<TrailerType, { label: string; rows: Array<[string, string]> }> = {
  "dry-van": {
    label: "53′ Dry Van",
    rows: [
      ["Payload", "up to 45,000 lb"],
      ["Best for", "palletized & general freight"],
      ["Fleet", "2021–2025 Cascadia / Kenworth"],
    ],
  },
  reefer: {
    label: "53′ Reefer",
    rows: [
      ["Temp range", "−20°F to 75°F"],
      ["Best for", "food, beverage, pharma"],
      ["Monitoring", "continuous 24/7 telemetry"],
    ],
  },
  flatbed: {
    label: "48′–53′ Flatbed",
    rows: [
      ["Deck", "open, 102″ wide"],
      ["Best for", "construction & oversized"],
      ["Securement", "straps, chains, tarps"],
    ],
  },
};

const TYPES = Object.keys(SPECS) as TrailerType[];

export default function HeroShowroom() {
  const [trailer, setTrailer] = useState<TrailerType>("dry-van");
  const [zoomActive, setZoomActive] = useState(false);
  useReducedMotion();
  return (
    <section
      className="relative h-[calc(100vh-64px)] min-h-[620px] w-full overflow-hidden bg-fog-50 text-graphite-900"
      onPointerDown={() => setZoomActive(true)}
      onPointerLeave={() => setZoomActive(false)}
    >
      {/* scene */}
      <div className="absolute inset-0">
        <Canvas dpr={[1, 2]} camera={{ position: [9.5, 3.2, 10.5], fov: 30 }}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[6, 9, 5]} intensity={2.6} color="#ffffff" />
          <directionalLight position={[-8, 4, -6]} intensity={1.1} color="#cfe0ff" />
          <group position={[1.2, 0, 0]}>
            <Truck trailer={trailer} />
          </group>
          <ContactShadows position={[1.2, 0.01, 0]} scale={24} blur={2.2} opacity={0.4} far={4} />
          <Grid
            position={[0, 0, 0]}
            args={[40, 40]}
            cellSize={1}
            cellColor="#d8dce1"
            sectionSize={5}
            sectionColor="#b7bec7"
            fadeDistance={34}
            fadeStrength={1.2}
            infiniteGrid
          />
          <Environment resolution={256}>
            <Lightformer intensity={1.5} position={[0, 7, 0]} rotation-x={Math.PI / 2} scale={[12, 12, 1]} color="#ffffff" />
            <Lightformer intensity={1.1} position={[-6, 3, -6]} rotation-y={Math.PI / 4} scale={[9, 2, 1]} color="#ffe9c4" />
            <Lightformer intensity={0.8} position={[8, 2, 4]} rotation-y={-Math.PI / 3} scale={[7, 1.4, 1]} color="#dfe9ff" />
          </Environment>
          <OrbitControls
            makeDefault
            target={[0.6, 1.3, 0]}
            enablePan={false}
            enableZoom={zoomActive}
            minDistance={7}
            maxDistance={20}
            minPolarAngle={0.6}
            maxPolarAngle={Math.PI / 2.15}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* header copy */}
      <div className="pointer-events-none absolute left-6 top-10 max-w-md md:left-16 lg:left-24">
        <p className="fade-up mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-signal-600">
          Our fleet · drag to inspect
        </p>
        <h1
          className="fade-up font-display text-4xl font-bold uppercase leading-[0.98] tracking-tight text-graphite-900 md:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          The right equipment for every load.
        </h1>
        <div className="fade-up mt-5 flex flex-wrap gap-3" style={{ animationDelay: "160ms" }}>
          <a
            href="#contact"
            className="rounded-full bg-graphite-900 px-6 py-3 text-xs font-bold uppercase tracking-wider text-fog-50 transition-colors duration-150 hover:bg-graphite-700"
          >
            Ship with us
          </a>
          <a
            href="#drive"
            className="rounded-full border border-graphite-900/25 px-6 py-3 text-xs font-bold uppercase tracking-wider text-graphite-900 transition-colors duration-150 hover:border-graphite-900"
          >
            Drive with us
          </a>
        </div>
      </div>

      {/* trailer switcher + spec card */}
      <div className="absolute bottom-8 right-6 z-10 w-[300px] md:right-16 lg:right-24">
        <div
          role="tablist"
          aria-label="Trailer type"
          className="mb-3 flex rounded-full border border-graphite-900/15 bg-white/90 p-1 shadow-lg backdrop-blur"
        >
          {TYPES.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={trailer === t}
              onClick={() => setTrailer(t)}
              className={`flex-1 rounded-full px-2 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors duration-150 ${
                trailer === t
                  ? "bg-graphite-900 text-fog-50"
                  : "text-graphite-700 hover:bg-graphite-900/5"
              }`}
            >
              {t === "dry-van" ? "Dry van" : t === "reefer" ? "Reefer" : "Flatbed"}
            </button>
          ))}
        </div>
        <div className="rounded-2xl border border-graphite-900/10 bg-white/95 p-5 shadow-lg backdrop-blur">
          <p className="font-display text-lg font-bold uppercase tracking-tight">
            {SPECS[trailer].label}
          </p>
          <dl className="mt-3 space-y-2">
            {SPECS[trailer].rows.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-3 text-xs">
                <dt className="shrink-0 uppercase tracking-wider text-fog-500">{k}</dt>
                <dd className="text-right font-medium text-graphite-800">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
