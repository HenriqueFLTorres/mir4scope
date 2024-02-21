"use client";
import { LIST_FILTER_DEFAULT, ListFilterAtom } from "@/atom/ListFilters";
import EXP from "@/components/icon/EXP";
import Power from "@/components/icon/Power";
import Search from "@/components/icon/Search";
import MainFilters from "@/components/MainFilters";
import NFTDisplay from "@/components/NFTDisplay";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useAtom } from "jotai";
import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownWideNarrow,
  Clock1,
  Clock10,
  FilterX,
} from "lucide-react";
import { useState } from "react";

type nftStatName =
  | "HP"
  | "MP"
  | "PHYS ATK"
  | "Spell ATK"
  | "PHYS DEF"
  | "Spell DEF";

export default function Home() {
  const [listFilter, setListFilter] = useAtom(ListFilterAtom);
  const [nftData, setNFTData] = useState<{ totalCount?: number; lists: any[] }>(
    {
      totalCount: undefined,
      lists: [],
    },
  );

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 bg-gradient-to-br from-[#44356A] to-[#272039] p-24">
      <MainFilters />

      <div className="mb-16 flex w-full gap-4">
        <button
          onClick={async () => {
            const response = await fetch("api/dump");
            const data = await response.json();

            console.log(data);
          }}
          className="h-10 w-full gap-2 rounded-lg border-2 border-[#7C71AA] bg-[#44356A] p-2 font-medium text-white"
        >
          <Search className="h-5 w-5" /> Update List
        </button>

        <button
          onClick={() => setListFilter(LIST_FILTER_DEFAULT)}
          className="h-10 shrink-0 gap-2 rounded-lg border-2 border-white/10 bg-white/5 p-2 px-12 font-medium text-white transition-colors hover:border-error-400/20 hover:bg-error-400/10"
        >
          <FilterX className="h-5 w-5" /> Clear Filters
        </button>

        <Select
          onValueChange={(value) =>
            setListFilter((prev) => ({ ...prev, sort: value }))
          }
          defaultValue="latest"
        >
          <SelectTrigger className="w-72">
            <ArrowDownWideNarrow className="h-5 w-5" />
            Sort By
          </SelectTrigger>
          <SelectContent className="w-52" align="end">
            <SelectItem
              className="gap-2"
              Icon={<Clock1 className="h-5 w-5" />}
              value={"latest"}
            >
              Newest
            </SelectItem>
            <SelectItem
              className="gap-2"
              Icon={<Clock10 className="h-5 w-5" />}
              value={"oldest"}
            >
              Oldest
            </SelectItem>
            <SelectItem
              className="gap-2"
              Icon={<ArrowDown01 className="h-5 w-5" />}
              value={"pricehigh"}
            >
              Price Highest
            </SelectItem>
            <SelectItem
              className="gap-2"
              Icon={<ArrowDown10 className="h-5 w-5" />}
              value={"pricelow"}
            >
              Price Lowest
            </SelectItem>
            <SelectItem
              className="gap-2"
              Icon={<EXP className="h-5 w-5" />}
              value={"lvhigh"}
            >
              Level Highest
            </SelectItem>
            <SelectItem
              className="gap-2"
              Icon={<Power className="h-5 w-5" />}
              value={"pshigh"}
            >
              Power Highest
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <NFTDisplay nftData={nftData.lists} />
    </main>
  );
}
