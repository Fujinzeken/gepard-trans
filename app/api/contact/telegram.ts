/**
 * Telegram push notification for contact-form submissions.
 *
 * Runs alongside the Google Sheet sync (see ./route.ts) so a lead lands in the
 * spreadsheet *and* pings whoever watches the chat. Deliberately best-effort:
 * every failure is logged and returned as `false` — never thrown — so a
 * notification problem can't cost a visitor their submission.
 *
 * Env (see .env): TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID. If either is missing
 * the channel is simply disabled. Env is read once at module load, so restart
 * the server after changing it (same as GOOGLE_SCRIPT_URL in ./route.ts).
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";
const CHAT_ID = process.env.TELEGRAM_CHAT_ID ?? "";

const TIMEOUT_MS = 10_000;
/** Telegram rejects text longer than 4096 chars; stay under with a margin. */
const MAX_TEXT = 4_000;

/* Matches the tabs in the contact section (Driver / Partner / Customer). */
const ROLE_LABELS: Record<string, string> = {
  driver: "🚛 Driver application",
  partner: "🤝 Partner enquiry",
  customer: "📦 Customer enquiry",
};

/** Telegram's HTML parse_mode understands only these entities, so every
 *  visitor-supplied string is escaped before it leaves the server. */
function esc(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function text(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function utcStamp(value: unknown): string {
  const date = typeof value === "string" ? new Date(value) : new Date();
  const safe = Number.isNaN(date.getTime()) ? new Date() : date;
  return `${safe.toISOString().slice(0, 16).replace("T", " ")} UTC`;
}

/**
 * Renders one submission as a compact notification. Labels follow the Google
 * Sheet's column headers (apps-script/Code.gs), so a lead reads the same in
 * both channels. Exported for tests.
 */
export function formatTelegramMessage(record: Record<string, unknown>): string {
  const phone = text(record.phone);
  const message = text(record.message).trim();

  const lines = [
    `<b>${ROLE_LABELS[text(record.role)] ?? "New submission"}</b>`,
    `<b>Name:</b> ${esc(text(record.firstName))} ${esc(text(record.lastName))}`.trimEnd(),
    `<b>Phone:</b> <a href="tel:${esc(phone.replace(/[^\d+]/g, ""))}">${esc(phone)}</a>`,
    `<b>Message:</b> ${message ? esc(message) : "<i>— none —</i>"}`,
    `<b>SMS consent:</b> ${record.smsConsent === true ? "Yes" : "No"}`,
  ];

  /* Driver applications carry the extra "General information" answers — the
     sheet's Drivers tab has a column for each (components/driver-fields.tsx). */
  if (record.role === "driver") {
    const endorsements = Array.isArray(record.endorsements)
      ? record.endorsements.filter((v): v is string => typeof v === "string")
      : [];
    lines.push(
      "<b>— General information —</b>",
      `<b>US work eligible:</b> ${esc(text(record.workEligible)) || "—"}`,
      `<b>Relevant vehicle experience:</b> ${esc(text(record.experience)) || "—"}`,
      `<b>Current license type:</b> ${esc(text(record.licenseType)) || "—"}`,
      `<b>Endorsements:</b> ${esc(endorsements.join(", ")) || "—"}`
    );
  }

  lines.push(`<i>${utcStamp(record.receivedAt)}</i>`);

  return lines.join("\n").slice(0, MAX_TEXT);
}

/** Sends the notification. Resolves true only when Telegram accepted it. */
export async function notifyTelegram(record: Record<string, unknown>): Promise<boolean> {
  const token = BOT_TOKEN.trim();
  const chatId = CHAT_ID.trim();
  if (!token || !chatId) return false;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatTelegramMessage(record),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    /* Telegram answers HTTP 200 even for API-level failures ("chat not
       found", "bot was blocked by the user"), so the body's ok flag is the
       real verdict — not the status code alone. */
    const result = (await res.json().catch(() => null)) as
      | { ok?: boolean; description?: string }
      | null;
    if (!res.ok || result?.ok !== true) {
      console.warn(
        `[contact] Telegram notify failed: HTTP ${res.status} ${
          result?.description ?? res.statusText
        }`
      );
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[contact] Telegram notify failed:", err instanceof Error ? err.message : err);
    return false;
  }
}
