import type { ListFiltersType } from "@/atom/ListFilters"
import { Building } from "@/components/other"
import Image from "next/image"
import { FilterChip } from "./FilterChip"

function BuildingBadges({
  building,
}: {
  building: ListFiltersType["building"]
}) {
  return Object.entries(building).map(([key, value]) => {
    if (value === undefined || value < 1) return null

    return (
      <FilterChip key={key}>
        <Image
          className="absolute left-0 z-[-1] w-32 object-cover opacity-30"
          alt=""
          width={128}
          height={40}
          src={`/building/${key.toLowerCase()}.png`}
        />
        <Building /> +{value}
      </FilterChip>
    )
  })
}
export { BuildingBadges }
