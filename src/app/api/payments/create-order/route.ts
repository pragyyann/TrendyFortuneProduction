import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { sanitizeString } from "@/lib/sanitize";

export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 10;

export async function POST(request: NextRequest) {
  // ── Rate limiting ─────────────────────────────────────────────────
  const ip = getClientIp(request);
  const rl = checkRateLimit(ip, "payments-create-order", MAX_REQUESTS, WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again after some time." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
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
  const rawApplicationId = body.application_id;
  if (!rawApplicationId || typeof rawApplicationId !== "string") {
    return NextResponse.json(
      { success: false, message: "application_id is required." },
      { status: 400 }
    );
  }

  const applicationId = sanitizeString(rawApplicationId, 50).replace(/\s+/g, "");
  if (!applicationId) {
    return NextResponse.json(
      { success: false, message: "application_id cannot be empty." },
      { status: 400 }
    );
  }

  // ---------------------------------------------------------
  // TODO: Replace this placeholder with real gateway integration
  // when bank payment gateway credentials/docs are available.
  //
  // Expected env variables (server-side only, no NEXT_PUBLIC_):
  //   BANK_GATEWAY_MERCHANT_ID
  //   BANK_GATEWAY_SECRET_KEY
  //   BANK_GATEWAY_BASE_URL
  //   BANK_GATEWAY_RETURN_URL
  //   TOKEN_PAYMENT_AMOUNT
  // ---------------------------------------------------------

  const merchantId = process.env.BANK_GATEWAY_MERCHANT_ID;
  const secretKey = process.env.BANK_GATEWAY_SECRET_KEY;

  if (!merchantId || !secretKey) {
    return NextResponse.json(
      {
        success: false,
        message: "Payment gateway credentials not configured yet.",
        gateway_ready: false,
      },
      { status: 200 }
    );
  }

  // TODO: Implement actual payment order creation here
  try {
    return NextResponse.json(
      {
        success: false,
        message: "Payment gateway integration is pending implementation.",
        gateway_ready: false,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[payments/create-order] Error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again or contact us on WhatsApp." },
      { status: 500 }
    );
  }
}
