import Image from "next/image"
import type { UseFormResetField } from "react-hook-form"
import { FilterChip } from "./FilterChip"
import type { ListFiltersType } from "@/atom/ListFilters"
import { Building } from "@/components/other"

function BuildingBadges({
  building,
  resetField,
}: {
  building: ListFiltersType["building"]
  resetField: UseFormResetField<ListFiltersType>
}) {
  return Object.entries(building).map(([key, value]) => {
    if (value === undefined || value < 1) return null

    return (
      <FilterChip
        key={key}
        onRemove={() => resetField(`building.${key as BuildingType}`)}
      >
        <Image
          alt=""
          className="absolute left-0 z-[-1] w-32 object-cover opacity-30"
          height={40}
          src={`/building/${key.toLowerCase().replace(/\s/g, "_")}.png`}
          width={128}
        />
        <Building /> +{value}
      </FilterChip>
    )
  })
}
export { BuildingBadges }
