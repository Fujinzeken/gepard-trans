"use client";

import { useState } from "react";

import type { Tone } from "./form-shared";

/**
 * The driver-only half of the application ("General Information"). Shared by
 * the contact section's Driver tab and the /drive-for-us page so both collect
 * exactly the same answers the sheet expects.
 *
 * Radios and checkboxes are plain named inputs, so they ride along in FormData
 * with the rest of the form. The one piece of behaviour we add: "None" is
 * mutually exclusive with the other endorsements, so the sheet never receives
 * a contradictory row.
 */

export const WORK_ELIGIBLE = ["Yes", "No"] as const;
export const EXPERIENCE = ["Yes", "Partner", "No"] as const;
export const LICENSE_TYPES = [
  "Class A CDL",
  "Class B CDL",
  "No license, but would like to obtain one",
] as const;
export const ENDORSEMENTS = ["Doubles", "Triples", "HazMat", "None"] as const;

type Skin = { legend: string; pill: string; box: string };

const SKINS: Record<Tone, Skin> = {
  dark: {
    legend: "text-fog-400",
    pill: "border-graphite-700 bg-graphite-850 text-fog-300 hover:border-signal-500/50 hover:text-fog-50 peer-checked:border-signal-500 peer-checked:bg-signal-500 peer-checked:text-white",
    box: "text-fog-300",
  },
  light: {
    legend: "text-graphite-600",
    pill: "border-graphite-900/15 bg-fog-50 text-graphite-700 hover:border-signal-500/60 hover:text-graphite-950 peer-checked:border-signal-500 peer-checked:bg-signal-500 peer-checked:text-white",
    box: "text-graphite-700",
  },
};

/* The leading indicator dot is a ::before on the pill face — the only way to
   style it select-to-selector, since `peer-checked:` can't reach into a
   sibling's children. */
const PILL_BASE =
  "inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-signal-500/50 before:h-2 before:w-2 before:shrink-0 before:rounded-full before:bg-white before:opacity-0 before:content-[''] peer-checked:before:opacity-100";

function RadioGroup({
  name,
  legend,
  options,
  tone,
}: {
  name: string;
  legend: string;
  options: readonly string[];
  tone: Tone;
}) {
  const skin = SKINS[tone];
  return (
    <fieldset>
      <legend className={`mb-3 max-w-sm text-sm leading-snug ${skin.legend}`}>{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option}>
            <input type="radio" name={name} value={option} required className="peer sr-only" />
            <span className={`${PILL_BASE} ${skin.pill}`}>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Endorsements({ tone }: { tone: Tone }) {
  const skin = SKINS[tone];
  const [selected, setSelected] = useState<readonly string[]>([]);

  function toggle(value: string, checked: boolean) {
    setSelected((prev) => {
      if (value === "None") return checked ? ["None"] : [];
      const next = prev.filter((v) => v !== value && v !== "None");
      if (checked) next.push(value);
      return next;
    });
  }

  return (
    <fieldset>
      <legend className={`mb-3 max-w-sm text-sm leading-snug ${skin.legend}`}>
        Which endorsements do you currently possess?
      </legend>
      <div className="grid grid-cols-2 gap-y-3 sm:grid-cols-3">
        {ENDORSEMENTS.map((endorsement) => (
          <label key={endorsement} className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              name="endorsements"
              value={endorsement}
              checked={selected.includes(endorsement)}
              onChange={(e) => toggle(endorsement, e.target.checked)}
              className="h-4 w-4 shrink-0 accent-signal-500"
            />
            <span className={`text-sm ${skin.box}`}>{endorsement}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function DriverInfoFields({
  tone = "dark",
  className = "grid gap-x-10 gap-y-8 lg:grid-cols-2",
}: {
  tone?: Tone;
  /** Layout override — the contact card is narrow enough to stack in one column. */
  className?: string;
}) {
  return (
    <div className={className}>
      <RadioGroup
        name="workEligible"
        legend="Are you legally eligible for employment in the United States?"
        options={WORK_ELIGIBLE}
        tone={tone}
      />
      <RadioGroup
        name="experience"
        legend="Do you have any experience on the relevant vehicle?"
        options={EXPERIENCE}
        tone={tone}
      />
      <RadioGroup
        name="licenseType"
        legend="Current license type"
        options={LICENSE_TYPES}
        tone={tone}
      />
      <Endorsements tone={tone} />
    </div>
  );
}
