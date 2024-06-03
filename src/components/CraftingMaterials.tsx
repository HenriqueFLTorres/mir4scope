"use client";

import { ChevronsUpDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Crafting from "./icon/Crafting";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import type { ListFiltersType } from "@/atom/ListFilters";
import { getNumber } from "@/lib/utils";
import { type Control, useController } from "react-hook-form";

const CRAFTING_MATERIAL_LIST = [
  "Dragon Scale",
  "Dragon Claw",
  "Dragon Leather",
  "Dragon Horn",
  "Dragon Eye",
] as const;

export function CraftingMaterialSelector({
  control,
}: { control: Control<ListFiltersType> }) {
  return (
    <Popover>
      <PopoverTrigger role="combobox" className="w-72 justify-between" noIcon>
        <Crafting className="h-5 w-5" />
        Crafting Materials
        <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60 transition-[opacity] group-data-[state=open]:opacity-100" />
      </PopoverTrigger>
      <PopoverContent align="start" className="flex gap-4 p-3">
        <div className="flex flex-col gap-4">
          {CRAFTING_MATERIAL_LIST.map((material) => (
            <MaterialItem
              key={material}
              name={material}
              control={control}
              rarity="Epic"
            />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {CRAFTING_MATERIAL_LIST.map((material) => (
            <MaterialItem
              key={material}
              name={material}
              control={control}
              rarity="Legendary"
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MaterialItem({
  name,
  rarity,
  control,
}: {
  name: MaterialsType;
  rarity: "Legendary" | "Epic";
  control: Control<ListFiltersType>;
}) {
  const formattedName = name.toLowerCase().replace(/\s/g, "_");

  const {
    field: { value, onChange },
  } = useController({
    name: `materials.${name}.${rarity}`,
    control,
  });

  return (
    <Label className="flex h-8 items-center gap-4" key={name}>
      <div className="flex h-10 w-10 items-center justify-center">
        <Image
          src={`/bg-${rarity}.webp`}
          alt={""}
          width={40}
          height={40}
          className="object-contain"
        />
        <Image
          src={`/material/${formattedName}.webp`}
          alt={name}
          width={28}
          height={28}
          className="absolute object-contain"
        />
      </div>
      <p className="sr-only">{name}</p>

      <Input
        prefix={<span className="absolute bottom-2 left-3 font-bold">+</span>}
        onChange={(e) => {
          const newValue = getNumber(e.currentTarget.value);

          onChange(newValue == null ? undefined : Math.min(newValue));
        }}
        value={value ? value : "0"}
        defaultValue={0}
        className="h-8 w-16 p-1 pl-4 text-center"
        wrapperClass="ml-auto"
      />
    </Label>
  );
}
