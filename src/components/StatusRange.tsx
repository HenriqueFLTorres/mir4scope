import { ListFilterAtom } from "@/atom/ListFilters";
import { cn, getNumber } from "@/lib/utils";
import { useAtom } from "jotai";
import millify from "millify";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export interface StatusRangeProps {
  label: StatType;
  Icon: JSX.Element;
}

const StatusRange = ({ label, Icon }: StatusRangeProps) => {
  const [{ status }, setListFilter] = useAtom(ListFilterAtom);

  const [hasMin, setHasMin] = useState(false);
  const [hasMax, setHasMax] = useState(false);

  const getLabel = () => {
    if (
      hasMin &&
      hasMax &&
      Number.isInteger(status[label][0]) &&
      Number.isInteger(status[label][1])
    )
      return `(${millify(status[label][0]!)} - ${millify(status[label][1]!)})`;
    if (hasMin && Number.isInteger(status[label][0]))
      return `+${millify(status[label][0]!)}`;
    if (hasMax && Number.isInteger(status[label][1]))
      return `< ${millify(status[label][1]!)}`;

    return "(Any)";
  };

  return (
    <Popover>
      <PopoverTrigger
        className={cn("w-72 font-normal", {
          ["border-error-400 from-error-400/20 to-error-400/5 focus:ring-error-400"]:
            Number.isInteger(status[label][0]) &&
            Number.isInteger(status[label][1]) &&
            status[label][0]! > status[label][1]! &&
            hasMin &&
            hasMax,
        })}
      >
        {Icon}
        <span>
          {label} <b>{getLabel()}</b>
        </span>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-center gap-4 px-3 py-4">
        <div className="flex w-full items-end gap-2">
          <Input
            label="Min"
            name="min"
            value={status[label][0]}
            onChange={(e) => {
              const newValue = getNumber(e.currentTarget.value);
              if (newValue === null) return;

              setListFilter((prev) => ({
                ...prev,
                status: {
                  ...prev.status,
                  [label]: [newValue, prev.status[label][1]],
                },
              }));
            }}
            wrapperClass="w-full"
            className="h-max w-full px-2 py-1"
            disabled={!hasMin}
          />

          <Checkbox
            defaultChecked={false}
            checked={hasMin}
            onCheckedChange={(value) =>
              setHasMin(value === "indeterminate" ? false : value)
            }
            className="h-[1.875rem] w-[1.875rem]"
          />
        </div>

        <div className="flex w-full items-end gap-2">
          <Input
            label="Max"
            name="max"
            value={status[label][1]}
            onChange={(e) => {
              const newValue = getNumber(e.currentTarget.value);
              if (newValue === null) return;

              setListFilter((prev) => ({
                ...prev,
                status: {
                  ...prev.status,
                  [label]: [prev.status[label][0], newValue],
                },
              }));
            }}
            wrapperClass="w-full"
            className="h-max w-full px-2 py-1"
            disabled={!hasMax}
          />

          <Checkbox
            defaultChecked={false}
            checked={hasMax}
            onCheckedChange={(value) =>
              setHasMax(value === "indeterminate" ? false : value)
            }
            className="h-[1.875rem] w-[1.875rem]"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { StatusRange };
