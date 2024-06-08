import Image from "next/image"
import { FilterChip } from "./FilterChip"
import type { ListFiltersType } from "@/atom/ListFilters"
import { classIndexToName } from "@/lib/utils"

function ClassBadge({
  mir4Class,
  onRemove,
}: {
  mir4Class: ListFiltersType["class"]
  onRemove: () => void
}) {
  return mir4Class === 0 ? null : (
    <FilterChip onRemove={onRemove}>
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
