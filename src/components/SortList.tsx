"use client";

import { ListFilterAtom } from "@/atom/ListFilters";
import EXP from "@/components/icon/EXP";
import Power from "@/components/icon/Power";
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
} from "lucide-react";

function SortList() {
  const [listFilter, setListFilter] = useAtom(ListFilterAtom);

  return (
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
  );
}

export default SortList;
