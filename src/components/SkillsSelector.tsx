"use client";

import { ChevronsUpDown } from "lucide-react";

import type { ListFiltersType } from "@/atom/ListFilters";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SPECIAL_ABILITIES_NAMES } from "@/lib/contants";
import { SkillsListByClass } from "@/lib/skillsByClass";
import { getNumber } from "@/lib/utils";
import Image from "next/image";
import {
  useController,
  useWatch,
  type Control,
  type UseFormSetFocus,
} from "react-hook-form";
import Skill from "./icon/Skill";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function SkillsSelector({
  control,
  setFocus,
}: {
  control: Control<ListFiltersType>;
  setFocus: UseFormSetFocus<ListFiltersType>;
}) {
  const mir4Class = useWatch({ control, name: "class" });

  return (
    <Popover>
      <PopoverTrigger role="combobox" className="w-72 justify-between" noIcon>
        <Skill className="h-5 w-5" />
        Skills
        <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60 transition-[opacity] group-data-[state=open]:opacity-100" />
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-4 p-3">
        {mir4Class === 0 ? (
          <button
            type="button"
            onClick={() => setFocus("class")}
            className="rounded border border-black/20 bg-black/10 p-2 hover:bg-black/20"
          >
            Select a class first
          </button>
        ) : (
          <SkillContent mir4Class={mir4Class} control={control} />
        )}
      </PopoverContent>
    </Popover>
  );
}

function SkillContent({
  mir4Class,
  control,
}: {
  control: Control<ListFiltersType>;
  mir4Class: 1 | 2 | 3 | 4 | 5 | 6;
}) {
  const skillsList = SkillsListByClass[mir4Class];
  const specialAbility = skillsList.filter((skill) =>
    SPECIAL_ABILITIES_NAMES.includes(skill),
  );

  return (
    <>
      <SkillItem skill={specialAbility[0]} control={control} />

      <div className="grid grid-cols-2 gap-4">
        {skillsList.map((skill) => {
          if (skill === specialAbility[0]) return null;

          return <SkillItem key={skill} skill={skill} control={control} />;
        })}
      </div>
    </>
  );
}

function SkillItem({
  skill,
  control,
}: {
  skill: NFT_SKILLS_ENUM;
  control: Control<ListFiltersType>;
}) {
  const formattedName = skill
    .toLowerCase()
    .replace(/\'/g, "")
    .replace(/\s/g, "-");

  const {
    field: { onChange, value, ...fieldProps },
  } = useController({
    name: `skills.${formattedName}`,
    control,
  });

  return (
    <Label className="flex h-8 items-center gap-4" key={skill}>
      <Image
        src={`/skills/${formattedName}.webp`}
        alt={skill}
        width={32}
        height={32}
        className="object-contain"
      />
      <p className="sr-only">{skill}</p>

      <Input
        prefix={<span className="absolute bottom-2 left-3 font-bold">+</span>}
        onChange={(e) => {
          const newValue = getNumber(e.target.value);

          if (newValue === null) return;

          onChange(newValue);
        }}
        className="h-8 w-16 p-1 pl-4 text-center"
        wrapperClass="ml-auto"
        placeholder="0"
        value={value ? value : ""}
        {...fieldProps}
      />
    </Label>
  );
}
