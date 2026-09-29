import { NextResponse } from "next/server";

/**
 * Contact form intake. No email/CRM integration yet — validate, log, ack.
 * When the client confirms an email destination, plug it in here (Resend,
 * Nodemailer SMTP, etc.) without touching the form component.
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

  // TODO: forward to email/CRM once the client confirms the destination.
  console.log("[contact]", {
    role,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    phone: phone.trim(),
    message: typeof message === "string" ? message.trim() : "",
    smsConsent: smsConsent === true,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}