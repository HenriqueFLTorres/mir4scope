"use client"

import { ArrowDown01, ArrowDown10, Clock1 } from "lucide-react"
import { type Control, Controller } from "react-hook-form"
import type { ListFiltersType, ListSortType } from "@/atom/ListFilters"
import EXP from "@/components/icon/EXP"
import Power from "@/components/icon/Power"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"

function SortList({ control }: { control: Control<ListFiltersType> }) {
  return (
    <Controller
      control={control}
      name="sort"
      render={({ field: { value, onChange, ...fieldProps } }) => {
        const SortIcon = getSortingIcon(value)
        const selectedOption = SORTING_OPTIONS.find(
          (opt) => opt.value === value
        )

        return (
          <Select
            defaultValue="latest"
            value={value}
            onValueChange={onChange}
            {...fieldProps}
          >
            <SelectTrigger className="w-72">
              <SortIcon className="h-5 w-5" />
              {selectedOption?.label ?? "Newest"}
            </SelectTrigger>
            <SelectContent align="end" className="w-52">
              {SORTING_OPTIONS.map(({ label, value }) => {
                const Icon = getSortingIcon(value)

                return (
                  <SelectItem
                    className="gap-2"
                    Icon={<Icon className="h-5 w-5" />}
                    key={value}
                    value={value}
                  >
                    {label}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        )
      }}
    />
  )
}

export default SortList

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
]

function getSortingIcon(sort: ListSortType) {
  switch (sort) {
    case "latest":
      return Clock1
    case "pricehigh":
      return ArrowDown01
    case "pricelow":
      return ArrowDown10
    case "lvhigh":
      return EXP
    case "pshigh":
      return Power
    default:
      throw new Error(`Unknown sort type: ${sort}`)
  }
}
