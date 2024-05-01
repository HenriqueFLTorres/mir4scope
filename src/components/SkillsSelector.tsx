"use client";

import { ChevronsUpDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

export function SkillsSelector() {
  return (
    <Popover>
      <PopoverTrigger role="combobox" className="w-72 justify-between" noIcon>
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
  const formattedName = skill
    .toLowerCase()
    .replace(/\'/g, "")
    .replace(/\s/g, "_");

  return (
    <Label className="flex h-8 items-center gap-4" key={skill}>
      <Image
        src={`/arbalist/${formattedName}.webp`}
        alt={skill}
        width={32}
        height={32}
        className="object-contain"
      />
      <p className="sr-only">{skill}</p>

      <Input
        prefix={<span className="absolute bottom-2 left-3 font-bold">+</span>}
        value={0}
        defaultValue={0}
        className="h-8 w-16 p-1 pl-4 text-center"
        wrapperClass="ml-auto"
      />
    </Label>
  );
}
