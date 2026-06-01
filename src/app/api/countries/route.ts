import { NextResponse } from "next/server";

export const revalidate = 300;

export async function GET() {
  try {
    const scriptUrl = process.env.GOOGLE_SCRIPT_API_URL;

    if (!scriptUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "GOOGLE_SCRIPT_API_URL is missing in .env.local",
        },
        { status: 500 }
      );
    }

    const finalUrl = `${scriptUrl}?action=countries`;

    const response = await fetch(finalUrl, {
      next: { revalidate: 300 },
    });

    const text = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Google Apps Script returned non-OK response",
          status: response.status,
          body: text.slice(0, 500),
        },
        { status: 500 }
      );
    }

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Google Apps Script did not return valid JSON",
          body: text.slice(0, 500),
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error fetching countries",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
