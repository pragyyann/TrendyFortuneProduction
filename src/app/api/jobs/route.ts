import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const scriptUrl = process.env.GOOGLE_SCRIPT_API_URL;

    if (!scriptUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "GOOGLE_SCRIPT_API_URL is missing in env config",
        },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country");

    let finalUrl = `${scriptUrl}?action=jobs`;
    if (country) {
      finalUrl += `&country=${encodeURIComponent(country)}`;
    }

    const response = await fetch(finalUrl, {
      cache: "no-store",
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
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error fetching jobs",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
