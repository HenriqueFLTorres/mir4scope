import type { ListFiltersType } from "@/atom/ListFilters"
import { Spirit } from "@/components/other"
import Image from "next/image"
import { FilterChip } from "./FilterChip"

function SpiritsBadge({ spirits }: { spirits: ListFiltersType["spirits"] }) {
  if (spirits.length === 0) return null

  return (
    <FilterChip>
      <Spirit />

      <div className="flex items-center gap-1">
        {spirits.slice(0, 3).map((spirit) => {
          const rarity = "Legendary"
          console.log(rarity, spirit)
          const formattedName = spirit.toLowerCase().replace(/\s/g, "-")

          return (
            <div
              className="flex cursor-pointer items-center justify-center rounded-full p-0"
              key={spirit}
            >
              <Image
                alt={""}
                className="object-contain"
                height={28}
                src={`/bg-${rarity.toLowerCase()}.webp`}
                width={28}
              />
              <Image
                alt={spirit}
                className="absolute object-contain"
                height={24}
                src={`/spirit/${formattedName}.webp`}
                width={24}
              />
            </div>
          )
        })}
      </div>

      {spirits.length > 3 ? `+${spirits.length - 3}` : null}
    </FilterChip>
  )
}

export { SpiritsBadge }