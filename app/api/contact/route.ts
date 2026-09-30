import { NextResponse } from "next/server";

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
 *
 * If GOOGLE_SCRIPT_URL is unset or the endpoint is unreachable, we still
 * ack ok:true so the visitor never loses their submission — the failure is
 * logged server-side.
 */

type ContactPayload = {
  role?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  phone?: unknown;
  message?: unknown;
  smsConsent?: unknown;
};

const ROLES = new Set(["driver", "partner", "customer"]);

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

  const { role, firstName, lastName, phone, message, smsConsent } = body;

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

  const record = {
    role,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    phone: phone.trim(),
    message: typeof message === "string" ? message.trim().slice(0, 2000) : "",
    smsConsent: smsConsent === true,
    receivedAt: new Date().toISOString(),
  };

  console.log("[contact]", record);

  const forwarded = await forwardToScript(record);

  return NextResponse.json({ ok: true, forwarded });
}
