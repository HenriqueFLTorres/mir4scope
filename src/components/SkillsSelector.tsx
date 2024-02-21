"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { ListFilterAtom } from "@/atom/ListFilters";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAtom } from "jotai";
import Image from "next/image";
import Skill from "./icon/Skill";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const SKILL_LIST = [
  "Arrow Rain",
  "Quick Shot",
  "Painstrike Gale",
  "Illusion Arrow",
  "Burst Shell",
  "Flash Arrow",
  "Heavenly Bow",
  "Mind's Eye",
  "Ice Cage",
  "Obliterate Shell",
  "Venom Mist Shell",
  "Seeking Bolt",
  "Cloaking",
] as const;

const MAX_SKILL_LEVEL = 10;

export function SkillsSelector() {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        role="combobox"
        aria-expanded={open}
        className="w-72 justify-between"
        noIcon
      >
        <Skill className="h-5 w-5" />
        Skills
        <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60 transition-[opacity] group-data-[state=open]:opacity-100" />
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-4 p-3">
        <SkillItem skill={"Arrow Rain"} />

        <div className="grid grid-cols-2 gap-4">
          {SKILL_LIST.map((skill) => {
            if (skill === "Arrow Rain") return null;

            return <SkillItem key={skill} skill={skill} />;
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function SkillItem({ skill }: { skill: SkillsType }) {
  const [{ skills }, setListFilter] = useAtom(ListFilterAtom);

  const formattedName = skill
    .toLowerCase()
    .replace(/\'/g, "")
    .replace(/\s/g, "_");

  return (
    <Label className="flex h-8 items-center gap-4" key={skill}>
      <Image
        src={`/skills/arbalist/${formattedName}.webp`}
        alt={skill}
        width={32}
        height={32}
        className="object-contain"
      />
      <p className="sr-only">{skill}</p>

      <Input
        prefix={<span className="absolute bottom-2 left-3 font-bold">+</span>}
        value={skills[skill]}
        onChange={(e) => {
          let value = Number(e.target.value);

          if (value < 0 || Number.isNaN(value)) return;
          if (value > MAX_SKILL_LEVEL) value = MAX_SKILL_LEVEL;

          setListFilter((prev) => ({
            ...prev,
            skills: { ...prev.skills, [skill]: value },
          }));
        }}
        defaultValue={0}
        className="h-8 w-16 p-1 pl-4 text-center"
        wrapperClass="ml-auto"
      />
    </Label>
  );
}
