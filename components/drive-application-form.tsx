"use client";

import { FormEvent, useState } from "react";

import DriverInfoFields from "./driver-fields";
import { CONSENT_COPY, INPUT_CLASS, LABEL_CLASS, PHONE_DISPLAY } from "./form-shared";

/**
 * The full driver application shown on /drive-for-us. Same intake path as the
 * contact section's Driver tab — it posts to /api/contact with role "driver",
 * which validates and forwards the row to the Drivers tab of the client's
 * Google Sheet via the Apps Script webhook.
 *
 * On success the form is swapped for the confirmation panel (which resets
 * every field for free, since the inputs are unmounted).
 */

const inputClass = INPUT_CLASS.light;
const labelClass = LABEL_CLASS.light;

function SectionHeading({ children }: { children: string }) {
  return (
    <h3 className="font-display text-2xl font-bold uppercase italic leading-none tracking-tight text-graphite-950 md:text-3xl">
      {children}
    </h3>
  );
}

export default function DriveApplicationForm() {
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "driver",
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          phone: data.get("phone"),
          message: data.get("message"),
          smsConsent: consent,
          workEligible: data.get("workEligible"),
          experience: data.get("experience"),
          licenseType: data.get("licenseType"),
          endorsements: data.getAll("endorsements"),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[26rem] flex-col items-center justify-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-verdict-500/10 text-verdict-500">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="mt-5 font-display text-2xl font-bold uppercase tracking-tight text-graphite-950">
          Application received
        </p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-graphite-600">
          A recruiter will contact you shortly about our driver opportunities.
          Need to reach someone sooner? Call {PHONE_DISPLAY}.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs font-bold uppercase tracking-wider text-signal-500 transition-colors duration-150 hover:text-signal-600"
        >
          Send another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-5">
        <SectionHeading>Personal information</SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>First name</span>
            <input name="firstName" type="text" autoComplete="given-name" required className={inputClass} placeholder="First Name" />
          </label>
          <label className="block">
            <span className={labelClass}>Last name</span>
            <input name="lastName" type="text" autoComplete="family-name" required className={inputClass} placeholder="Last Name" />
          </label>
        </div>
        <label className="block">
          <span className={labelClass}>Phone number</span>
          <input name="phone" type="tel" autoComplete="tel" required className={inputClass} placeholder="(555) 000-0000" />
        </label>
      </div>

      <div className="mt-12 space-y-6 border-t border-graphite-900/10 pt-10">
        <SectionHeading>General information</SectionHeading>
        <DriverInfoFields tone="light" />
      </div>

      <label className="mt-10 block">
        <textarea
          name="message"
          rows={4}
          className={`${inputClass} resize-y`}
          placeholder="Please describe other important information about yourself so that we can better understand your capabilities and job requirements (optional)"
        />
      </label>

      {/* SMS consent — legally required wording */}
      <label className="mt-6 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-graphite-600">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-signal-500"
        />
        <span>
          {CONSENT_COPY}{" "}
          <a href="/privacy" className="font-semibold text-signal-500 underline-offset-2 hover:underline">
            Privacy Policy
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-8 w-full rounded-full bg-signal-500 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition-colors duration-150 hover:bg-signal-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Submitting…" : "Submit now"}
      </button>

      {status === "error" && (
        <p className="mt-3 text-xs text-signal-600" role="alert">
          Something went wrong — please call us at {PHONE_DISPLAY} instead.
        </p>
      )}
    </form>
  );
}
