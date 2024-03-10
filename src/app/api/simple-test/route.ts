import { NextResponse } from "next/server";

export async function GET() {
  const dateAPI = await fetch(
    "http://worldtimeapi.org/api/timezone/America/Sao_Paulo",
  );
  const response = await dateAPI.json();

  return NextResponse.json({
    fetchedAt: Date.now(),
    data: response,
  });
}
