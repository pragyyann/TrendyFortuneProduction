import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { sanitizeString } from "@/lib/sanitize";

export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 20;

// Safe fields that are allowed to be returned to the frontend.
// Never return raw sheet data beyond this list.
const SAFE_FIELDS = new Set([
  "application_id",
  "full_name",
  "mobile_number",
  "email",
  "preferred_country",
  "preferred_job_role",
  "role",
  "payment_status",
  "payment_amount",
  "payment_required",
  "status",
]);

function filterSafeFields(data: Record<string, unknown>): Record<string, unknown> {
  const safe: Record<string, unknown> = {};
  for (const key of SAFE_FIELDS) {
    if (key in data) {
      safe[key] = data[key];
    }
  }
  return safe;
}

export async function POST(request: NextRequest) {
  // ── Rate limiting ─────────────────────────────────────────────────
  const ip = getClientIp(request);
  const rl = checkRateLimit(ip, "lookup", MAX_REQUESTS, WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again after some time." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
    );
  }

  // ── Env guard ─────────────────────────────────────────────────────
  const scriptUrl = process.env.GOOGLE_SCRIPT_API_URL;
  if (!scriptUrl) {
    console.error("[lookup] GOOGLE_SCRIPT_API_URL is not configured");
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

  // ── Validate + sanitize application_id ───────────────────────────
  const rawId = body.application_id;
  if (!rawId || typeof rawId !== "string") {
    return NextResponse.json(
      { success: false, message: "Application ID is required." },
      { status: 400 }
    );
  }

  const applicationId = sanitizeString(rawId, 50).replace(/\s+/g, "");
  if (!applicationId) {
    return NextResponse.json(
      { success: false, message: "Application ID cannot be empty." },
      { status: 400 }
    );
  }

  // ── Forward to Apps Script (only application_id, nothing else) ────
  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "lookup_application_by_id",
        application_id: applicationId,
      }),
      cache: "no-store",
    });

    const text = await response.text();

    let data: Record<string, unknown>;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("[lookup] Apps Script returned non-JSON:", text.slice(0, 200));
      return NextResponse.json(
        { success: false, message: "Something went wrong. Please try again or contact us on WhatsApp." },
        { status: 500 }
      );
    }

    // Filter to safe fields before sending to frontend
    if (data.success && data.data && typeof data.data === "object") {
      data = {
        ...data,
        data: filterSafeFields(data.data as Record<string, unknown>),
      };
    }

    return NextResponse.json(data, {
      status: response.ok ? 200 : 500,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("[lookup] Fetch error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again or contact us on WhatsApp." },
      { status: 500 }
    );
  }
}
