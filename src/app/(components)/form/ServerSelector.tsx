"use client"

import type { ListFiltersType } from "@/atom/ListFilters"
import { ALL_MIR4_SERVERS } from "@/lib/constants"
import { Globe, Trash2 } from "lucide-react"
import { useController, type Control } from "react-hook-form"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../../components/ui/elements/dropdown-menu"

export function ServerSelector({
  control,
}: {
  control: Control<ListFiltersType>
}) {
  const {
    field: { value: worldName, onChange },
  } = useController({
    name: "world_name",
    control,
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-10 min-w-52 select-none items-center justify-start gap-3 rounded-md border border-black/20 bg-gradient-to-b from-black/10 to-black/0 px-3 py-2 text-sm font-medium text-white transition-[box-shadow] focus:outline-none focus:ring-2 focus:ring-white">
        <Globe className="h-6 w-6" /> Server{" "}
        {worldName == null ? "" : `(${worldName})`}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Asia</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ServerList control={control} serverList={ALL_MIR4_SERVERS.Asia} />

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Middle East</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ServerList
            control={control}
            serverList={ALL_MIR4_SERVERS["Middle East"]}
          />

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Europe</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ServerList control={control} serverList={ALL_MIR4_SERVERS.Europe} />

          <DropdownMenuSeparator />
          <DropdownMenuLabel>South America</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ServerList
            control={control}
            serverList={ALL_MIR4_SERVERS["South America"]}
          />

          <DropdownMenuSeparator />
          <DropdownMenuLabel>North America</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ServerList
            control={control}
            serverList={ALL_MIR4_SERVERS["North America"]}
          />
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="justify-center gap-2 text-base font-bold hover:bg-error-400/10 focus-visible:bg-error-400/10 focus-visible:outline-none"
            onSelect={() => onChange(undefined)}
          >
            <Trash2 size={16} /> Clear Value
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ServerList({
  serverList,
  control,
}: {
  serverList: { [key in string]: string[] }
  control: Control<ListFiltersType>
}) {
  const {
    field: { value, onChange },
  } = useController({
    name: "world_name",
    control,
  })

  return Object.entries(serverList).map(([cluster, serverList]) => (
    <DropdownMenuSub key={cluster}>
      <DropdownMenuSubTrigger>{cluster}</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {serverList.map((serverName) => (
            <DropdownMenuItem
              key={serverName}
              onSelect={() =>
                onChange(value === serverName ? undefined : serverName)
              }
            >
              {serverName}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  ))
}
