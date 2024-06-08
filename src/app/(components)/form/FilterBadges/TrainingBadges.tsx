import { LIST_FILTER_DEFAULT, type ListFiltersType } from "@/atom/ListFilters"
import { Constitution } from "@/components/other"
import { isRangeDifferent } from "@/lib/utils"
import Image from "next/image"
import { getStatsRangeLabel } from "../StatusRange"
import { FilterChip } from "./FilterChip"

function TrainingBadges({
  training,
}: {
  training: ListFiltersType["training"]
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
      <FilterChip key={key}>
        {key === "Constitution" ? (
          <Constitution className="h-5 w-5" />
        ) : (
          <Image
            className=""
            alt=""
            width={24}
            height={24}
            src={`/training/${key.toLowerCase().replace(/\s/g, "_")}.webp`}
          />
        )}{" "}
        +{label}
      </FilterChip>
    )
  })
}

export { TrainingBadges }
