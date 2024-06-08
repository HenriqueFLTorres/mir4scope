import { X } from "lucide-react"
import millify from "millify"
import Wemix from "./icon/Wemix"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { getNumber } from "@/lib/utils"

const PriceRange = ({
  value,
  setValue,
}: {
  value: number | undefined
  setValue: (value: number | undefined) => void
}) => {
  const removeValue = () => setValue(undefined)

  return (
    <Popover>
      <PopoverTrigger className="w-72">
        <Wemix className="h-5 w-5" />
        Price {value ? `(Max: ${millify(value)})` : "(Any)"}
      </PopoverTrigger>
      <PopoverContent className="flex flex-row items-end gap-2 px-3 py-4">
        <Input
          className="h-8 w-full px-2 py-1 pl-8"
          label="Max value"
          name="max value"
          prefix={<Wemix className="absolute bottom-2 left-2 h-4 w-4" />}
          value={value ? value : ""}
          wrapperClass="w-full"
          onChange={(e) => {
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

export { PriceRange }
