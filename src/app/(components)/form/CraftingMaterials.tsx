"use client"

import { ChevronsUpDown } from "lucide-react"

import Image from "next/image"
import { type Control, useController } from "react-hook-form"

import type { ListFiltersType } from "@/atom/ListFilters"
import { Crafting } from "@/components/other"
import {
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui"
import { getNumber } from "@/lib/utils"

const CRAFTING_MATERIAL_LIST = [
  "Dragon Scale",
  "Dragon Claw",
  "Dragon Leather",
  "Dragon Horn",
  "Dragon Eye",
] as const

export function CraftingMaterialSelector({
  control,
}: {
  control: Control<ListFiltersType>
}) {
  return (
    <Popover>
      <PopoverTrigger className="w-72 justify-between" role="combobox" noIcon>
        <Crafting className="h-5 w-5" />
        Crafting Materials
        <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60 transition-[opacity] group-data-[state=open]:opacity-100" />
      </PopoverTrigger>
      <PopoverContent align="start" className="flex gap-4 p-3">
        <div className="flex flex-col gap-4">
          {CRAFTING_MATERIAL_LIST.map((material) => (
            <MaterialItem
              control={control}
              key={material}
              name={material}
              rarity="Epic"
            />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {CRAFTING_MATERIAL_LIST.map((material) => (
            <MaterialItem
              control={control}
              key={material}
              name={material}
              rarity="Legendary"
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function MaterialItem({
  name,
  rarity,
  control,
}: {
  name: MaterialsType
  rarity: "Legendary" | "Epic"
  control: Control<ListFiltersType>
}) {
  const formattedName = name.toLowerCase().replace(/\s/g, "_")

  const {
    field: { value, onChange },
  } = useController({
    name: `materials.${name}.${rarity}`,
    control,
  })

  return (
    <Label className="flex h-8 items-center gap-4" key={name}>
      <div className="flex h-10 w-10 items-center justify-center">
        <Image
          alt={""}
          className="object-contain"
          height={40}
          src={`/bg-${rarity}.webp`}
          width={40}
        />
        <Image
          alt={name}
          className="absolute object-contain"
          height={28}
          src={`/material/${formattedName}.webp`}
          width={28}
        />
      </div>
      <p className="sr-only">{name}</p>

      <Input
        className="h-8 w-16 p-1 pl-4 text-center"
        defaultValue={0}
        prefix={<span className="absolute bottom-2 left-3 font-bold">+</span>}
        value={typeof value === "number" && value > 0 ? value : "0"}
        wrapperClass="ml-auto"
        onChange={(e) => {
          const newValue = getNumber(e.currentTarget.value)

          onChange(newValue == null ? undefined : Math.min(newValue))
        }}
      />
    </Label>
  )
}
