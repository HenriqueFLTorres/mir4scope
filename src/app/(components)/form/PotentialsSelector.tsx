"use client"

import { ChevronsUpDown } from "lucide-react"

import Image from "next/image"
import { useController, type Control } from "react-hook-form"
import { Input } from "../../../components/ui/elements/input"
import { Label } from "../../../components/ui/elements/label"

import type { ListFiltersType } from "@/atom/ListFilters"
import { Skill } from "@/components/other"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui"
import { getNumber } from "@/lib/utils"

const POTENTIALS = ["Hunting", "PvP", "Secondary"] as const

export function PotentialsSelector({
  control,
}: {
  control: Control<ListFiltersType>
}) {
  return (
    <Popover>
      <PopoverTrigger className="w-72 justify-between" role="combobox" noIcon>
        <Skill className="h-5 w-5" />
        Potentials
        <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60 transition-[opacity] group-data-[state=open]:opacity-100" />
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-4 p-3">
        {POTENTIALS.map((potential) => (
          <PotentialFragment
            control={control}
            key={potential}
            name={potential}
          />
        ))}
      </PopoverContent>
    </Popover>
  )
}

function PotentialFragment({
  name,
  control,
}: {
  name: PotentialType
  control: Control<ListFiltersType>
}) {
  const formattedName = name.toLowerCase().replace(/\s/g, "_")

  const MAX_VALUE = 294

  const {
    field: { value, onChange },
  } = useController({
    name: `potentials.${name}`,
    control,
  })

  return (
    <Label className="flex h-8 items-center gap-4">
      {
        <Image
          alt={name}
          className="object-contain"
          height={32}
          src={`/potential/${formattedName}.webp`}
          width={32}
        />
      }
      <p className="text-sm font-medium">{name}</p>

      <Input
        className="h-8 w-16 p-1 pl-4 text-center"
        defaultValue={0}
        prefix={<span className="absolute bottom-2 left-3 font-bold">+</span>}
        type="number"
        value={typeof value === "number" && value > 0 ? value : "0"}
        wrapperClass="ml-auto"
        onChange={(e) => {
          const newValue = getNumber(e.currentTarget.value)

          onChange(newValue == null ? undefined : Math.min(newValue, MAX_VALUE))
        }}
      />
    </Label>
  )
}
