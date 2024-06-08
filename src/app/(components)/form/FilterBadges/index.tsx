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
import millify from "millify"
import Image from "next/image"
import type { SVGProps } from "react"
import { getStatIcon } from "../../list/card/Front"
import { getStatsRangeLabel } from "../StatusRange"
import { BuildingBadges } from "./BuildingBadges"
import { ClassBadge } from "./Class"
import { FilterChip } from "./FilterChip"
import { SpiritsBadge } from "./SpiritBadge"
import { TrainingBadges } from "./TrainingBadges"

export function FilterBadges({ filters }: { filters: ListFiltersType }) {
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
    <div className="flex gap-2">
      {search === "" ? null : (
        <FilterChip>
          <Search /> {search}
        </FilterChip>
      )}

      {mir4Class === 0 ? null : <ClassBadge mir4Class={mir4Class} />}

      <RangeBadge
        range={level}
        isDifferent={isRangeDifferent(LIST_FILTER_DEFAULT.level, level)}
        Icon={EXP}
      />

      <RangeBadge
        range={power}
        isDifferent={isRangeDifferent(LIST_FILTER_DEFAULT.power, power)}
        Icon={Power}
      />

      <RangeBadge
        range={codex}
        isDifferent={isRangeDifferent(LIST_FILTER_DEFAULT.codex, codex)}
        Icon={Codex}
      />

      {max_price == null ? null : (
        <FilterChip>
          <Wemix /> Max: {max_price}
        </FilterChip>
      )}

      {world_name == null ? null : (
        <FilterChip>
          <Globe /> {world_name}
        </FilterChip>
      )}

      <StatsBadge stats={stats} />

      <SpiritsBadge spirits={spirits} />

      <TrainingBadges training={training} />

      <BuildingBadges building={building} />

      <MystiqueBadges mystique={mystique} />

      <TicketsBadge tickets={tickets} />

      <SkillsBadge skills={skills} />

      <MaterialsBadge materials={materials} />

      <PotentialsBadge potentials={potentials} />
    </div>
  )
}

function RangeBadge({
  range,
  isDifferent,
  Icon,
}: {
  range: number[]
  isDifferent: boolean
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}) {
  const min = range[0]
  const max = range[1]

  if (!isDifferent) return null

  return (
    <FilterChip>
      <Icon /> {millify(min)} - {millify(max)}
    </FilterChip>
  )
}

function StatsBadge({ stats }: { stats: ListFiltersType["stats"] }) {
  return Object.entries(stats).map(([key, value]) => {
    const minValue = value[0]
    const maxValue = value[1]

    if (minValue == null && maxValue == null) return null

    const Icon = getStatIcon(key as NFT_STATS_ENUM)
    const label = getStatsRangeLabel(minValue, maxValue)

    return (
      <FilterChip key={key}>
        <Icon /> {label}
      </FilterChip>
    )
  })
}

function MystiqueBadges({
  mystique,
}: {
  mystique: ListFiltersType["mystique"]
}) {
  return Object.entries(mystique).map(([key, value]) => {
    if (value == null) return null

    return (
      <FilterChip key={key}>
        <Image
          className="absolute left-0 z-[-1] w-32 object-cover opacity-30"
          alt=""
          width={128}
          height={40}
          src={`/mystique/${key.toLowerCase().replace(/\s/g, "_")}.webp`}
        />
        <Skill className="h-5 w-5" /> +{millify(value)}
      </FilterChip>
    )
  })
}

function TicketsBadge({ tickets }: { tickets: ListFiltersType["tickets"] }) {
  return Object.entries(tickets).map(([key, value]) => {
    if (value == null) return null

    return (
      <FilterChip key={key}>
        <Image
          className="absolute left-0 z-[-1] w-32 object-cover opacity-30"
          alt=""
          width={128}
          height={40}
          src={`/tickets/${key.toLowerCase().replace(/\s/g, "_")}.webp`}
        />
        <MagicSquare className="h-5 w-5" /> +{millify(value)}
      </FilterChip>
    )
  })
}

function SkillsBadge({ skills }: { skills: ListFiltersType["skills"] }) {
  if (skills == null) return null

  return Object.entries(skills).map(([key, value]) => {
    if (value === 0) return null

    return (
      <FilterChip key={key}>
        <Image
          className="absolute left-0 z-[-1] w-32 object-cover opacity-30"
          alt=""
          width={128}
          height={40}
          src={`/skills/${key.toLowerCase().replace(/\s/g, "-")}.webp`}
        />
        <Skill className="h-5 w-5" /> +{millify(value)}
      </FilterChip>
    )
  })
}

function MaterialsBadge({
  materials,
}: {
  materials: ListFiltersType["materials"]
}) {
  if (materials == null) return null

  return Object.entries(materials).map(([key, value]) => {
    if (value.Legendary === 0 && value.Epic === 0) return null

    return (
      <>
        {value.Legendary > 0 ? (
          <FilterChip key={key}>
            <div className="absolute left-0 z-[-1] grid h-32 w-full place-items-center">
              <Image
                className="absolute z-[-1] w-32 object-cover opacity-10"
                alt=""
                width={128}
                height={40}
                src={"/item-bg-legendary.webp"}
              />
              <Image
                className="w-20 object-cover opacity-40"
                alt=""
                width={80}
                height={40}
                src={`/material/${key.toLowerCase().replace(/\s/g, "_")}.webp`}
              />
            </div>
            <Crafting className="h-5 w-5" /> +{millify(value.Legendary)}
          </FilterChip>
        ) : null}

        {value.Epic > 0 ? (
          <FilterChip key={key}>
            <div className="absolute left-0 z-[-1] grid h-32 w-full place-items-center">
              <Image
                className="absolute z-[-1] w-32 object-cover opacity-10"
                alt=""
                width={128}
                height={40}
                src={"/item-bg-Epic.webp"}
              />
              <Image
                className="w-20 object-cover opacity-40"
                alt=""
                width={80}
                height={40}
                src={`/material/${key.toLowerCase().replace(/\s/g, "_")}.webp`}
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
}: {
  potentials: ListFiltersType["potentials"]
}) {
  return Object.entries(potentials).map(([key, value]) => {
    if (value == null) return null

    return (
      <FilterChip key={key}>
        <Image
          className="absolute left-0 z-[-1] w-32 object-cover opacity-30"
          alt=""
          width={128}
          height={40}
          src={`/potential/${key.toLowerCase()}.webp`}
        />
        <Skill className="h-5 w-5" /> +{millify(value)}
      </FilterChip>
    )
  })
}
