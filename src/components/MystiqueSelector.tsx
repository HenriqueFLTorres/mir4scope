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
import Skill from "./icon/Skill";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function MystiqueSelector({
  control,
}: {
  control: Control<ListFiltersType>;
}) {
  return (
    <Popover>
      <PopoverTrigger role="combobox" className="w-72 justify-between" noIcon>
        <Skill className="h-5 w-5" />
        Mystique
        <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60 transition-[opacity] group-data-[state=open]:opacity-100" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="grid h-max max-h-none w-max grid-cols-2 gap-2 p-2"
      >
        {MYSTIQUE_LIST.map((building) => (
          <MystiqueFragment key={building} name={building} control={control} />
        ))}
      </PopoverContent>
    </Popover>
  );
}

function MystiqueFragment({
  name,
  control,
}: {
  name: NFT_MYSTIQUE;
  control: Control<ListFiltersType>;
}) {
  const {
    field: { value, onChange },
  } = useController({
    name: `mystique.${name}`,
    control,
  });
  const removeValue = () => onChange(undefined);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Label className="relative flex h-32 w-32 flex-col border overflow-hidden border-black/20 items-center justify-end gap-2 rounded-lg text-sm font-medium last:w-full last-of-type:col-span-2">
            <Image
              src={`/mystique/${name.toLowerCase().replace(/\s/g, "_")}.webp`}
              alt={name}
              width={512}
              height={512}
              className="absolute -z-[1] h-full rounded-lg object-cover blur-lg"
            />

            <Image
              src={`/mystique/${name.toLowerCase().replace(/\s/g, "_")}.webp`}
              alt={name}
              width={128}
              height={128}
              className="absolute -z-[1] h-full rounded-lg object-contain"
            />

            <Input
              className="h-8 w-10 bg-gradient-to-b from-black/60 to-black/40 px-1 text-center backdrop-blur-md"
              wrapperClass="mb-2"
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

const MYSTIQUE_LIST: NFT_MYSTIQUE[] = [
  "Unicorn Lion Mystique",
  "Vermilion Bird Mystique",
  "Black Tortoise Mystique",
  "White Tiger Mystique",
  "Blue Dragon Mystique",
];
