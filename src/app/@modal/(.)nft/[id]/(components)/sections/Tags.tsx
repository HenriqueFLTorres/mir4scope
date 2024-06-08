import { Codex, EXP, Globe, Power } from "@/components/other"
import { getReadableNumber } from "@/lib/utils"
import type { NFTSelectAll } from "@/types/schema"

export default function NFTTags({
  lvl,
  powerScore,
  worldName,
}: Pick<NFTSelectAll, "lvl" | "powerScore" | "worldName">) {
  return (
    <ul className="flex flex-wrap gap-2">
      <NFTChips>
        <EXP className="h-6 w-6" /> {lvl}
      </NFTChips>
      <NFTChips>
        <Codex className="h-6 w-6" /> 9,243
      </NFTChips>
      <NFTChips>
        <Power className="h-6 w-6" /> {getReadableNumber(powerScore)}
      </NFTChips>
      <NFTChips>
        <Globe className="h-6 w-6" /> {worldName}
      </NFTChips>
    </ul>
  )
}

function NFTChips({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex w-max items-center gap-2 rounded-md border border-black/20 bg-black/10 px-3 py-1.5 text-lg font-medium">
      {children}
    </span>
  )
}
