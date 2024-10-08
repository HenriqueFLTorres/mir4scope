import { useAtomValue } from "jotai/index"
import Image from "next/image"

import { UsdPriceAtom } from "@/atom/Price"
import {
  Accuracy,
  Codex,
  EVA,
  Globe,
  PHYSATK,
  PHYSDEF,
  Power,
  SpellATK,
  SpellDEF,
  Wemix,
} from "@/components/other"
import { classIndexToName, getReadableNumber } from "@/lib/utils"
import type { NFTForDisplay } from "@/types/schema"
import { memo } from "react"
import { getCardRarity, getNFTColor } from "."
import GlassChip from "./GlassChip"

const STATS_TO_DISPLAY: NFT_STATS_ENUM[] = [
  "PHYS ATK",
  "PHYS DEF",
  "Spell ATK",
  "Spell DEF",
  "EVA",
  "Accuracy",
]

function CardFront({
  character_name,
  power_score,
  class: classIndex,
  price,
  lvl,
  stats,
  codex,
  world_name,
}: NFTForDisplay) {
  const mir4Class = classIndexToName(classIndex)

  const usdPrice = useAtomValue(UsdPriceAtom)
  const formattedPrice =
    usdPrice == null ? 0 : (Number(usdPrice) * price).toFixed(2)

  return (
    <div
      className="backface-hidden absolute h-full w-full overflow-hidden rounded-lg border-4 shadow-inner drop-shadow-lg"
      style={{ borderColor: getNFTColor(power_score) }}
    >
      <Image
        alt=""
        className="pointer-events-none absolute z-[-1] h-[22rem] w-72 object-cover"
        src={`/${getCardRarity(power_score)}-card.webp`}
        fill
      />

      <p className="pointer-events-none absolute left-0 top-14 z-[-1] inline-block shrink-0 text-nowrap text-6xl font-bold text-white opacity-40 drop-shadow-lg">
        {character_name}
      </p>

      <div
        className={
          "absolute left-0 top-0 z-[-1] h-44 w-full bg-gradient-to-b to-black/0 opacity-75"
        }
        style={{
          backgroundImage: `linear-gradient(to bottom, ${getNFTColor(
            power_score
          )}, rgba(0,0,0,0))`,
        }}
      />

      <div
        className={
          "absolute bottom-0 left-0 z-[-1] h-44 w-full bg-gradient-to-t to-black/0 opacity-75"
        }
        style={{
          backgroundImage: `linear-gradient(to top, ${getNFTColor(
            power_score
          )}, rgba(0,0,0,0))`,
        }}
      />

      <Image
        alt=""
        className="pointer-events-none absolute bottom-0 left-1/2 z-[-1] max-w-2xl -translate-x-1/2 rounded-md object-contain"
        height={540}
        src={`/class-preview/${mir4Class.toLowerCase()}.webp`}
        width={288}
      />

      <ul className="grid grid-cols-3 items-center justify-between gap-1 p-1">
        {STATS_TO_DISPLAY.map((name) => {
          if (!(name in stats)) return null

          const value = stats[name]

          const StatIcon = getStatIcon(name)
          if (value === undefined) return null

          return (
            <li
              className="flex h-8 w-full items-center gap-2 rounded border border-black/10 bg-black/40 p-1 drop-shadow-sm backdrop-blur-md"
              key={name}
            >
              <StatIcon className="h-5 w-5 shrink-0" />
              <p className="flex w-full justify-center text-xs font-medium text-white">
                {value}
              </p>
            </li>
          )
        })}
      </ul>

      <footer className="absolute bottom-0 mt-auto flex w-full flex-col gap-2 p-1">
        <div className="flex w-full items-end justify-between">
          <h2 className="leading-none drop-shadow-[0px_2px_2px_rgba(0,0,0,0.4)]">
            {character_name}
          </h2>

          <h3 className="text-base leading-none drop-shadow-[0px_2px_2px_rgba(0,0,0,0.4)]">
            LV. {lvl}
          </h3>
        </div>

        <div className="flex w-full items-center justify-between">
          <GlassChip className="w-max">
            <Power className="h-4 w-4" /> {getReadableNumber(power_score)}
          </GlassChip>

          <GlassChip className="w-max">
            <Globe className="h-4 w-4" /> {world_name}
          </GlassChip>

          <GlassChip className="w-max">
            <Codex className="h-4 w-4" /> {codex.completed}
          </GlassChip>
        </div>

        <GlassChip className="mt-auto justify-center text-base">
          <Wemix className="h-5 w-5" /> {getReadableNumber(price)}
          <b className="ml-2">${formattedPrice}</b>
        </GlassChip>
      </footer>
    </div>
  )
}

export function getStatIcon(stat: NFT_STATS_ENUM) {
  switch (stat) {
    case "PHYS ATK":
      return PHYSATK
    case "PHYS DEF":
      return PHYSDEF
    case "Spell ATK":
      return SpellATK
    case "Spell DEF":
      return SpellDEF
    case "EVA":
      return EVA
    case "Accuracy":
      return Accuracy
    default:
      throw new Error(`Unknown stat type: ${stat}`)
  }
}

const NFTCardFront = memo(CardFront)

export default NFTCardFront
