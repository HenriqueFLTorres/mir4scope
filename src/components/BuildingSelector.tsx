"use client";

import { ChevronsUpDown } from "lucide-react";

import type { ListFiltersType } from "@/atom/ListFilters";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getNumber } from "@/lib/utils";
import type { ChangeEvent } from "react";
import { type Control, useController } from "react-hook-form";
import { Building } from "./icon/Building";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function BuildingSelector({
  control,
}: {
  control: Control<ListFiltersType>;
}) {
  return (
    <Popover>
      <PopoverTrigger role="combobox" className="w-72 justify-between" noIcon>
        <Building className="h-5 w-5" />
        Building
        <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60 transition-[opacity] group-data-[state=open]:opacity-100" />
      </PopoverTrigger>
      <PopoverContent align="start" className="flex w-96 flex-col gap-4 p-3">
        {BUILDING_LIST.map(({ name, max }) => (
          <BuildingFragment
            key={name}
            name={name}
            max={max}
            control={control}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
}

function BuildingFragment({
  name,
  max,
  control,
}: {
  name: BuildingType;
  max: number;
  control: Control<ListFiltersType>;
}) {
  const {
    field: { value, onChange },
  } = useController({
    name: `building.${name}`,
    control,
  });

  const minValue = value[0];
  const maxValue = value[1];

  const onBlurMin = (e: ChangeEvent<HTMLInputElement>) => {
    const newMinValue = getNumber(e.currentTarget.value);
    if (!newMinValue) return onChange([0, maxValue]);
    if (newMinValue > maxValue) return onChange([maxValue, maxValue]);

    onChange([newMinValue, maxValue]);
  };

  const onBlurMax = (e: ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = getNumber(e.currentTarget.value);
    if (!newMaxValue) return onChange([minValue, max]);
    if (newMaxValue < minValue) return onChange([minValue, minValue]);

    if (newMaxValue > max) return onChange([minValue, max]);

    onChange([minValue, newMaxValue]);
  };

  return (
    <Label className="flex h-8 w-full items-center justify-end gap-2 text-sm font-medium">
      {name}

      <Input
        className="h-8 w-10 px-1 text-center"
        wrapperClass="ml-auto"
        value={minValue}
        onChange={(e) => onChange([getNumber(e.target.value), maxValue])}
        onBlur={onBlurMin}
      />
      <Input
        className="h-8 w-10 px-1 text-center"
        defaultValue={max}
        value={maxValue}
        onChange={(e) => onChange([minValue, getNumber(e.target.value)])}
        onBlur={onBlurMax}
      />
    </Label>
  );
}

const BUILDING_LIST: { name: BuildingType; max: number }[] = [
  { name: "Mine", max: 25 },
  { name: "Forge", max: 25 },
  { name: "Portal", max: 25 },
  { name: "Holy Shrine", max: 25 },
  { name: "Millennial Tree", max: 25 },
  { name: "Tower of Victory", max: 25 },
  { name: "Training Sanctum", max: 25 },
  { name: "Tower of Conquest", max: 25 },
  { name: "Sanctuary of Hydra", max: 25 },
  { name: "Tower of Quintessence", max: 25 },
];
