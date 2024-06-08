import { X } from "lucide-react"
import millify from "millify"
import { type Control, useController } from "react-hook-form"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import type { ListFiltersType, ListStatusEnum } from "@/atom/ListFilters"
import { cn, getNumber } from "@/lib/utils"

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

  const getLabel = () => {
    const firstValue = Number(value[0])
    const secondValue = Number(value[1])

    if (firstValue && secondValue)
      return `${millify(firstValue)} - ${millify(secondValue)}`
    if (firstValue) return `>= ${millify(firstValue)}`
    if (secondValue) return `<= ${millify(secondValue)}`

    return "Any"
  }

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
          {label} <b>({getLabel()})</b>
        </span>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-center gap-4 px-3 py-4">
        <div className="flex w-full items-end gap-2">
          <Input
            autoComplete="off"
            className="h-max w-full px-2 py-1"
            label="Min"
            name="min"
            value={value[0] ? value[0] : ""}
            wrapperClass="w-full"
            onChange={(e) => {
              const newValue = getNumber(e.currentTarget.value)
              if (newValue === null) return onChange([undefined, value[1]])

              onChange([newValue, value[1]])
            }}
          />

          <button
            className="h-[1.875rem] w-[1.875rem] shrink-0 rounded border border-black/20 bg-black/10 hover:bg-black/20"
            type="button"
            onClick={() => onChange([undefined, value[1]])}
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
            value={value[1] ? value[1] : ""}
            wrapperClass="w-full"
            onChange={(e) => {
              const newValue = getNumber(e.currentTarget.value)
              if (newValue === null) return onChange([value[0], undefined])

              onChange([value[0], newValue])
            }}
          />

          <button
            className="h-[1.875rem] w-[1.875rem] shrink-0 rounded border border-black/20 bg-black/10 hover:bg-black/20"
            type="button"
            onClick={() => onChange([value[0], undefined])}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { StatusRange }
