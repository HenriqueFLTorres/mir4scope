"use client"

import { ChevronsUpDown } from "lucide-react"

import Image from "next/image"
import {
  type Control,
  type UseFormSetFocus,
  useController,
  useWatch,
} from "react-hook-form"
import Skill from "./icon/Skill"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import type { ListFiltersType } from "@/atom/ListFilters"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SPECIAL_ABILITIES_NAMES } from "@/lib/contants"
import { SkillsListByClass } from "@/lib/skillsByClass"
import { getNumber } from "@/lib/utils"

export function SkillsSelector({
  control,
  setFocus,
}: {
  control: Control<ListFiltersType>
  setFocus: UseFormSetFocus<ListFiltersType>
}) {
  const mir4Class = useWatch({ control, name: "class" })

  return (
    <Popover>
      <PopoverTrigger className="w-72 justify-between" role="combobox" noIcon>
        <Skill className="h-5 w-5" />
        Skills
        <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60 transition-[opacity] group-data-[state=open]:opacity-100" />
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-4 p-3">
        {mir4Class === 0 ? (
          <button
            className="rounded border border-black/20 bg-black/10 p-2 hover:bg-black/20"
            type="button"
            onClick={() => setFocus("class")}
          >
            Select a class first
          </button>
        ) : (
          <SkillContent control={control} mir4Class={mir4Class} />
        )}
      </PopoverContent>
    </Popover>
  )
}

function SkillContent({
  mir4Class,
  control,
}: {
  control: Control<ListFiltersType>
  mir4Class: 1 | 2 | 3 | 4 | 5 | 6
}) {
  const skillsList = SkillsListByClass[mir4Class]
  const specialAbility = skillsList.filter((skill) =>
    SPECIAL_ABILITIES_NAMES.includes(skill)
  )

  return (
    <>
      <SkillItem control={control} skill={specialAbility[0]} />

      <div className="grid grid-cols-2 gap-4">
        {skillsList.map((skill) => {
          if (skill === specialAbility[0]) return null

          return <SkillItem control={control} key={skill} skill={skill} />
        })}
      </div>
    </>
  )
}

function SkillItem({
  skill,
  control,
}: {
  skill: NFT_SKILLS_ENUM
  control: Control<ListFiltersType>
}) {
  const formattedName = skill
    .toLowerCase()
    .replace(/\'/g, "")
    .replace(/\s/g, "-")

  const {
    field: { onChange, value, ...fieldProps },
  } = useController({
    name: `skills.${formattedName}`,
    control,
  })

  return (
    <Label className="flex h-8 items-center gap-4" key={skill}>
      <Image
        alt={skill}
        className="object-contain"
        height={32}
        src={`/skills/${formattedName}.webp`}
        width={32}
      />
      <p className="sr-only">{skill}</p>

      <Input
        className="h-8 w-16 p-1 pl-4 text-center"
        placeholder="0"
        prefix={<span className="absolute bottom-2 left-3 font-bold">+</span>}
        value={value ? value : ""}
        wrapperClass="ml-auto"
        onChange={(e) => {
          const newValue = getNumber(e.target.value)

          if (newValue === null) return

          onChange(newValue)
        }}
        {...fieldProps}
      />
    </Label>
  )
}
