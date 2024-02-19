"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Skill from "./icon/Skill";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type SkillsType =
  | "Arrow Rain"
  | "Quick Shot"
  | "Painstrike Gale"
  | "Illusion Arrow"
  | "Burst Shell"
  | "Flash Arrow"
  | "Heavenly Bow"
  | "Mind's Eye"
  | "Ice Cage"
  | "Obliterate Shell"
  | "Venom Mist Shell"
  | "Seeking Bolt"
  | "Cloaking";

type SkillsValueType = {
  [key in SkillsType]: number;
};

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
  const [skillsValue, setSkillsValue] = React.useState<SkillsValueType>({
    "Arrow Rain": 0,
    "Quick Shot": 0,
    "Painstrike Gale": 0,
    "Illusion Arrow": 0,
    "Burst Shell": 0,
    "Flash Arrow": 0,
    "Heavenly Bow": 0,
    "Mind's Eye": 0,
    "Ice Cage": 0,
    "Obliterate Shell": 0,
    "Venom Mist Shell": 0,
    "Seeking Bolt": 0,
    Cloaking: 0,
  });

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
        <SkillItem
          skill={"Arrow Rain"}
          skillsValue={skillsValue}
          setSkillsValue={setSkillsValue}
        />

        <div className="grid grid-cols-2 gap-4">
          {SKILL_LIST.map((skill) => {
            if (skill === "Arrow Rain") return <></>;

            return (
              <SkillItem
                key={skill}
                skill={skill}
                skillsValue={skillsValue}
                setSkillsValue={setSkillsValue}
              />
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function SkillItem({
  skill,
  skillsValue,
  setSkillsValue,
}: {
  skill: SkillsType;
  skillsValue: SkillsValueType;
  setSkillsValue: React.Dispatch<React.SetStateAction<SkillsValueType>>;
}) {
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
        value={skillsValue[skill]}
        onChange={(e) => {
          let value = Number(e.target.value);

          if (value < 0 || Number.isNaN(value)) return;
          if (value > MAX_SKILL_LEVEL) value = MAX_SKILL_LEVEL;
          setSkillsValue((prev) => ({ ...prev, [skill]: value }));
        }}
        defaultValue={0}
        className="h-8 w-16 p-1 pl-4 text-center"
        wrapperClass="ml-auto"
      />
    </Label>
  );
}
