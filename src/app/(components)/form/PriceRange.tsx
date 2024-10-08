import type { ListFiltersType } from "@/atom/ListFilters"
import { Wemix } from "@/components/other"
import { Input } from "@/components/ui"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/elements/select"
import { getNumber } from "@/lib/utils"
import { X } from "lucide-react"
import millify from "millify"
import { type Control, useController, useWatch } from "react-hook-form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/elements/popover"

const CURRENCIES = ["WEMIX", "USD", "BRL"] as const

const PriceRange = ({
  value,
  setValue,

  control,
}: {
  value: number | undefined
  setValue: (value: number | undefined) => void
  control: Control<ListFiltersType>
}) => {
  const removeValue = () => setValue(undefined)

  return (
    <Popover>
      <PopoverTrigger className="w-72">
        <Wemix className="h-5 w-5" />
        Price{" "}
        {typeof value === "number" && value > 0
          ? `(Max: ${millify(value)})`
          : "(Any)"}
      </PopoverTrigger>
      <PopoverContent className="flex flex-row items-end gap-2 px-3 py-4">
        <Input
          className="h-8 w-full px-2 py-1 pl-8"
          label="Max value"
          name="max value"
          prefix={<Wemix className="absolute bottom-2 left-2 h-4 w-4" />}
          value={typeof value === "number" && value > 0 ? value : ""}
          wrapperClass="w-full"
          onChange={async (e) => {
            const newValue = getNumber(e.currentTarget.value)
            if (newValue === null) return removeValue()

            setValue(newValue)
          }}
        />

        <button
          className="h-8 w-8 shrink-0 rounded border border-black/20 bg-black/10 hover:bg-black/20"
          type="button"
          onClick={removeValue}
        >
          <X className="h-5 w-5" />
        </button>
      </PopoverContent>
    </Popover>
  )
}

const SelectCurrency = ({
  currency,
  setCurrency,
}: {
  currency: string | undefined
  setCurrency: (value: string | undefined) => void
}) => {
  return (
    <Select onValueChange={setCurrency}>
      <SelectTrigger className="w-[180px] text-white">
        <SelectValue placeholder="Select a currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Currencies</SelectLabel>
          {CURRENCIES.map((currency) => (
            <SelectItem
              value={currency}
              key={currency}
              Icon={<Wemix className="size-4" />}
              className="gap-2"
            >
              {currency}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export { PriceRange, SelectCurrency }
