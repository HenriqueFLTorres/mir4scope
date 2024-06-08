"use client"

import { ChevronsUpDown } from "lucide-react"

import Image from "next/image"
import { type Control, useController } from "react-hook-form"
import { Input } from "../../../components/ui/elements/input"
import { Label } from "../../../components/ui/elements/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/elements/tooltip"
import type { ListFiltersType } from "@/atom/ListFilters"
import { Skill } from "@/components/other"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui"
import { getNumber } from "@/lib/utils"

export function MystiqueSelector({
  control,
}: {
  control: Control<ListFiltersType>
}) {
  return (
    <Popover>
      <PopoverTrigger className="w-72 justify-between" role="combobox" noIcon>
        <Skill className="h-5 w-5" />
        Mystique
        <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60 transition-[opacity] group-data-[state=open]:opacity-100" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="grid h-max max-h-none w-max grid-cols-2 gap-2 p-2"
      >
        {MYSTIQUE_LIST.map((mystique) => (
          <MystiqueFragment control={control} key={mystique} name={mystique} />
        ))}
      </PopoverContent>
    </Popover>
  )
}

function MystiqueFragment({
  name,
  control,
}: {
  name: NFT_MYSTIQUE
  control: Control<ListFiltersType>
}) {
  const {
    field: { value, onChange },
  } = useController({
    name: `mystique.${name}`,
    control,
  })
  const removeValue = () => onChange(undefined)

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Label className="relative flex h-32 w-32 flex-col items-center justify-end gap-2 overflow-hidden rounded-lg border border-black/20 text-sm font-medium last:w-full last-of-type:col-span-2">
            <Image
              alt={name}
              className="absolute -z-[1] h-full rounded-lg object-cover blur-lg"
              height={512}
              src={`/mystique/${name.toLowerCase().replace(/\s/g, "_")}.webp`}
              width={512}
            />

            <Image
              alt={name}
              className="absolute -z-[1] h-full rounded-lg object-contain"
              height={128}
              src={`/mystique/${name.toLowerCase().replace(/\s/g, "_")}.webp`}
              width={128}
            />

            <Input
              className="h-8 w-10 bg-gradient-to-b from-black/60 to-black/40 px-1 text-center backdrop-blur-md"
              placeholder="0"
              value={typeof value === "number" && value > 0 ? value : ""}
              wrapperClass="mb-2"
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

const MYSTIQUE_LIST: NFT_MYSTIQUE[] = [
  "Unicorn Lion Mystique",
  "Vermilion Bird Mystique",
  "Black Tortoise Mystique",
  "White Tiger Mystique",
  "Blue Dragon Mystique",
]
