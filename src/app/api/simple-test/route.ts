import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const dateAPI = await fetch(
    "http://worldtimeapi.org/api/timezone/America/Sao_Paulo",
  );
  const response = await dateAPI.json();

  return NextResponse.json({
    fetchedAt: Date.now(),
    data: response,
  });
}
