import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { sanitizePayload } from "@/lib/sanitize";

export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

export async function POST(request: NextRequest) {
  // ── Rate limiting ─────────────────────────────────────────────────
  const ip = getClientIp(request);
  const rl = checkRateLimit(ip, "employer-inquiries", MAX_REQUESTS, WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again after some time." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
    );
  }

  // ── Env guard ─────────────────────────────────────────────────────
  const scriptUrl = process.env.GOOGLE_SCRIPT_API_URL;
  if (!scriptUrl) {
    console.error("[employer-inquiries] GOOGLE_SCRIPT_API_URL is not configured");
    return NextResponse.json(
      { success: false, message: "Server configuration error. Please try again later." },
      { status: 500 }
    );
  }

  // ── Parse body ────────────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request format." },
      { status: 400 }
    );
  }

  // ── Honeypot check ────────────────────────────────────────────────
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // ── Sanitize payload ──────────────────────────────────────────────
  const sanitized = sanitizePayload(body);
  sanitized.action = "employer_inquiry";
  delete sanitized.website;

  // ── Forward to Apps Script ────────────────────────────────────────
  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sanitized),
      cache: "no-store",
    });

    const text = await response.text();

    if (!response.ok) {
      console.error("[employer-inquiries] Apps Script non-OK response:", response.status);
      return NextResponse.json(
        { success: false, message: "Something went wrong. Please try again or contact us on WhatsApp." },
        { status: 500 }
      );
    }

    let data: Record<string, unknown>;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("[employer-inquiries] Apps Script returned non-JSON:", text.slice(0, 200));
      return NextResponse.json(
        { success: false, message: "Something went wrong. Please try again or contact us on WhatsApp." },
        { status: 500 }
      );
    }

    return NextResponse.json(data, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("[employer-inquiries] Fetch error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again or contact us on WhatsApp." },
      { status: 500 }
    );
  }
}
