"use client"

import { ChevronsUpDown } from "lucide-react"

import Image from "next/image"
import { type Control, useController } from "react-hook-form"
import type { ListFiltersType } from "@/atom/ListFilters"
import { Building } from "@/components/other"
import {
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui"
import { getNumber } from "@/lib/utils"

export function BuildingSelector({
  control,
}: {
  control: Control<ListFiltersType>
}) {
  return (
    <Popover>
      <PopoverTrigger className="w-72 justify-between" role="combobox" noIcon>
        <Building className="h-5 w-5" />
        Building
        <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60 transition-[opacity] group-data-[state=open]:opacity-100" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="grid h-max max-h-none w-max grid-cols-3 gap-2 p-2"
      >
        {BUILDING_LIST.map((building) => (
          <BuildingFragment control={control} key={building} name={building} />
        ))}
      </PopoverContent>
    </Popover>
  )
}

function BuildingFragment({
  name,
  control,
}: {
  name: BuildingType
  control: Control<ListFiltersType>
}) {
  const {
    field: { value, onChange },
  } = useController({
    name: `building.${name}`,
    control,
  })
  const removeValue = () => onChange(undefined)

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Label className="relative flex h-20 w-20 flex-col items-center justify-end gap-2 rounded-lg text-sm font-medium last:w-full last-of-type:col-span-3">
            <Image
              alt={name}
              className="absolute -z-[1] h-full rounded-lg object-cover"
              height={476}
              src={`/building/${name.toLowerCase().replace(/\s/g, "_")}.png`}
              width={476}
            />

            <Input
              className="h-8 w-10 bg-gradient-to-b from-black/60 to-black/40 px-1 text-center backdrop-blur-md"
              placeholder="0"
              value={typeof value === "number" && value > 0 ? value : ""}
              wrapperClass="mb-1"
              onChange={(e) => {
                const newValue = getNumber(e.currentTarget.value)
                if (newValue === null) return removeValue()

                onChange(newValue)
              }}
            />
          </Label>
        </TooltipTrigger>
        <TooltipContent className="font-bold">{name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const BUILDING_LIST: BuildingType[] = [
  "Mine",
  "Forge",
  "Sanctuary of Hydra",
  "Tower of Quintessence",
  "Millennial Tree",
  "Portal",
  "Tower of Victory",
  "Training Sanctum",
  "Holy Shrine",
  "Tower of Conquest",
]
