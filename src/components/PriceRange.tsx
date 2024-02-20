import { ListFilterAtom } from "@/atom/ListFilters";
import { getNumber } from "@/lib/utils";
import { useAtom } from "jotai";
import millify from "millify";
import Wemix from "./icon/wemix";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const MAX_VALUE = 150000;

const PriceRange = () => {
  const [{ priceRange }, setListFilter] = useAtom(ListFilterAtom);

  const minValueBlur = () =>
    setListFilter((prev) => ({
      ...prev,
      priceRange: [
        Math.min(prev.priceRange[0], prev.priceRange[1] ?? MAX_VALUE),
        prev.priceRange[1],
      ],
    }));

  const maxValueBlur = () =>
    setListFilter((prev) => ({
      ...prev,
      priceRange: [
        prev.priceRange[0],
        Math.min(
          MAX_VALUE,
          Math.max(
            prev.priceRange[0] + 10,
            prev.priceRange[1] || prev.priceRange[0] + 10,
          ),
        ),
      ],
    }));

  const hasValues =
    Number.isInteger(priceRange[0]) && Number.isInteger(priceRange[1]);

  return (
    <Popover
      onOpenChange={() => {
        minValueBlur();
        maxValueBlur();
      }}
    >
      <PopoverTrigger className="w-72">
        <Wemix className="h-5 w-5" />
        Price{" "}
        {hasValues
          ? `(${millify(priceRange[0])} - ${millify(priceRange[1]!)})`
          : "(Any)"}
      </PopoverTrigger>
      <PopoverContent className="flex flex-row items-center gap-2 px-3 py-4">
        <Input
          label="From"
          name="from"
          prefix={<Wemix className="absolute bottom-2 left-2 h-4 w-4" />}
          value={priceRange[0]}
          onChange={(e) => {
            const newValue = getNumber(e.currentTarget.value);
            if (newValue === null) return;

            setListFilter((prev) => ({
              ...prev,
              priceRange: [newValue, prev.priceRange[1]],
            }));
          }}
          onBlur={minValueBlur}
          className="h-max w-full px-2 py-1 pl-8"
        />

        <Input
          label="To"
          name="to"
          prefix={<Wemix className="absolute bottom-2 left-2 h-4 w-4" />}
          value={priceRange[1]}
          onChange={(e) => {
            const newValue = getNumber(e.currentTarget.value);
            if (newValue === null) return;

            setListFilter((prev) => ({
              ...prev,
              priceRange: [prev.priceRange[0], newValue],
            }));
          }}
          onBlur={maxValueBlur}
          className="h-max w-full px-2 py-1 pl-8"
        />
      </PopoverContent>
    </Popover>
  );
};

export { PriceRange };
