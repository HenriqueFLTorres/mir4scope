import { NextResponse } from "next/server"

export async function GET() {
  const request = await fetch(
    "https://api.coinbase.com/v2/prices/WEMIX-USD/spot"
  )

  const json_request = await request.json()

  return NextResponse.json(json_request.data.amount)
}
