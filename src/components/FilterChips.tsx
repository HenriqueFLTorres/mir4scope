import {
  LIST_FILTER_DEFAULT,
  ListFilterAtom,
  ListFiltersType,
} from "@/atom/ListFilters";
import { classIndexToName, cn, getStatIcon } from "@/lib/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import { useAtom } from "jotai";
import { X } from "lucide-react";
import millify from "millify";
import Image from "next/image";
import { SPIRIT_LIST } from "./SpiritSelector";
import Codex from "./icon/Codex";
import EXP from "./icon/EXP";
import Power from "./icon/Power";
import Search from "./icon/Search";
import Skill from "./icon/Skill";
import Spirit from "./icon/Spirit";
import Wemix from "./icon/wemix";
import { Label } from "./ui/label";

function FilterChip({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>) {
  return (
    <Label
      className={cn(
        "flex h-10 cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 px-3 pr-2 text-sm font-medium text-white drop-shadow-md transition-colors hover:border-error-400/30 hover:bg-error-400/10",
        className,
      )}
      {...props}
    >
      {children}
      <button className="rounded p-0.5">
        <X className="h-4 w-4" />
      </button>
    </Label>
  );
}

const isRangeEqual = (
  value1: (number | undefined)[],
  value2: (number | undefined)[],
) => {
  if (value1.length !== value2.length) return false;

  for (let i = 0; i < value1.length; i++) {
    if (value1[i] !== value2[i]) return false;
  }

  return true;
};

function StatusChips() {
  const [{ status }, setListFilter] = useAtom(ListFilterAtom);

  return Object.entries(status).map(([stat, value], index) => {
    const statusName = stat as StatType;

    if (
      isRangeEqual(
        status[statusName],
        LIST_FILTER_DEFAULT["status"][statusName],
      )
    )
      return <></>;

    const StatIcon = getStatIcon(statusName);
    let label = "";

    if (Number.isInteger(value[0]) && Number.isInteger(value[1]))
      label = `(${millify(value[0]!)} - ${millify(value[1]!)})`;
    else if (Number.isInteger(value[0])) label = `+${millify(value[0]!)}`;
    else if (Number.isInteger(value[1])) label = `< ${millify(value[1]!)}`;

    return (
      <FilterChip
        key={`${stat}-${index}`}
        onClick={() =>
          setListFilter((prev) => ({
            ...prev,
            status: {
              ...prev.status,
              [statusName]: LIST_FILTER_DEFAULT["status"][statusName],
            },
          }))
        }
      >
        <StatIcon className="h-5 w-5" /> {label}
      </FilterChip>
    );
  });
}

function SpiritChips() {
  const [{ spirits }, setListFilter] = useAtom(ListFilterAtom);

  if (spirits.length <= 0) return <></>;

  return (
    <FilterChip
      onClick={() =>
        setListFilter((prev) => ({
          ...prev,
          spirits: [],
        }))
      }
    >
      <Spirit className="h-5 w-5" />

      <div className="flex items-center gap-1">
        {spirits.slice(0, 3).map((spirit) => {
          const rarity = SPIRIT_LIST[spirit] as "Legendary" | "Epic";
          const formattedName = spirit.toLowerCase().replace(/\s/g, "-");

          return (
            <div
              className="flex cursor-pointer items-center justify-center rounded-full p-0"
              key={spirit}
            >
              <Image
                className="object-contain"
                width={28}
                height={28}
                alt={""}
                src={`/bg-${rarity.toLowerCase()}.webp`}
              />
              <Image
                className="absolute object-contain"
                width={24}
                height={24}
                alt={spirit}
                src={`/spirit/${formattedName}.webp`}
              />
            </div>
          );
        })}
      </div>

      {spirits.length > 3 && `+${spirits.length - 3}`}
    </FilterChip>
  );
}

const FilterChips = () => {
  const [
    { search, class: mir4Class, level, power, codex, priceRange },
    setListFilter,
  ] = useAtom(ListFilterAtom);

  function handleClear(key: keyof ListFiltersType) {
    setListFilter((prev) => ({ ...prev, [key]: LIST_FILTER_DEFAULT[key] }));
  }

  return (
    <section className="flex flex-wrap gap-4">
      {!!search && (
        <FilterChip onClick={() => handleClear("search")}>
          <Search className="h-5 w-5" /> {search}
        </FilterChip>
      )}

      {mir4Class !== 0 && (
        <FilterChip onClick={() => handleClear("class")}>
          <Skill className="h-5 w-5" /> {classIndexToName(mir4Class)}
        </FilterChip>
      )}

      {!isRangeEqual(level, LIST_FILTER_DEFAULT["level"]) && (
        <FilterChip onClick={() => handleClear("level")}>
          <EXP className="h-5 w-5" /> {level[0]} - {level[1]}
        </FilterChip>
      )}

      {!isRangeEqual(power, LIST_FILTER_DEFAULT["power"]) && (
        <FilterChip onClick={() => handleClear("power")}>
          <Power className="h-5 w-5" /> {millify(power[0])} -{" "}
          {millify(power[1])}
        </FilterChip>
      )}

      {!isRangeEqual(codex, LIST_FILTER_DEFAULT["codex"]) && (
        <FilterChip onClick={() => handleClear("codex")}>
          <Codex className="h-5 w-5" /> {millify(codex[0])} -{" "}
          {millify(codex[1])}
        </FilterChip>
      )}

      {!isRangeEqual(priceRange, LIST_FILTER_DEFAULT["priceRange"]) && (
        <FilterChip onClick={() => handleClear("priceRange")}>
          <Wemix className="h-5 w-5" /> {priceRange[0]} - {priceRange[1]}
        </FilterChip>
      )}

      <StatusChips />

      <SpiritChips />
    </section>
  );
};

export default FilterChips;
