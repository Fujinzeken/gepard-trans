"use client";

import { FormEvent, useState } from "react";

import DriverInfoFields from "./driver-fields";
import { CONSENT_COPY, INPUT_CLASS, PHONE_DISPLAY } from "./form-shared";

/**
 * Contact section — "Still have a question?" with role tabs (Driver / Partner /
 * Customer), minimal fields, and the legal SMS-consent checkbox. Posts to
 * /api/contact, which validates and forwards to the client's Google Sheet
 * (one tab per role) via the Apps Script webhook.
 */

type Role = "driver" | "partner" | "customer";

const ROLES: Array<{ id: Role; label: string }> = [
  { id: "driver", label: "Driver" },
  { id: "partner", label: "Partner" },
  { id: "customer", label: "Customer" },
];

/* Field chrome and the legally reviewed SMS wording are shared with the
   driver application page — see components/form-shared.ts. The contact
   section runs the light skin: it sits on the page's light closing band,
   so the form card carries the fields, not a dark plate. */
const inputClass = INPUT_CLASS.light;

export default function SectionContact() {
  const [role, setRole] = useState<Role>("driver");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          phone: data.get("phone"),
          message: data.get("message"),
          smsConsent: consent,
          /* Driver-only extras — absent (and ignored server-side) for the
             Partner and Customer tabs. */
          workEligible: data.get("workEligible"),
          experience: data.get("experience"),
          licenseType: data.get("licenseType"),
          endorsements: data.getAll("endorsements"),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      form.reset();
      setConsent(false);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="border-t border-fog-200 bg-white px-6 py-24 text-graphite-700 md:px-16 md:py-32 lg:px-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left — pitch */}
        <div>
          <p className="fade-up flex items-center gap-3">
            <span className="h-[3px] w-8 bg-signal-500" aria-hidden />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-signal-600">
              Contact
            </span>
          </p>
          <h2
            className="fade-up mt-6 font-display text-5xl font-bold uppercase italic leading-[0.95] tracking-tight text-graphite-950 md:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            Still have
            <br />
            <span className="text-signal-600">a question?</span>
          </h2>
          <p
            className="fade-up mt-6 max-w-md text-base leading-relaxed text-graphite-600"
            style={{ animationDelay: "140ms" }}
          >
            Whether you ship with us, partner with us, or want to drive for us —
            our dispatch team answers around the clock. Send a note or call
            directly, a human picks up.
          </p>

          <div className="fade-up mt-10" style={{ animationDelay: "160ms" }}>
            <a
              href="tel:+12622563782"
              className="group flex items-center gap-4 rounded-xl border border-graphite-900/10 bg-fog-50 p-5 transition-colors duration-300 hover:border-signal-500/50"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-signal-500/10 text-signal-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wider text-graphite-500">Call us anytime</span>
                <span className="block font-display text-lg font-bold text-graphite-950 transition-colors duration-150 group-hover:text-signal-600">
                  {PHONE_DISPLAY}
                </span>
              </span>
            </a>
            <a
              href="mailto:gepardtranslogistics@gmail.com"
              className="group mt-3 flex items-center gap-4 rounded-xl border border-graphite-900/10 bg-fog-50 p-5 transition-colors duration-300 hover:border-signal-500/50"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-signal-500/10 text-signal-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 6h16v12H4V6Zm0 1 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wider text-graphite-500">Or write to us</span>
                <span className="block truncate font-display text-lg font-bold text-graphite-950 transition-colors duration-150 group-hover:text-signal-600">
                  gepardtranslogistics@gmail.com
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* Right — form card: white-on-white with a drawn seam on top and a
            soft graphite shadow, so the fog-50 inputs read inside it. */}
        <div
          className="fade-up relative overflow-hidden rounded-2xl border border-graphite-900/10 bg-white p-6 shadow-[0_24px_50px_-32px_rgba(17,19,24,0.35)] md:p-8"
          style={{ animationDelay: "120ms" }}
        >
          <span className="absolute inset-x-0 top-0 h-1 bg-signal-500" aria-hidden />
          {status === "sent" ? (
            <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-verdict-500/10 text-verdict-500">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="mt-5 font-display text-2xl font-bold uppercase tracking-tight text-graphite-950">
                Message received
              </p>
              <p className="mt-2 max-w-xs text-sm text-graphite-500">
                Dispatch will get back to you shortly — usually within the hour.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-xs font-bold uppercase tracking-wider text-signal-600 hover:text-signal-300"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              {/* Role tabs */}
              <div role="tablist" aria-label="I am a" className="flex gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    role="tab"
                    aria-selected={role === r.id}
                    onClick={() => setRole(r.id)}
                    className={`flex-1 rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors duration-150 ${
                      role === r.id
                        ? "bg-signal-500 text-white"
                        : "border border-graphite-900/15 text-graphite-600 hover:border-signal-500/60 hover:text-graphite-950"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-graphite-500">First name</span>
                  <input name="firstName" type="text" autoComplete="given-name" required className={inputClass} placeholder="Jane" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-graphite-500">Last name</span>
                  <input name="lastName" type="text" autoComplete="family-name" required className={inputClass} placeholder="Doe" />
                </label>
              </div>

              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-graphite-500">Phone number</span>
                <input name="phone" type="tel" autoComplete="tel" required className={inputClass} placeholder="(555) 000-0000" />
              </label>

              {/* Driver tab collects the same extra answers as /drive-for-us */}
              {role === "driver" && (
                <div className="mt-8 border-t border-graphite-900/10 pt-8">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-graphite-950">
                    General information
                  </h3>
                  <DriverInfoFields tone="light" className="mt-5 space-y-7" />
                </div>
              )}

              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-graphite-500">
                  Your message <span className="font-normal normal-case text-graphite-500">(optional)</span>
                </span>
                <textarea
                  name="message"
                  rows={4}
                  className={`${inputClass} resize-y`}
                  placeholder={
                    role === "driver"
                      ? "Please describe other important information about yourself so that we can better understand your capabilities and job requirements (optional)"
                      : "Tell us about your lanes, volumes, or equipment needs…"
                  }
                />
              </label>

              {/* SMS consent — legally required wording */}
              <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-graphite-500">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 accent-signal-500"
                />
                <span>{CONSENT_COPY}</span>
              </label>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-6 w-full rounded-full bg-signal-500 px-8 py-4 text-xs font-bold uppercase tracking-wider text-graphite-950 shadow-[0_10px_30px_-12px_rgba(226,32,56,0.55)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-signal-600 hover:text-fog-50 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === "sending" ? "Sending…" : "Send now"}
              </button>

              {status === "error" && (
                <p className="mt-3 text-xs text-signal-600" role="alert">
                  Something went wrong — please call us at {PHONE_DISPLAY} instead.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}