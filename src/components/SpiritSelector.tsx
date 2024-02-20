"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { ListFilterAtom } from "@/atom/ListFilters";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";
import Spirit from "./icon/Spirit";

type spiritList = Partial<{ [key in SpiritsType]: "Legendary" | "Epic" }>;

export const SPIRIT_LIST: spiritList = {
  "Alluring Spirit Cat Lulu": "Legendary",
  "Bloodtip Drago": "Legendary",
  "Butterfly Fairy Dreamfly": "Legendary",
  "Dark Crown Prince Wooska": "Legendary",
  "Dark Stallion Grifforse": "Legendary",
  "Eighthorns Revenant Destructive Emperor": "Legendary",
  "Fairy King Pepo": "Legendary",
  "Fire Hawk Goldking": "Legendary",
  "Firelord Balrokk": "Legendary",
  "Ghost Knight Styx": "Legendary",
  "Grand GEN Khalion": "Legendary",
  "Hell Lord Inferno": "Legendary",
  "Luminous Empress Candela": "Legendary",
  "Luminous Setra": "Legendary",
  "North Sea Demon King Sumacheon": "Legendary",
  "Red Eyes Lucy": "Legendary",
  "Resurrector Darknyan": "Legendary",
  "Small White Dragon Chunryu": "Legendary",
  "Tri-head Draconis": "Legendary",
  "Wind Summoner Galesoul": "Legendary",
  // Epic
  "Absolute Beauty Whaley": "Epic",
  "Assassin Nyanja": "Epic",
  "Blue Baron Mantata": "Epic",
  "Brutal Lionheart Koiga": "Epic",
  "Dark Assassin Zakhan": "Epic",
  "Dark Cloud Dragon Poipoi": "Epic",
  "Dark Ice Demon Nerr": "Epic",
  "Desert Sage Woosa": "Epic",
  "Fire Devil Flamehorn": "Epic",
  "Flame Hellborn Biyoho": "Epic",
  "Gem Mania Shaoshao": "Epic",
  "Glowing Gem Sparkler": "Epic",
  "Golden Bird Suparna": "Epic",
  "Jade Butterfly Visana": "Epic",
  "Leocrat Khun": "Epic",
  "Lucky Cat Luckster": "Epic",
  "Radiance Dragon Mir": "Epic",
  "Redhorn Komet": "Epic",
  "Soul Harvester Reaper": "Epic",
  "Spring Messenger Yobi": "Epic",
  "Thunder Beast Baratan": "Epic",
  "Verdant Watcher Gargas": "Epic",
  "White Peacock Crystalglass": "Epic",
};

export function SpiritSelector() {
  const [open, setOpen] = React.useState(false);
  const { spirits } = useAtomValue(ListFilterAtom);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        role="combobox"
        aria-expanded={open}
        className="w-72 justify-between"
        noIcon
      >
        <Spirit className="h-5 w-5" />
        Spirits ({spirits ? `${spirits.length} selected` : "Any"})
        <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60 transition-[opacity] group-data-[state=open]:opacity-100" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-96">
        <Command>
          <CommandInput placeholder="Search by spirit name..." />
          <CommandEmpty>No spirit found.</CommandEmpty>
          <div className="small-scroll relative flex max-h-80 flex-col overflow-y-auto">
            <CommandGroup
              heading="Legendary"
              className="flex shrink-0 flex-col gap-2 [&>div]:flex [&>div]:w-full [&>div]:flex-wrap [&>div]:gap-2"
            >
              <SpiritList
                list={
                  Object.entries(SPIRIT_LIST).filter(
                    ([, rarity]) => rarity !== "Epic",
                  ) as [SpiritsType, "Legendary"][]
                }
              />
            </CommandGroup>
            <CommandGroup
              heading="Epic"
              className="flex shrink-0 flex-col gap-2 [&>div]:flex [&>div]:w-full [&>div]:flex-wrap [&>div]:gap-2"
            >
              <SpiritList
                list={
                  Object.entries(SPIRIT_LIST).filter(
                    ([, rarity]) => rarity !== "Legendary",
                  ) as [SpiritsType, "Epic"][]
                }
              />
            </CommandGroup>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function SpiritList({ list }: { list: [SpiritsType, "Legendary" | "Epic"][] }) {
  const [{ spirits }, setListFilter] = useAtom(ListFilterAtom);

  return list.map(([spirit, rarity]) => {
    const formattedName = spirit.toLowerCase().replace(/\s/g, "-");
    const isSelected = spirits.includes(spirit);

    return (
      <CommandItem
        key={formattedName}
        value={spirit}
        onSelect={() => {
          setListFilter((prev) => ({
            ...prev,
            spirits: isSelected
              ? prev.spirits.filter((curSpirit) => curSpirit !== spirit)
              : [...prev.spirits, spirit as SpiritsType],
          }));
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
