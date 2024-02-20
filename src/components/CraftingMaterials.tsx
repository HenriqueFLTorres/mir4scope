"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { ListFilterAtom } from "@/atom/ListFilters";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAtom } from "jotai";
import Image from "next/image";
import Crafting from "./icon/Crafting";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const MAX_MATERIAL_AMOUNT = 100;

const CRAFTING_MATERIAL_LIST = [
  "Dragon Scale",
  "Dragon Claw",
  "Dragon Leather",
  "Dragon Horn",
  "Dragon Eye",
] as const;

export function CraftingMaterialSelector() {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        role="combobox"
        aria-expanded={open}
        className="w-72 justify-between"
        noIcon
      >
        <Crafting className="h-5 w-5" />
        Crafting Materials
        <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60 transition-[opacity] group-data-[state=open]:opacity-100" />
      </PopoverTrigger>
      <PopoverContent align="start" className="flex gap-4 p-3">
        <div className="flex flex-col gap-4">
          {CRAFTING_MATERIAL_LIST.map((material) => (
            <MaterialItem key={material} name={material} rarity="Epic" />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {CRAFTING_MATERIAL_LIST.map((material) => (
            <MaterialItem key={material} name={material} rarity="Legendary" />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MaterialItem({
  name,
  rarity,
}: {
  name: MaterialsType;
  rarity: "Legendary" | "Epic";
}) {
  const [{ materials }, setListFilter] = useAtom(ListFilterAtom);

  const formattedName = name.toLowerCase().replace(/\s/g, "_");

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
        value={materials[name][rarity]}
        onChange={(e) => {
          let value = Number(e.target.value);

          if (value < 0 || Number.isNaN(value)) return;
          if (value > MAX_MATERIAL_AMOUNT) value = MAX_MATERIAL_AMOUNT;

          setListFilter((prev) => ({
            ...prev,
            materials: {
              ...prev.materials,
              [name]: { ...prev.materials[name], [rarity]: value },
            },
          }));
        }}
        defaultValue={0}
        className="h-8 w-16 p-1 pl-4 text-center"
        wrapperClass="ml-auto"
      />
    </Label>
  );
}
