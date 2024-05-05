"use client";

import { ChevronsUpDown } from "lucide-react";

import type { ListFiltersType } from "@/atom/ListFilters";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getNumber } from "@/lib/utils";
import Image from "next/image";
import { useController, type Control } from "react-hook-form";
import { Building } from "./icon/Building";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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
      <PopoverContent
        align="start"
        className="grid h-max max-h-none w-max grid-cols-3 gap-2 p-2"
      >
        {BUILDING_LIST.map((building) => (
          <BuildingFragment key={building} name={building} control={control} />
        ))}
      </PopoverContent>
    </Popover>
  );
}

function BuildingFragment({
  name,
  control,
}: {
  name: BuildingType;
  control: Control<ListFiltersType>;
}) {
  const {
    field: { value, onChange },
  } = useController({
    name: `building.${name}`,
    control,
  });
  const removeValue = () => onChange(undefined);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Label className="relative flex h-20 w-20 flex-col items-center justify-end gap-2 rounded-lg text-sm font-medium last:w-full last-of-type:col-span-3">
            <Image
              src={`/building/${name.toLowerCase().replace(/\s/g, "_")}.png`}
              alt={name}
              width={476}
              height={476}
              className="absolute -z-[1] h-full rounded-lg object-cover"
            />

            <Input
              className="h-8 w-10 bg-gradient-to-b from-black/60 to-black/40 px-1 text-center backdrop-blur-md"
              wrapperClass="mb-1"
              value={value ? value : ""}
              onChange={(e) => {
                const newValue = getNumber(e.currentTarget.value);
                if (newValue === null) return removeValue();

                onChange(newValue);
              }}
            />
          </Label>
        </TooltipTrigger>
        <TooltipContent className="font-bold">{name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
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
];
