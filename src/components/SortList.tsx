"use client";

import { ListFilterAtom, type ListSortType } from "@/atom/ListFilters";
import EXP from "@/components/icon/EXP";
import Power from "@/components/icon/Power";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useAtom } from "jotai";
import { ArrowDown01, ArrowDown10, Clock1 } from "lucide-react";

function SortList() {
  const [{ sort }, setListFilter] = useAtom(ListFilterAtom);

  const SortIcon = getSortingIcon(sort);
  const currentSortLabel = SORTING_OPTIONS.find(
    (option) => option.value === sort,
  );

  return (
    <Select
      onValueChange={(value) =>
        setListFilter((prev) => ({ ...prev, sort: value as ListSortType }))
      }
      defaultValue="latest"
    >
      <SelectTrigger className="w-72">
        <SortIcon className="h-5 w-5" />
        {currentSortLabel?.label ?? "Newest"}
      </SelectTrigger>
      <SelectContent className="w-52" align="end">
        {SORTING_OPTIONS.map(({ label, value }) => {
          const Icon = getSortingIcon(value);

          return (
            <SelectItem
              key={value}
              className="gap-2"
              Icon={<Icon className="h-5 w-5" />}
              value={value}
            >
              {label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default SortList;

const SORTING_OPTIONS: { label: string; value: ListSortType }[] = [
  {
    label: "Newest",
    value: "latest",
  },
  {
    label: "Price Highest",
    value: "pricehigh",
  },
  {
    label: "Price Lowest",
    value: "pricelow",
  },
  {
    label: "Level Highest",
    value: "lvhigh",
  },
  {
    label: "Power Highest",
    value: "pshigh",
  },
];

function getSortingIcon(sort: ListSortType) {
  switch (sort) {
    case "latest":
      return Clock1;
    case "pricehigh":
      return ArrowDown01;
    case "pricelow":
      return ArrowDown10;
    case "lvhigh":
      return EXP;
    case "pshigh":
      return Power;
    default:
      throw new Error(`Unknown sort type: ${sort}`);
  }
}
