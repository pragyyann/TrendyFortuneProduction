import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON request body.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------
    // TODO: Replace this placeholder with real payment verification
    // when bank payment gateway credentials/docs are available.
    //
    // Steps when implementing:
    //   1. Read gateway credentials from process.env
    //   2. Verify payment signature / transaction status via gateway API
    //   3. If verified, update payment_status in Applications sheet
    //      via Apps Script (action: "update_payment_status")
    //   4. Return verification result to frontend
    //
    // Expected body fields (varies by gateway):
    //   - order_id / transaction_id
    //   - payment_signature
    //   - application_id
    // ---------------------------------------------------------

    void body; // Acknowledge body is read but unused for now

    return NextResponse.json(
      {
        success: false,
        message: "Payment verification is not configured yet.",
        gateway_ready: false,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error verifying payment.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
