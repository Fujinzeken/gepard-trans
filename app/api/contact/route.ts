import { NextResponse } from "next/server";

import { notifyTelegram } from "./telegram";

/**
 * Contact form intake.
 * 1. Validate + log.
 * 2. POST the submission to the client's Google Apps Script web app
 *    (GOOGLE_SCRIPT_URL — the script source lives in apps-script/Code.gs,
 *    one sheet tab per role: Drivers / Partners / Customers). Apps Script
 *    answers with a 302 to its content host (script.googleusercontent.com),
 *    which serves the script's JSON response via GET — Google executes the
 *    original POST (payload included) when the redirect target is fetched,
 *    so we follow the redirect manually with GET.
 * 3. Push a Telegram notification to the dispatch chat (see ./telegram.ts,
 *    TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID). Both channels run in parallel.
 *
 * Both deliveries are best-effort: if either is unconfigured or unreachable we
 * still ack ok:true so the visitor never loses their submission — the failure
 * is reported in the response body (forwarded / notified) and logged
 * server-side.
 */

type ContactPayload = {
  role?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  phone?: unknown;
  message?: unknown;
  smsConsent?: unknown;
  /* Driver applications only (see components/driver-fields.tsx) */
  workEligible?: unknown;
  experience?: unknown;
  licenseType?: unknown;
  endorsements?: unknown;
};

const ROLES = new Set(["driver", "partner", "customer"]);

/* Driver answers are allow-listed before they reach the sheet, so a
   hand-rolled POST can't write arbitrary values into the client's rows. */
const WORK_ELIGIBLE = new Set(["Yes", "No"]);
const EXPERIENCE = new Set(["Yes", "Partner", "No"]);
const LICENSE_TYPES = new Set([
  "Class A CDL",
  "Class B CDL",
  "No license, but would like to obtain one",
]);
const ENDORSEMENTS = new Set(["Doubles", "Triples", "HazMat", "None"]);

function pick(allowed: Set<string>, value: unknown): string {
  return typeof value === "string" && allowed.has(value) ? value : "";
}

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL ?? "";

/** Apps Script web apps respond 302 → script.googleusercontent.com/…/echo.
 *  The echo endpoint serves the script's result via GET only (POSTing it
 *  returns 405). Follow the redirect manually with GET — Google executes the
 *  original POST (payload included) and echoes its response. Max 3 hops. */
async function postWithRedirects(url: string, init: RequestInit, hop = 0): Promise<Response> {
  const res = await fetch(url, { ...init, redirect: "manual" });
  if (res.status >= 300 && res.status < 400 && hop < 3) {
    const location = res.headers.get("location");
    if (location) {
      return postWithRedirects(
        new URL(location, url).toString(),
        { ...init, method: "GET", body: undefined },
        hop + 1
      );
    }
  }
  return res;
}

async function forwardToScript(record: Record<string, unknown>): Promise<boolean> {
  const url = GOOGLE_SCRIPT_URL.trim();
  if (!url) return false;
  try {
    const res = await postWithRedirects(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) {
      console.warn(`[contact] Sheet sync failed: Apps Script HTTP ${res.status}`);
      return false;
    }
    const raw = await res.text();
    try {
      return (JSON.parse(raw) as { ok?: boolean }).ok !== false;
    } catch {
      console.warn("[contact] Sheet sync failed: non-JSON response from Apps Script");
      return false;
    }
  } catch (err) {
    console.warn("[contact] Sheet sync failed:", err instanceof Error ? err.message : err);
    return false;
  }
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const {
    role,
    firstName,
    lastName,
    phone,
    message,
    smsConsent,
    workEligible,
    experience,
    licenseType,
    endorsements,
  } = body;

  if (
    typeof role !== "string" ||
    !ROLES.has(role) ||
    typeof firstName !== "string" ||
    firstName.trim().length === 0 ||
    typeof lastName !== "string" ||
    lastName.trim().length === 0 ||
    typeof phone !== "string" ||
    !/^[+\d][\d\s().-]{6,}$/.test(phone.trim())
  ) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const record: Record<string, unknown> = {
    role,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    phone: phone.trim(),
    message: typeof message === "string" ? message.trim().slice(0, 2000) : "",
    smsConsent: smsConsent === true,
    receivedAt: new Date().toISOString(),
  };

  /* Driver applications carry the extra "General information" answers; the
     sheet's Drivers tab has a column for each (see apps-script/Code.gs). */
  if (role === "driver") {
    record.workEligible = pick(WORK_ELIGIBLE, workEligible);
    record.experience = pick(EXPERIENCE, experience);
    record.licenseType = pick(LICENSE_TYPES, licenseType);
    record.endorsements = Array.isArray(endorsements)
      ? endorsements.filter((v): v is string => typeof v === "string" && ENDORSEMENTS.has(v))
      : [];
  }

  console.log("[contact]", record);

  /* The two channels are independent — run them together so a slow Apps Script
     hop can't delay the Telegram ping (or vice versa). */
  const [forwarded, notified] = await Promise.all([
    forwardToScript(record),
    notifyTelegram(record),
  ]);

  return NextResponse.json({ ok: true, forwarded, notified });
}
