import Image from "next/image"
import type { UseFormResetField } from "react-hook-form"
import { FilterChip } from "./FilterChip"
import type { ListFiltersType } from "@/atom/ListFilters"
import { Spirit } from "@/components/other"

function SpiritsBadge({
  spirits,
  resetField,
}: {
  spirits: ListFiltersType["spirits"]
  resetField: UseFormResetField<ListFiltersType>
}) {
  if (spirits.length === 0) return null

  return (
    <FilterChip onRemove={() => resetField("spirits")}>
      <Spirit />

      <div className="flex items-center gap-1">
        {spirits.slice(0, 3).map((spirit) => {
          const formattedName = spirit.toLowerCase().replace(/\s/g, "-")

          return (
            <div
              className="flex cursor-pointer items-center justify-center rounded-full p-0"
              key={spirit}
            >
              <Image
                alt={spirit}
                className="object-contain"
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
