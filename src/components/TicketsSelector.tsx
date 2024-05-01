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

const tickets = ["Raid", "Raid Boss", "Magic Square", "Secret Peak"] as const;

export function TicketsSelector() {
  return (
    <Popover>
      <PopoverTrigger role="combobox" className="w-72 justify-between" noIcon>
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
                value={0}
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
