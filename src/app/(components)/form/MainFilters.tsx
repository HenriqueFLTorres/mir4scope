"use client"

import { SelectIcon } from "@radix-ui/react-select"
import Image from "next/image"
import {
  type Control,
  Controller,
  type UseFormRegister,
  type UseFormSetFocus,
  type UseFormSetValue,
} from "react-hook-form"
import { BuildingSelector } from "./BuildingSelector"
import { CraftingMaterialSelector } from "./CraftingMaterials"
import { MystiqueSelector } from "./MystiqueSelector"
import { PotentialsSelector } from "./PotentialsSelector"
import { PriceRange, SelectCurrency } from "./PriceRange"
import { ServerSelector } from "./ServerSelector"
import { SkillsSelector } from "./SkillsSelector"
import { StatusRange } from "./StatusRange"
import { TicketsSelector } from "./TicketsSelector"
import { TrainingSelector } from "./TrainingSelector"
import { SpiritSelector } from "@/app/(components)/form/SpiritSelector"
import type { ListFiltersType } from "@/atom/ListFilters"
import {
  Accuracy,
  Codex,
  EVA,
  EXP,
  PHYSATK,
  PHYSDEF,
  Power,
  Search,
  Skill,
  SpellATK,
  SpellDEF,
} from "@/components/other"
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectRange,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"
import { SkillsListByClass } from "@/lib/skillsByClass"
import { classIndexToName } from "@/lib/utils"
import React from "react"

const mir4Classes: Mir4Classes[] = [
  "Arbalist",
  "Darkist",
  "Lancer",
  "Sorcerer",
  "Taoist",
  "Warrior",
]

const classToKey: { [key in Mir4Classes]: number } = {
  Arbalist: 4,
  Darkist: 6,
  Lancer: 5,
  Sorcerer: 2,
  Taoist: 3,
  Warrior: 1,
}

function MainFilters({
  register,
  control,
  setFocus,
  setValue,
}: {
  register: UseFormRegister<ListFiltersType>
  control: Control<ListFiltersType>
  setFocus: UseFormSetFocus<ListFiltersType>
  setValue: UseFormSetValue<ListFiltersType>
}) {
  return (
    <>
      <section className="flex w-full flex-wrap items-center justify-center gap-4">
        <Input
          maxLength={12}
          placeholder="Search by player name"
          prefix={<Search className="absolute bottom-2 left-2 h-6 w-6" />}
          wrapperClass="w-full"
          {...register("search")}
        />

        <Controller
          control={control}
          name="class"
          render={({ field: { value, onChange, disabled, ...fieldProps } }) => (
            <Select
              defaultValue={"0"}
              disabled={disabled}
              value={String(value)}
              onValueChange={(value) => {
                const newClass = Number(value) as ListFiltersType["class"]

                onChange(newClass)
                if (newClass === 0) return setValue("skills", undefined)

                const newSkillsValue: ListFiltersType["skills"] = {}
                for (const skill of SkillsListByClass[newClass]) {
                  const formattedName = skill
                    .toLowerCase()
                    .replace(/'/g, "")
                    .replace(/\s/g, "-")

                  newSkillsValue[formattedName] = 0
                }

                setValue("skills", newSkillsValue)
              }}
            >
              <SelectTrigger className="w-48" {...fieldProps}>
                {value === 0 ? (
                  <Skill className="h-5 w-5" />
                ) : (
                  <Image
                    alt=""
                    className="object-contain"
                    height={20}
                    src={`/icon/${classIndexToName(value).toLowerCase()}.webp`}
                    width={20}
                  />
                )}
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  className="gap-2"
                  Icon={<Skill className="h-5 w-5" />}
                  value={"0"}
                >
                  All Classes
                </SelectItem>
                {mir4Classes.map((mir4Class) => (
                  <SelectItem
                    className="gap-2 capitalize"
                    Icon={
                      <SelectIcon asChild>
                        <Image
                          alt=""
                          className="object-contain"
                          height={20}
                          src={`/icon/${mir4Class}.webp`}
                          width={20}
                        />
                      </SelectIcon>
                    }
                    key={mir4Class}
                    value={String(classToKey[mir4Class])}
                  >
                    {mir4Class}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <Controller
          control={control}
          name="level"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <SelectRange
              defaultValue={[90, 130]}
              Icon={<EXP className="h-5 w-5" />}
              max={170}
              min={60}
              value={value}
              onValueChange={onChange}
              {...fieldProps}
              label="Level"
              step={5}
            />
          )}
        />

        <Controller
          control={control}
          name="power"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <SelectRange
              defaultValue={[1e5, 9e5]}
              Icon={<Power className="h-5 w-5" />}
              max={6e5}
              min={1e5}
              value={value}
              onValueChange={onChange}
              {...fieldProps}
              label="Power"
              showInput={false}
              step={5000}
            />
          )}
        />

        <Controller
          control={control}
          name="codex"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <SelectRange
              defaultValue={[100, 2000]}
              Icon={<Codex className="h-5 w-5" />}
              max={2000}
              min={100}
              value={value}
              onValueChange={onChange}
              {...fieldProps}
              label="Codex"
              step={10}
            />
          )}
        />

        <Controller
          control={control}
          name="currency"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <SelectCurrency
              setCurrency={onChange}
              currency={value}
              {...fieldProps}
            />
          )}
        />

        <Controller
          control={control}
          name="max_price"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <PriceRange
              control={control}
              setValue={onChange}
              value={value}
              {...fieldProps}
            />
          )}
        />

        <ServerSelector control={control} />
      </section>

      <h2 className="mr-auto">Stats Filter</h2>

      <section className="flex w-full flex-wrap items-center gap-4">
        <StatusRange
          control={control}
          Icon={<PHYSATK className="h-5 w-5" />}
          label="PHYS ATK"
        />

        <StatusRange
          control={control}
          Icon={<SpellATK className="h-5 w-5" />}
          label="Spell ATK"
        />

        <StatusRange
          control={control}
          Icon={<PHYSDEF className="h-5 w-5" />}
          label="PHYS DEF"
        />

        <StatusRange
          control={control}
          Icon={<SpellDEF className="h-5 w-5" />}
          label="Spell DEF"
        />

        <StatusRange
          control={control}
          Icon={<EVA className="h-5 w-5" />}
          label="EVA"
        />

        <StatusRange
          control={control}
          Icon={<Accuracy className="h-5 w-5" />}
          label="Accuracy"
        />
      </section>

      <h2 className="mr-auto">Premium Filters</h2>

      <section className="flex w-full flex-wrap items-center gap-4">
        <SpiritSelector control={control} />

        <TrainingSelector control={control} />

        <BuildingSelector control={control} />

        <MystiqueSelector control={control} />

        <TicketsSelector control={control} />

        <SkillsSelector control={control} setFocus={setFocus} />

        <CraftingMaterialSelector control={control} />

        <PotentialsSelector control={control} />
      </section>
    </>
  )
}

export default MainFilters
