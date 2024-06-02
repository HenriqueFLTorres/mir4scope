"use client";

import { ChevronsUpDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import type { ListFiltersType } from "@/atom/ListFilters";
import { getNumber } from "@/lib/utils";
import { type Control, useController } from "react-hook-form";
import Skill from "./icon/Skill";

const POTENTIALS = ["Hunting", "PvP", "Secondary"] as const;

export function PotentialsSelector({
  control,
}: { control: Control<ListFiltersType> }) {
  return (
    <Popover>
      <PopoverTrigger role="combobox" className="w-72 justify-between" noIcon>
        <Skill className="h-5 w-5" />
        Potentials
        <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60 transition-[opacity] group-data-[state=open]:opacity-100" />
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-4 p-3">
        {POTENTIALS.map((potential) => (
          <PotentialFragment
            key={potential}
            name={potential}
            control={control}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
}

function PotentialFragment({
  name,
  control,
}: {
  name: PotentialType;
  control: Control<ListFiltersType>;
}) {
  const formattedName = name.toLowerCase().replace(/\s/g, "_");

  const MAX_VALUE = 294;

  const {
    field: { value, onChange },
  } = useController({
    name: `potentials.${name}`,
    control,
  });

  return (
    <Label className="flex h-8 items-center gap-4">
      {
        <Image
          src={`/potential/${formattedName}.webp`}
          alt={name}
          width={32}
          height={32}
          className="object-contain"
        />
      }
      <p className="text-sm font-medium">{name}</p>

      <Input
        prefix={<span className="absolute bottom-2 left-3 font-bold">+</span>}
        onChange={(e) => {
          const newValue = getNumber(e.currentTarget.value);

          onChange(
            newValue == null ? undefined : Math.min(newValue, MAX_VALUE),
          );
        }}
        type="number"
        value={value ? value : "0"}
        defaultValue={0}
        className="h-8 w-16 p-1 pl-4 text-center"
        wrapperClass="ml-auto"
      />
    </Label>
  );
}
