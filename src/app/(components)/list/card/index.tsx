import Link from "next/link"
import NFTCardBack from "./Back"
import NFTCardFront from "./Front"
import type { NFTForDisplay } from "@/types/schema"

export default function NFTCard(data: NFTForDisplay) {
  return (
    <Link
      className="preserve-3d group group relative flex h-[25rem] w-72 hover:z-10"
      href={`/nft/${data.seq}`}
    >
      <div className="preserve-3d group-hover:rotate-y-180 relative flex h-[25rem] w-72 duration-500">
        <NFTCardFront {...data} />
        <NFTCardBack {...data} />
      </div>
    </Link>
  )
}

export function getCardRarity(powerScore: number) {
  if (powerScore >= 205000) return "legendary"
  if (powerScore >= 170000) return "epic"
  if (powerScore >= 135000) return "rare"

  return "uncommon"
}

export function getNFTColor(powerScore: number) {
  if (powerScore >= 205000) return "#C5983F"
  if (powerScore >= 170000) return "#7E1315"
  if (powerScore >= 135000) return "#193148"

  return "#1B4C39"
}
