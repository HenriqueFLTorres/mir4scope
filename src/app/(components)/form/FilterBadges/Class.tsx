import type { ListFiltersType } from "@/atom/ListFilters"
import { classIndexToName } from "@/lib/utils"
import Image from "next/image"
import { FilterChip } from "./FilterChip"

function ClassBadge({ mir4Class }: { mir4Class: ListFiltersType["class"] }) {
  return mir4Class === 0 ? null : (
    <FilterChip>
      <Image
        alt=""
        className="object-contain"
        height={20}
        src={`/icon/${classIndexToName(mir4Class).toLowerCase()}.webp`}
        width={20}
      />{" "}
      {classIndexToName(mir4Class)}
    </FilterChip>
  )
}

export { ClassBadge }
