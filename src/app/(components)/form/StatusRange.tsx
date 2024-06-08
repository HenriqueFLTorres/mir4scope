import type { ListFiltersType, ListStatusEnum } from "@/atom/ListFilters"
import { cn } from "@/lib/cn"
import { getNumber } from "@/lib/utils"
import { X } from "lucide-react"
import millify from "millify"
import { useController, type Control } from "react-hook-form"
import { Input } from "../../../components/ui/elements/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/elements/popover"

export interface StatusRangeProps {
  label: ListStatusEnum
  Icon: JSX.Element
  control: Control<ListFiltersType>
}

const validateRange = (value: [undefined | number, undefined | number]) => {
  if (Number(value[0]) > Number(value[1])) return false

  return true
}

const StatusRange = ({ label, Icon, control }: StatusRangeProps) => {
  const {
    field: { value, onChange },
    fieldState: { invalid },
  } = useController({
    name: `stats.${label}`,
    control,
    rules: {
      validate: validateRange,
    },
  })

  const minValue = value[0]
  const maxValue = value[1]

  return (
    <Popover>
      <PopoverTrigger
        className={cn("w-72 font-normal", {
          "border-error-400 from-error-400/20 to-error-400/5 focus:ring-error-400":
            invalid,
        })}
      >
        {Icon}
        <span>
          {label} <b>({getStatsRangeLabel(minValue, maxValue)})</b>
        </span>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-center gap-4 px-3 py-4">
        <div className="flex w-full items-end gap-2">
          <Input
            autoComplete="off"
            className="h-max w-full px-2 py-1"
            label="Min"
            name="min"
            value={typeof minValue === "number" && minValue > 0 ? minValue : ""}
            wrapperClass="w-full"
            onChange={(e) => {
              const newValue = getNumber(e.currentTarget.value)
              if (newValue === null) return onChange([undefined, maxValue])

              onChange([newValue, maxValue])
            }}
          />

          <button
            className="h-[1.875rem] w-[1.875rem] shrink-0 rounded border border-black/20 bg-black/10 hover:bg-black/20"
            type="button"
            onClick={() => onChange([undefined, maxValue])}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex w-full items-end gap-2">
          <Input
            autoComplete="off"
            className="h-max w-full px-2 py-1"
            label="Max"
            name="max"
            value={typeof maxValue === "number" && maxValue > 0 ? maxValue : ""}
            wrapperClass="w-full"
            onChange={(e) => {
              const newValue = getNumber(e.currentTarget.value)
              if (newValue === null) return onChange([minValue, undefined])

              onChange([minValue, newValue])
            }}
          />

          <button
            className="h-[1.875rem] w-[1.875rem] shrink-0 rounded border border-black/20 bg-black/10 hover:bg-black/20"
            type="button"
            onClick={() => onChange([minValue, undefined])}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const getStatsRangeLabel = (
  minValue: number | undefined,
  maxValue: number | undefined
) => {
  const firstValue = Number(minValue)
  const secondValue = Number(maxValue)

  if (Number.isInteger(firstValue) && Number.isInteger(secondValue))
    return `${millify(firstValue)} - ${millify(secondValue)}`
  if (Number.isInteger(firstValue)) return `>= ${millify(firstValue)}`
  if (Number.isInteger(secondValue)) return `<= ${millify(secondValue)}`

  return "Any"
}

export { StatusRange, getStatsRangeLabel }
