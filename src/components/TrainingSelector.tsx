"use client"

import { ChevronsUpDown } from "lucide-react"

import Image from "next/image"
import type { ChangeEvent } from "react"
import { type Control, useController } from "react-hook-form"
import Constitution from "./icon/Constitution"
import InnerForce from "./icon/InnerForce"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import type { ListFiltersType } from "@/atom/ListFilters"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { getNumber } from "@/lib/utils"

export function TrainingSelector({
  control,
}: {
  control: Control<ListFiltersType>
}) {
  return (
    <Popover>
      <PopoverTrigger className="w-72 justify-between" role="combobox" noIcon>
        <InnerForce className="h-5 w-5" />
        Training
        <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60 transition-[opacity] group-data-[state=open]:opacity-100" />
      </PopoverTrigger>
      <PopoverContent align="start" className="flex w-96 flex-col gap-4 p-3">
        {TRAINING_LIST.map(({ name, max }) => (
          <TrainingFragment
            control={control}
            key={name}
            max={max}
            name={name}
          />
        ))}
      </PopoverContent>
    </Popover>
  )
}

function TrainingFragment({
  name,
  max,
  control,
}: {
  name: TrainingType
  max: number
  control: Control<ListFiltersType>
}) {
  const {
    field: { value, onChange },
  } = useController({
    name: `training.${name}`,
    control,
  })

  const minValue = value[0]
  const maxValue = value[1]

  const onBlurMin = (e: ChangeEvent<HTMLInputElement>) => {
    const newMinValue = getNumber(e.currentTarget.value)
    if (newMinValue == null) return onChange([0, maxValue])
    if (newMinValue > maxValue) return onChange([maxValue, maxValue])

    onChange([newMinValue, maxValue])
  }

  const onBlurMax = (e: ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = getNumber(e.currentTarget.value)
    if (newMaxValue == null) return onChange([minValue, max])
    if (newMaxValue < minValue) return onChange([minValue, minValue])

    if (newMaxValue > max) return onChange([minValue, max])

    onChange([minValue, newMaxValue])
  }

  return (
    <Label className="flex h-8 w-full items-center justify-end gap-2 text-sm font-medium">
      <TrainingIcon training={name} />
      {name}

      <Input
        className="h-8 w-10 px-1 text-center"
        value={minValue}
        wrapperClass="ml-auto"
        onBlur={onBlurMin}
        onChange={(e) => onChange([getNumber(e.target.value), maxValue])}
      />
      <Input
        className="h-8 w-10 px-1 text-center"
        defaultValue={max}
        value={maxValue}
        onBlur={onBlurMax}
        onChange={(e) => onChange([minValue, getNumber(e.target.value)])}
      />
    </Label>
  )
}

const TrainingIcon = ({ training }: { training: TrainingType }) => {
  if (training === "Constitution") return <Constitution className="h-8 w-12" />

  const formattedName = training.toLowerCase().replace(/\s/g, "_")

  return (
    <Image
      alt={training}
      className="h-8 object-contain"
      height={32}
      src={`/training/${formattedName}.webp`}
      width={48}
    />
  )
}

const TRAINING_LIST: { name: TrainingType; max: number }[] = [
  { name: "Constitution", max: 21 },
  { name: "Muscle Strength Manual", max: 20 },
  { name: "Nine Yin Manual", max: 20 },
  { name: "Nine Yang Manual", max: 20 },
  { name: "Violet Mist Art", max: 12 },
  { name: "Northern Profound Art", max: 12 },
  { name: "Toad Stance", max: 12 },
]
