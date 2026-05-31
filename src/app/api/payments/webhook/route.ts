import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    // ---------------------------------------------------------
    // TODO: Replace this placeholder with real webhook handler
    // when bank payment gateway credentials/docs are available.
    //
    // Steps when implementing:
    //   1. Read raw body for signature verification
    //   2. Verify webhook signature using BANK_GATEWAY_WEBHOOK_SECRET
    //   3. Parse payment event (success/failure/refund)
    //   4. Update payment_status in Applications sheet via Apps Script
    //   5. Return 200 to acknowledge receipt
    //
    // IMPORTANT: Webhook routes should verify signatures to prevent
    // spoofed payment confirmations.
    // ---------------------------------------------------------

    const rawBody = await request.text();

    if (!rawBody) {
      return NextResponse.json(
        {
          success: false,
          message: "Empty webhook payload.",
        },
        { status: 400 }
      );
    }

    // const webhookSecret = process.env.BANK_GATEWAY_WEBHOOK_SECRET;
    // TODO: Verify signature from request headers against rawBody

    return NextResponse.json(
      {
        success: false,
        message: "Payment webhook is not configured yet.",
        gateway_ready: false,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error processing webhook.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
