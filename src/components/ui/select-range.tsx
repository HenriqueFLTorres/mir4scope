import * as SliderPrimitive from "@radix-ui/react-slider"
import millify from "millify"
import { Input } from "./input"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { getNumber } from "@/lib/utils"

export interface SelectRangeProps
  extends Omit<
    SliderPrimitive.SliderProps,
    "defaultValue" | "min" | "max" | "step"
  > {
  label: string
  Icon: JSX.Element
  defaultValue: number[]
  min: number
  max: number
  showInput?: boolean
  step: number
  value: number[]
  onValueChange: (value: number[]) => void
}

const thumbStyling =
  "block h-5 w-5 rounded-full bg-gradient-to-b from-white to-[#B4B4B4] ring-offset-white transition-[colors,_box-shadow] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60"

const SelectRange = ({
  label,
  Icon,
  min,
  max,
  value,
  onValueChange,
  defaultValue,
  showInput = true,
  step,
  ...props
}: SelectRangeProps) => {
  const minValueBlur = () =>
    onValueChange([Math.min(value[0], value[1] - step), value[1]])

  const maxValueBlur = () =>
    onValueChange([
      value[0],
      Math.min(max, Math.max(value[0] + step, value[1])),
    ])

  return (
    <Popover
      onOpenChange={() => {
        minValueBlur()
        maxValueBlur()
      }}
    >
      <PopoverTrigger className="w-72">
        {Icon}
        {label} {`(${millify(value[0])} - ${millify(value[1])})`}
      </PopoverTrigger>
      <PopoverContent className="flex flex-row items-center gap-2 px-3 py-4">
        {showInput && (
          <Input
            className="h-max w-14 px-2 py-1 text-center"
            value={value[0]}
            onBlur={minValueBlur}
            onChange={(e) => {
              const newValue = getNumber(e.currentTarget.value)
              if (newValue === null) return

              onValueChange([newValue, value[1]])
            }}
          />
        )}

        <SliderPrimitive.Root
          className={
            "relative flex h-5 w-full touch-none select-none items-center"
          }
          defaultValue={defaultValue}
          max={max}
          min={min}
          step={step}
          value={value}
          onValueChange={(val) => onValueChange(val)}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-x-hidden rounded-full bg-white/20">
            <SliderPrimitive.Range className="absolute h-full bg-white" />
          </SliderPrimitive.Track>

          <SliderPrimitive.Thumb className={thumbStyling} />
          <SliderPrimitive.Thumb className={thumbStyling} />
        </SliderPrimitive.Root>

        {showInput && (
          <Input
            className="h-max w-14 px-2 py-1 text-center"
            value={value[1]}
            onBlur={maxValueBlur}
            onChange={(e) => {
              const newValue = getNumber(e.currentTarget.value)
              if (newValue === null) return

              onValueChange([value[0], newValue])
            }}
          />
        )}
      </PopoverContent>
    </Popover>
  )
}

export { SelectRange }
