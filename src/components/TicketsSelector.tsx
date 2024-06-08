"use client"

import { ChevronsUpDown } from "lucide-react"

import Image from "next/image"
import { type Control, useController } from "react-hook-form"
import MagicSquare from "./icon/MagicSquare"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

import type { ListFiltersType } from "@/atom/ListFilters"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { getNumber } from "@/lib/utils"

const TICKETS = [
  "Raid Ticket",
  "Boss Raid Ticket",
  "Hell Raid Ticket",
  "Magic Square Ticket",
  "Secret Peak Ticket",
  "Wayfarer Travel Pass",
] as const

export function TicketsSelector({
  control,
}: {
  control: Control<ListFiltersType>
}) {
  return (
    <Popover>
      <PopoverTrigger className="w-72 justify-between" role="combobox" noIcon>
        <MagicSquare className="h-5 w-5" />
        Tickets
        <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60 transition-[opacity] group-data-[state=open]:opacity-100" />
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-4 p-3">
        {TICKETS.map((ticket) => (
          <TicketFragment control={control} key={ticket} name={ticket} />
        ))}
      </PopoverContent>
    </Popover>
  )
}

function TicketFragment({
  name,
  control,
}: {
  name: TicketsType
  control: Control<ListFiltersType>
}) {
  const formattedName = name.toLowerCase().replace(/\s/g, "_")

  const {
    field: { value, onChange },
  } = useController({
    name: `tickets.${name}`,
    control,
  })

  return (
    <Label className="flex h-8 items-center gap-4">
      <Image
        alt={name}
        className="object-contain"
        height={32}
        src={`/tickets/${formattedName}.webp`}
        width={32}
      />
      <p className="text-sm font-medium">{name}</p>

      <Input
        className="h-8 w-16 p-1 pl-4 text-center"
        defaultValue={0}
        prefix={<span className="absolute bottom-2 left-3 font-bold">+</span>}
        value={value ? value : "0"}
        wrapperClass="ml-auto"
        onChange={(e) => {
          const newValue = getNumber(e.currentTarget.value)

          onChange(newValue == null ? undefined : newValue)
        }}
      />
    </Label>
  )
}
