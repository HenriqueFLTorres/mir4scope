"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import MagicSquare from "./icon/MagicSquare";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type TicketsType = "Raid" | "Raid Boss" | "Magic Square" | "Secret Peak";
const tickets = ["Raid", "Raid Boss", "Magic Square", "Secret Peak"] as const;

const MAX_TICKETS = 999;

export function TicketsSelector() {
  const [open, setOpen] = React.useState(false);
  const [ticketsValue, setTicketsValue] = React.useState<{
    [key in TicketsType]: number;
  }>({
    Raid: 0,
    "Raid Boss": 0,
    "Magic Square": 0,
    "Secret Peak": 0,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        role="combobox"
        aria-expanded={open}
        className="w-72 justify-between"
        noIcon
      >
        <MagicSquare className="h-5 w-5" />
        Tickets
        <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60 transition-[opacity] group-data-[state=open]:opacity-100" />
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-4 p-3">
        {tickets.map((ticket) => {
          const formattedName = ticket.toLowerCase().replace(/\s/g, "_");

          return (
            <Label className="flex h-8 items-center gap-4" key={ticket}>
              <Image
                src={`/tickets/${formattedName}.webp`}
                alt={ticket}
                width={32}
                height={32}
                className="object-contain"
              />
              <p className="text-sm font-medium">{ticket}</p>

              <Input
                prefix={
                  <span className="absolute bottom-2 left-3 font-bold">+</span>
                }
                value={ticketsValue[ticket]}
                onChange={(e) => {
                  let value = Number(e.target.value);

                  if (value < 0 || Number.isNaN(value)) return;
                  if (value > MAX_TICKETS) value = MAX_TICKETS;
                  setTicketsValue((prev) => ({ ...prev, [ticket]: value }));
                }}
                defaultValue={0}
                className="h-8 w-16 p-1 pl-4 text-center"
                wrapperClass="ml-auto"
              />
            </Label>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

function SpiritList({
  list,
  value,
  setValue,
}: {
  list: [string, string][];
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return list.map(([spirit, rarity]) => {
    const formattedName = spirit.toLowerCase().replace(/\s/g, "-");
    const isSelected = value.includes(formattedName);

    return (
      <CommandItem
        key={formattedName}
        value={formattedName}
        onSelect={(currentValue) => {
          setValue((prev) =>
            isSelected
              ? prev.filter((spirit) => spirit !== currentValue)
              : [...prev, currentValue],
          );
        }}
        data-filter={isSelected}
        className="flex cursor-pointer items-center justify-center rounded-full border border-transparent p-0 opacity-60 transition-[opacity,filter] aria-selected:bg-transparent data-[filter=true]:opacity-100 data-[filter=true]:drop-shadow-[0_0_8px_rgb(159,143,109)]"
      >
        <Image
          className="object-contain"
          width={56}
          height={56}
          alt={""}
          src={`/bg-${rarity.toLowerCase()}.webp`}
        />
        <Image
          className="absolute object-contain"
          width={48}
          height={48}
          alt={spirit}
          src={`/spirit/${formattedName}.webp`}
        />
      </CommandItem>
    );
  });
}
