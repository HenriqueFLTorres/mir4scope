"use client";
import Accuracy from "@/components/icon/Accuracy";
import Codex from "@/components/icon/Codex";
import EVA from "@/components/icon/EVA";
import EXP from "@/components/icon/EXP";
import PHYSATK from "@/components/icon/PHYSATK";
import PHYSDEF from "@/components/icon/PHYSDEF";
import Power from "@/components/icon/Power";
import Search from "@/components/icon/Search";
import Skill from "@/components/icon/Skill";
import SpellATK from "@/components/icon/SpellATK";
import SPELLDEF from "@/components/icon/SPELLDEF";
import { PriceRange } from "@/components/PriceRange";
import { SkillsSelector } from '@/components/SkillsSelector';
import { SpiritSelector } from "@/components/SpiritSelector";
import { StatusRange } from "@/components/StatusRange";
import { TicketsSelector } from "@/components/TicketsSelector";
import { TrainingSelector } from "@/components/TrainingSelector";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectRange } from "@/components/ui/select-range";
import { SelectIcon } from "@radix-ui/react-select";
import Image from "next/image";
import { useState } from "react";

type Mir4Classes =
  | "Warrior"
  | "Sorcerer"
  | "Taoist"
  | "Arbalist"
  | "Lancer"
  | "Darkist";

type Filter = {
  class: "any" | Mir4Classes;
};

const mir4Classes: Mir4Classes[] = [
  "Arbalist",
  "Darkist",
  "Lancer",
  "Sorcerer",
  "Taoist",
  "Warrior",
];

export default function Home() {
  const [filter, setFilter] = useState<Filter>({ class: "any" });

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-[#44356A] to-[#272039] p-24">
      <section className="flex w-full flex-wrap items-center gap-4">
        <Input
          prefix={<Search className="absolute bottom-2 left-2 h-6 w-6" />}
          placeholder="Search by player name"
          spellCheck={false}
        />

        <Select
          defaultValue="any"
          onValueChange={(value) =>
            setFilter((prev) => ({ ...prev, class: value as Mir4Classes }))
          }
          value={filter.class}
        >
          <SelectTrigger className="w-48">
            {filter.class === "any" ? (
              <Skill className="h-5 w-5" />
            ) : (
              <Image
                className="object-contain"
                width={20}
                height={20}
                src={`/icon/${filter.class}.webp`}
                alt=""
              />
            )}
            <SelectValue placeholder="All Classes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              className="gap-2"
              Icon={<Skill className="h-5 w-5" />}
              value="any"
            >
              All Classes
            </SelectItem>
            {mir4Classes.map((mir4Class) => (
              <SelectItem
                key={mir4Class}
                className="gap-2 capitalize"
                value={mir4Class}
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

        <SelectRange
          defaultValue={[90, 130]}
          min={60}
          max={170}
          Icon={<EXP className="h-5 w-5" />}
          label="Level"
          step={5}
        />

        <SelectRange
          defaultValue={[1e5, 9e5]}
          min={1e5}
          max={9e5}
          Icon={<Power className="h-5 w-5" />}
          label="Power"
          step={5000}
          showInput={false}
        />

        <SelectRange
          defaultValue={[100, 2000]}
          min={100}
          max={2000}
          Icon={<Codex className="h-5 w-5" />}
          label="Codex"
          step={10}
        />

        <PriceRange />
      </section>

      <h2 className="my-8 mr-auto">Stats Filter</h2>

      <section className="flex w-full flex-wrap items-center gap-4">
        <StatusRange label="PHYS ATK" Icon={<PHYSATK className="h-5 w-5" />} />

        <StatusRange
          label="SPELL ATK"
          Icon={<SpellATK className="h-5 w-5" />}
        />

        <StatusRange label="PHYS DEF" Icon={<PHYSDEF className="h-5 w-5" />} />

        <StatusRange
          label="SPELL DEF"
          Icon={<SPELLDEF className="h-5 w-5" />}
        />

        <StatusRange label="EVA" Icon={<EVA className="h-5 w-5" />} />

        <StatusRange label="Accuracy" Icon={<Accuracy className="h-5 w-5" />} />
      </section>

      <h2 className="my-8 mr-auto">Premium Filters</h2>

      <section className="flex w-full flex-wrap items-center gap-4">
        <SpiritSelector />

        <TrainingSelector />

        <TicketsSelector />

        <SkillsSelector />
      </section>
    </main>
  );
}
