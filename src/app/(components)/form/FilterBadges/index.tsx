import millify from "millify"
import Image from "next/image"
import type { SVGProps } from "react"
import type { UseFormResetField, UseFormSetValue } from "react-hook-form"
import { getStatIcon } from "../../list/card/Front"
import { getStatsRangeLabel } from "../StatusRange"
import { BuildingBadges } from "./BuildingBadges"
import { ClassBadge } from "./Class"
import { FilterChip } from "./FilterChip"
import { SpiritsBadge } from "./SpiritBadge"
import { TrainingBadges } from "./TrainingBadges"
import { LIST_FILTER_DEFAULT, type ListFiltersType } from "@/atom/ListFilters"
import {
  Codex,
  Crafting,
  EXP,
  Globe,
  MagicSquare,
  Power,
  Search,
  Skill,
  Wemix,
} from "@/components/other"
import { isRangeDifferent } from "@/lib/utils"

export function FilterBadges({
  filters,
  resetField,
  setValue,
}: {
  filters: ListFiltersType
  resetField: UseFormResetField<ListFiltersType>
  setValue: UseFormSetValue<ListFiltersType>
}) {
  const {
    search,
    building,
    class: mir4Class,
    level,
    power,
    codex,
    max_price,
    world_name,
    stats,
    spirits,
    training,
    mystique,
    tickets,
    skills,
    materials,
    potentials,
  } = filters

  return (
    <div className="flex flex-wrap gap-2">
      {search === "" ? null : (
        <FilterChip onRemove={() => resetField("search")}>
          <Search /> {search}
        </FilterChip>
      )}

      {mir4Class === 0 ? null : (
        <ClassBadge
          mir4Class={mir4Class}
          onRemove={() => {
            resetField("class")
            resetField("skills")
          }}
        />
      )}

      <RangeBadge
        Icon={EXP}
        isDifferent={isRangeDifferent(LIST_FILTER_DEFAULT.level, level)}
        range={level}
        onRemove={() => resetField("level")}
      />

      <RangeBadge
        Icon={Power}
        isDifferent={isRangeDifferent(LIST_FILTER_DEFAULT.power, power)}
        range={power}
        onRemove={() => resetField("power")}
      />

      <RangeBadge
        Icon={Codex}
        isDifferent={isRangeDifferent(LIST_FILTER_DEFAULT.codex, codex)}
        range={codex}
        onRemove={() => resetField("codex")}
      />

      {max_price == null ? null : (
        <FilterChip onRemove={() => resetField("max_price")}>
          <Wemix /> Max: {max_price}
        </FilterChip>
      )}

      {world_name == null ? null : (
        <FilterChip onRemove={() => resetField("world_name")}>
          <Globe /> {world_name}
        </FilterChip>
      )}

      <StatsBadge resetField={resetField} stats={stats} />

      <SpiritsBadge resetField={resetField} spirits={spirits} />

      <TrainingBadges resetField={resetField} training={training} />

      <BuildingBadges building={building} resetField={resetField} />

      <MystiqueBadges mystique={mystique} resetField={resetField} />

      <TicketsBadge resetField={resetField} tickets={tickets} />

      <SkillsBadge
        resetField={(skillName: string) => setValue(`skills.${skillName}`, 0)}
        skills={skills}
      />

      <MaterialsBadge materials={materials} resetField={resetField} />

      <PotentialsBadge potentials={potentials} resetField={resetField} />
    </div>
  )
}

function RangeBadge({
  range,
  isDifferent,
  Icon,
  onRemove,
}: {
  range: number[]
  isDifferent: boolean
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  onRemove: () => void
}) {
  const min = range[0]
  const max = range[1]

  if (!isDifferent) return null

  return (
    <FilterChip onRemove={onRemove}>
      <Icon /> {millify(min)} - {millify(max)}
    </FilterChip>
  )
}

function StatsBadge({
  stats,
  resetField,
}: {
  stats: ListFiltersType["stats"]
  resetField: UseFormResetField<ListFiltersType>
}) {
  return Object.entries(stats).map(([key, value]) => {
    const minValue = value[0]
    const maxValue = value[1]

    if (minValue == null && maxValue == null) return null

    const Icon = getStatIcon(key as NFT_STATS_ENUM)
    const label = getStatsRangeLabel(minValue, maxValue)

    return (
      <FilterChip
        key={key}
        onRemove={() => resetField(`stats.${key as NFT_STATS_ENUM}`)}
      >
        <Icon /> {label}
      </FilterChip>
    )
  })
}

function MystiqueBadges({
  mystique,
  resetField,
}: {
  mystique: ListFiltersType["mystique"]
  resetField: UseFormResetField<ListFiltersType>
}) {
  return Object.entries(mystique).map(([key, value]) => {
    if (value == null) return null

    return (
      <FilterChip
        key={key}
        onRemove={() => resetField(`mystique.${key as NFT_MYSTIQUE}`)}
      >
        <Image
          alt=""
          className="absolute left-0 z-[-1] w-32 object-cover opacity-30"
          height={40}
          src={`/mystique/${key.toLowerCase().replace(/\s/g, "_")}.webp`}
          width={128}
        />
        <Skill className="h-5 w-5" /> +{millify(value)}
      </FilterChip>
    )
  })
}

function TicketsBadge({
  tickets,
  resetField,
}: {
  tickets: ListFiltersType["tickets"]
  resetField: UseFormResetField<ListFiltersType>
}) {
  return Object.entries(tickets).map(([key, value]) => {
    if (value == null) return null

    return (
      <FilterChip
        key={key}
        onRemove={() => resetField(`tickets.${key as TicketsType}`)}
      >
        <Image
          alt=""
          className="absolute left-0 z-[-1] w-32 object-cover opacity-30"
          height={40}
          src={`/tickets/${key.toLowerCase().replace(/\s/g, "_")}.webp`}
          width={128}
        />
        <MagicSquare className="h-5 w-5" /> +{millify(value)}
      </FilterChip>
    )
  })
}

function SkillsBadge({
  skills,
  resetField,
}: {
  skills: ListFiltersType["skills"]
  resetField: (skillName: string) => void
}) {
  if (skills == null) return null

  return Object.entries(skills).map(([key, value]) => {
    if (value === 0) return null

    return (
      <FilterChip key={key} onRemove={() => resetField(key)}>
        <Image
          alt=""
          className="absolute left-0 z-[-1] w-32 object-cover opacity-30"
          height={40}
          src={`/skills/${key.toLowerCase().replace(/\s/g, "-")}.webp`}
          width={128}
        />
        <Skill className="h-5 w-5" /> +{millify(value)}
      </FilterChip>
    )
  })
}

function MaterialsBadge({
  materials,
  resetField,
}: {
  materials: ListFiltersType["materials"]
  resetField: UseFormResetField<ListFiltersType>
}) {
  if (materials == null) return null

  return Object.entries(materials).map(([key, value]) => {
    if (value.Legendary === 0 && value.Epic === 0) return null

    return (
      <>
        {value.Legendary > 0 ? (
          <FilterChip
            key={key}
            onRemove={() =>
              resetField(`materials.${key as MaterialsType}.Legendary`)
            }
          >
            <div className="absolute left-0 z-[-1] grid h-32 w-full place-items-center">
              <Image
                alt=""
                className="absolute z-[-1] w-32 object-cover opacity-10"
                height={40}
                src={"/item-bg-legendary.webp"}
                width={128}
              />
              <Image
                alt=""
                className="w-20 object-cover opacity-40"
                height={40}
                src={`/material/${key.toLowerCase().replace(/\s/g, "_")}.webp`}
                width={80}
              />
            </div>
            <Crafting className="h-5 w-5" /> +{millify(value.Legendary)}
          </FilterChip>
        ) : null}

        {value.Epic > 0 ? (
          <FilterChip
            key={key}
            onRemove={() =>
              resetField(`materials.${key as MaterialsType}.Epic`)
            }
          >
            <div className="absolute left-0 z-[-1] grid h-32 w-full place-items-center">
              <Image
                alt=""
                className="absolute z-[-1] w-32 object-cover opacity-10"
                height={40}
                src={"/item-bg-Epic.webp"}
                width={128}
              />
              <Image
                alt=""
                className="w-20 object-cover opacity-40"
                height={40}
                src={`/material/${key.toLowerCase().replace(/\s/g, "_")}.webp`}
                width={80}
              />
            </div>
            <Crafting className="h-5 w-5" /> +{millify(value.Epic)}
          </FilterChip>
        ) : null}
      </>
    )
  })
}

function PotentialsBadge({
  potentials,
  resetField,
}: {
  potentials: ListFiltersType["potentials"]
  resetField: UseFormResetField<ListFiltersType>
}) {
  return Object.entries(potentials).map(([key, value]) => {
    if (value == null) return null

    return (
      <FilterChip
        key={key}
        onRemove={() => resetField(`potentials.${key as PotentialType}`)}
      >
        <Image
          alt=""
          className="absolute left-0 z-[-1] w-32 object-cover opacity-30"
          height={40}
          src={`/potential/${key.toLowerCase()}.webp`}
          width={128}
        />
        <Skill className="h-5 w-5" /> +{millify(value)}
      </FilterChip>
    )
  })
}
