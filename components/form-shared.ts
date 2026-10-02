/**
 * Constants + input styling shared by every intake form on the site
 * (contact section, driver application). Keeping the SMS consent wording in
 * one place matters — it's the legally reviewed copy and must stay identical
 * wherever it's rendered.
 */

export const PHONE_DISPLAY = "+1 (262) 256-3782";
export const PHONE_HREF = "tel:+12622563782";
/** Bare-format number quoted inside the consent wording. */
export const PHONE_SMS = "1-262-256-3782";

export const CONSENT_COPY = `By checking this box, I agree to receive SMS messages about customer services from Gepard Trans Logistics INC at the phone number provided above. The SMS frequency may vary. Data rates may apply. Text HELP to ${PHONE_SMS} for assistance. Reply STOP to opt out of receiving SMS messages.`;

/** Forms come in two skins: dark cards (contact section) and light cards
 *  (driver application). The field chrome follows the skin. */
export type Tone = "dark" | "light";

export const INPUT_CLASS: Record<Tone, string> = {
  dark: "w-full rounded-lg border border-graphite-700 bg-graphite-850 px-4 py-3 text-sm text-fog-50 outline-none transition-colors duration-150 placeholder:text-fog-500 focus:border-signal-500",
  light:
    "w-full rounded-lg border border-graphite-900/10 bg-fog-50 px-4 py-3 text-sm text-graphite-900 outline-none transition-colors duration-150 placeholder:text-graphite-500 focus:border-signal-500 focus:bg-white",
};

export const LABEL_CLASS: Record<Tone, string> = {
  dark: "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-fog-400",
  light: "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-graphite-600",
};
