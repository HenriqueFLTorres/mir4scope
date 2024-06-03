"use client";

import { ChevronsUpDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import MagicSquare from "./icon/MagicSquare";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import type { ListFiltersType } from "@/atom/ListFilters";
import { getNumber } from "@/lib/utils";
import { type Control, useController } from "react-hook-form";

const TICKETS = [
  "Raid Ticket",
  "Boss Raid Ticket",
  "Hell Raid Ticket",
  "Magic Square Ticket",
  "Secret Peak Ticket",
  "Wayfarer Travel Pass",
] as const;

export function TicketsSelector({
  control,
}: { control: Control<ListFiltersType> }) {
  return (
    <Popover>
      <PopoverTrigger role="combobox" className="w-72 justify-between" noIcon>
        <MagicSquare className="h-5 w-5" />
        Tickets
        <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60 transition-[opacity] group-data-[state=open]:opacity-100" />
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-4 p-3">
        {TICKETS.map((ticket) => (
          <TicketFragment key={ticket} name={ticket} control={control} />
        ))}
      </PopoverContent>
    </Popover>
  );
}

function TicketFragment({
  name,
  control,
}: { name: TicketsType; control: Control<ListFiltersType> }) {
  const formattedName = name.toLowerCase().replace(/\s/g, "_");

  const {
    field: { value, onChange },
  } = useController({
    name: `tickets.${name}`,
    control,
  });

  return (
    <Label className="flex h-8 items-center gap-4">
      <Image
        src={`/tickets/${formattedName}.webp`}
        alt={name}
        width={32}
        height={32}
        className="object-contain"
      />
      <p className="text-sm font-medium">{name}</p>

      <Input
        prefix={<span className="absolute bottom-2 left-3 font-bold">+</span>}
        onChange={(e) => {
          const newValue = getNumber(e.currentTarget.value);

          onChange(newValue == null ? undefined : newValue);
        }}
        value={value ? value : "0"}
        defaultValue={0}
        className="h-8 w-16 p-1 pl-4 text-center"
        wrapperClass="ml-auto"
      />
    </Label>
  );
}
