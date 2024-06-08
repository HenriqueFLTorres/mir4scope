"use client"

import { useAtomValue } from "jotai/index"
import Wemix from "../icon/Wemix"
import { UsdPriceAtom } from "@/atom/Price"
import { getReadableNumber } from "@/lib/utils"

interface NftPriceProps {
  nft_price: number
  seq: number
}

export default function NFTPrice(props: NftPriceProps) {
  const price = useAtomValue(UsdPriceAtom)

  const formattedPrice =
    typeof price === "number" && price > 0
      ? (Number(price) * props.nft_price).toFixed(2)
      : 0

  return (
    <a
      className="h-14 rounded-lg bg-gradient-to-b from-[#FF4BAC] to-[#89005A] p-0.5"
      href={`https://xdraco.com/nft/trade/${props.seq}`}
      rel="noreferrer"
      target="_blank"
    >
      <span className="flex h-full w-full items-center justify-center gap-4 rounded-lg bg-gradient-to-r from-[#140000] via-[#320030] to-[#140000] px-3 py-1.5 text-lg font-medium transition-colors hover:border-black/40 hover:bg-black/20">
        <Wemix className="h-6 w-6" /> {getReadableNumber(props.nft_price)}
        <b className="ml-2">${formattedPrice}</b>
      </span>
    </a>
  )
}
