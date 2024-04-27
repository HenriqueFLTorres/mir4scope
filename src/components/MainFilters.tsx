"use client";

import type { ListFiltersType } from "@/atom/ListFilters";
import FilterChips from "@/components/FilterChips";
import { SpiritSelector } from "@/components/SpiritSelector";
import EXP from "@/components/icon/EXP";
import Search from "@/components/icon/Search";
import Skill from "@/components/icon/Skill";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectRange } from "@/components/ui/select-range";
import { classIndexToName } from "@/lib/utils";
import { SelectIcon } from "@radix-ui/react-select";
import Image from "next/image";
import {
  Controller,
  type Control,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import { PriceRange } from "./PriceRange";
import Codex from "./icon/Codex";
import Power from "./icon/Power";

const mir4Classes: Mir4Classes[] = [
  "Arbalist",
  "Darkist",
  "Lancer",
  "Sorcerer",
  "Taoist",
  "Warrior",
];

const classToKey: { [key in Mir4Classes]: number } = {
  Arbalist: 4,
  Darkist: 6,
  Lancer: 5,
  Sorcerer: 2,
  Taoist: 3,
  Warrior: 1,
};

function MainFilters({
  register,
  control,
  setValue,
}: {
  register: UseFormRegister<ListFiltersType>;
  control: Control<ListFiltersType>;
  setValue: UseFormSetValue<ListFiltersType>;
}) {
  return (
    <>
      <section className="flex w-full flex-wrap items-center justify-center gap-4">
        <Input
          prefix={<Search className="absolute bottom-2 left-2 h-6 w-6" />}
          placeholder="Search by player name"
          maxLength={12}
          wrapperClass="w-full"
          {...register("search")}
        />

        <Controller
          name="class"
          control={control}
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <Select
              defaultValue={"0"}
              onValueChange={(value) =>
                onChange(Number(value) as ListFiltersType["class"])
              }
              value={String(value)}
              {...fieldProps}
            >
              <SelectTrigger className="w-48">
                {value ? (
                  <Image
                    className="object-contain"
                    width={20}
                    height={20}
                    src={`/icon/${classIndexToName(value).toLowerCase()}.webp`}
                    alt=""
                  />
                ) : (
                  <Skill className="h-5 w-5" />
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
                    key={mir4Class}
                    className="gap-2 capitalize"
                    value={String(classToKey[mir4Class])}
                    Icon={
                      <SelectIcon asChild>
                        <Image
                          className="object-contain"
                          width={20}
                          height={20}
                          src={`/icon/${mir4Class}.webp`}
                          alt=""
                        />
                      </SelectIcon>
                    }
                  >
                    {mir4Class}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <Controller
          name="level"
          control={control}
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <SelectRange
              defaultValue={[90, 130]}
              min={60}
              max={170}
              Icon={<EXP className="h-5 w-5" />}
              value={value}
              onValueChange={onChange}
              {...fieldProps}
              label="Level"
              step={5}
            />
          )}
        />

        <Controller
          name="power"
          control={control}
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <SelectRange
              defaultValue={[1e5, 9e5]}
              min={1e5}
              max={6e5}
              Icon={<Power className="h-5 w-5" />}
              value={value}
              onValueChange={onChange}
              {...fieldProps}
              label="Power"
              step={5000}
              showInput={false}
            />
          )}
        />

        <Controller
          name="codex"
          control={control}
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <SelectRange
              defaultValue={[100, 2000]}
              min={100}
              max={2000}
              Icon={<Codex className="h-5 w-5" />}
              value={value}
              onValueChange={onChange}
              {...fieldProps}
              label="Codex"
              step={10}
            />
          )}
        />

        <Controller
          name="max_price"
          control={control}
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <PriceRange value={value} setValue={onChange} {...fieldProps} />
          )}
        />
      </section>

      <h2 className="mr-auto">Stats Filter</h2>

      {/* <section className="flex w-full flex-wrap items-center gap-4">
        <StatusRange label="PHYS ATK" Icon={<PHYSATK className="h-5 w-5" />} />

        <StatusRange
          label="Spell ATK"
          Icon={<SpellATK className="h-5 w-5" />}
        />

        <StatusRange label="PHYS DEF" Icon={<PHYSDEF className="h-5 w-5" />} />

        <StatusRange
          label="Spell DEF"
          Icon={<SPELLDEF className="h-5 w-5" />}
        />

        <StatusRange label="EVA" Icon={<EVA className="h-5 w-5" />} />

        <StatusRange label="Accuracy" Icon={<Accuracy className="h-5 w-5" />} />
      </section> */}

      <h2 className="mr-auto">Premium Filters</h2>

      <section className="flex w-full flex-wrap items-center gap-4">
        <SpiritSelector control={control} />
        {/* 
        <TrainingSelector />

        <TicketsSelector />

        <SkillsSelector />

        <CraftingMaterialSelector /> */}
      </section>

      <FilterChips />
    </>
  );
}

export default MainFilters;
