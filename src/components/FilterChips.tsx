import {
  LIST_FILTER_DEFAULT,
  ListFilterAtom,
  type ListFiltersType,
} from "@/atom/ListFilters";
import { SPIRIT_LIST } from "@/components/SpiritSelector";
import Codex from "@/components/icon/Codex";
import EXP from "@/components/icon/EXP";
import Power from "@/components/icon/Power";
import Search from "@/components/icon/Search";
import Skill from "@/components/icon/Skill";
import Spirit from "@/components/icon/Spirit";
import { Label } from "@/components/ui/label";
import { classIndexToName, cn } from "@/lib/utils";
import type * as LabelPrimitive from "@radix-ui/react-label";
import { useAtom } from "jotai";
import { X } from "lucide-react";
import millify from "millify";
import Image from "next/image";

function FilterChip({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>) {
  return (
    <Label
      className={cn(
        "flex h-10 cursor-pointer items-center gap-2 rounded-full border border-black/20 bg-black/10 p-1 px-3 pr-2 text-sm font-medium text-white drop-shadow-md transition-colors focus-within:border-error-400/30 focus-within:bg-error-400/10 focus-within:ring-2 focus-within:ring-error-400 hover:border-error-400/30 hover:bg-error-400/10",
        className,
      )}
      {...props}
    >
      {children}
      <button type="button" className="rounded p-0.5 outline-none">
        <X className="h-4 w-4" />
      </button>
    </Label>
  );
}

export const isRangeDifferent = (
  value1: (number | undefined)[],
  value2: (number | undefined)[],
) => {
  if (value1.length !== value2.length) return true;

  for (let i = 0; i < value1.length; i++) {
    if (value1[i] !== value2[i]) return true;
  }

  return false;
};

// function StatusChips() {
//   const [{ status }, setListFilter] = useAtom(ListFilterAtom);

//   return Object.entries(status).map(([stat, value], index) => {
//     const statusName = stat as NFT_STATS_ENUM;

//     if (
//       isRangeEqual(
//         status[statusName] as [number | undefined, number | undefined],
//         LIST_FILTER_DEFAULT.status[statusName] as [
//           number | undefined,
//           number | undefined,
//         ],
//       )
//     )
//       return null;

//     const StatIcon = getStatIcon(statusName);
//     let label = "";

//     if (Number.isInteger(value[0]) && Number.isInteger(value[1]))
//       label = `(${millify(value[0] ?? 0)} - ${millify(value[1] ?? 0)})`;
//     else if (Number.isInteger(value[0])) label = `+${millify(value[0] ?? 0)}`;
//     else if (Number.isInteger(value[1])) label = `< ${millify(value[1] ?? 0)}`;

//     return (
//       <FilterChip
//         key={`${stat}-${value}`}
//         onClick={() =>
//           setListFilter((prev) => ({
//             ...prev,
//             status: {
//               ...prev.status,
//               [statusName]: LIST_FILTER_DEFAULT.status[statusName],
//             },
//           }))
//         }
//       >
//         <StatIcon className="h-5 w-5" /> {label}
//       </FilterChip>
//     );
//   });
// }

function SpiritChips() {
  return <></>;

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
  const [{ search, class: mir4Class, level, power, codex }, setListFilter] =
    useAtom(ListFilterAtom);

  function handleClear(key: keyof ListFiltersType) {
    setListFilter((prev) => ({ ...prev, [key]: LIST_FILTER_DEFAULT[key] }));
  }

  return (
    <section className="flex min-h-10  flex-wrap gap-4">
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

      {isRangeDifferent(level, LIST_FILTER_DEFAULT.level) && (
        <FilterChip onClick={() => handleClear("level")}>
          <EXP className="h-5 w-5" /> {level[0] ?? 60} - {level[1] ?? 170}
        </FilterChip>
      )}

      {isRangeDifferent(power, LIST_FILTER_DEFAULT.power) && (
        <FilterChip onClick={() => handleClear("power")}>
          <Power className="h-5 w-5" /> {millify(power[0])} -{" "}
          {millify(power[1])}
        </FilterChip>
      )}

      {isRangeDifferent(codex, LIST_FILTER_DEFAULT.codex) && (
        <FilterChip onClick={() => handleClear("codex")}>
          <Codex className="h-5 w-5" /> {millify(codex[0])} -{" "}
          {millify(codex[1])}
        </FilterChip>
      )}

      {/* {!isRangeEqual(priceRange, LIST_FILTER_DEFAULT.priceRange) && (
        <FilterChip onClick={() => handleClear("priceRange")}>
          <Wemix className="h-5 w-5" /> {priceRange[0]} - {priceRange[1]}
        </FilterChip>
      )} */}

      {/* <StatusChips /> */}

      <SpiritChips />
    </section>
  );
};

export default FilterChips;
