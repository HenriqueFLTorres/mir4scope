import { NextResponse } from "next/server"

export async function GET() {
  const wemixUsd = await fetch(
    "https://api.coinbase.com/v2/prices/WEMIX-USD/spot"
  )
  const wemixBrl = await fetch(
    "https://api.coinbase.com/v2/prices/WEMIX-BRL/spot"
  )

  const usd_json = await wemixUsd.json()
  const brl_json = await wemixBrl.json()

  return NextResponse.json({
    WEMIX: 1,
    USD: usd_json.data.amount,
    BRL: brl_json.data.amount,
  })
}
