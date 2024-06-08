import Image from "next/image"
import type { UseFormResetField } from "react-hook-form"
import { getStatsRangeLabel } from "../StatusRange"
import { FilterChip } from "./FilterChip"
import { LIST_FILTER_DEFAULT, type ListFiltersType } from "@/atom/ListFilters"
import { Constitution } from "@/components/other"
import { isRangeDifferent } from "@/lib/utils"

function TrainingBadges({
  training,
  resetField,
}: {
  training: ListFiltersType["training"]
  resetField: UseFormResetField<ListFiltersType>
}) {
  return Object.entries(training).map(([key, value]) => {
    const minValue = value[0]
    const maxValue = value[1]

    const isDifferent = isRangeDifferent(
      LIST_FILTER_DEFAULT.training[key as TrainingType],
      value
    )

    if (!isDifferent) return null

    const label = getStatsRangeLabel(minValue, maxValue)

    return (
      <FilterChip
        key={key}
        onRemove={() => resetField(`training.${key as TrainingType}`)}
      >
        {key === "Constitution" ? (
          <Constitution className="h-5 w-5" />
        ) : (
          <Image
            alt=""
            className=""
            height={24}
            src={`/training/${key.toLowerCase().replace(/\s/g, "_")}.webp`}
            width={24}
          />
        )}{" "}
        {label}
      </FilterChip>
    )
  })
}

export { TrainingBadges }
