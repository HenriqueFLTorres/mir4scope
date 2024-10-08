import {
  LIST_FILTER_DEFAULT,
  type ListFiltersType,
  type ListSortType,
} from "@/atom/ListFilters"

import { db } from "@/drizzle/index"
import formattedSkillsMapping from "@/lib/formattedSkillsMapping"
import { capitalizeString, isRangeDifferent } from "@/lib/utils"
import { sql } from "drizzle-orm"
import { type NextRequest, NextResponse } from "next/server"

const NON_NULL_SPIRITS = "spirits.inven is not null"

export async function POST(request: NextRequest) {
  try {
    const mainFilters: ListFiltersType = await request.json()
    const {
      sort,
      spirits,
      stats,
      training,
      building,
      skills,
      mystique,
      potentials,
      tickets,
      materials,
    } = mainFilters

    const filters: string[] = []
    const whereFilter: string[] = []
    const jsonbAggFilter: string[] = []
    if (spirits.length > 0) whereFilter.push(NON_NULL_SPIRITS)

    getMainFilters(mainFilters, whereFilter)
    getSpiritsFilters(spirits, filters)
    getBasicFilters(mainFilters, whereFilter)
    statsToSQL(stats, whereFilter)
    getTrainingFilters(training, whereFilter)
    getBuildingFilters(building, whereFilter)
    getSkillsFilters(skills, whereFilter)
    getMystiqueFilters(mystique, whereFilter)
    getPotentialsFilters(potentials, whereFilter)
    getTicketsFilters(tickets, whereFilter)
    getMaterialsFilters(materials, jsonbAggFilter, whereFilter)

    const JOINED_FILTERS =
      filters.length > 0 ? `AND ( ${filters.join("\nAND ")} )` : ""

    const JOINED_WHERE =
      whereFilter.length > 0 ? `WHERE ( ${whereFilter.join("\nAND ")} )` : ""

    const JOINED_JSONB_AGG =
      jsonbAggFilter.length > 0 ? jsonbAggFilter.join("\nAND ") : ""

    const SQL_QUERY = `
      SELECT
        nft.character_name,
        nft.seq,
        nft.transport_id,
        nft.class,
        nft.lvl,
        nft.power_score,
        nft.price,
        nft.world_name,
        nft.stats,
        nft.skills,
        nft.training,
        nft.buildings,
        nft.codex,
        nft.equip_items,
        nft.spirits_id,
        spirits.inven
      FROM
        nft
      LEFT JOIN spirits ON nft.spirits_id = spirits.id
      ${JOINED_JSONB_AGG}
      ${JOINED_FILTERS}
      ${JOINED_WHERE}
      ${sortToSQL(sort)}
      LIMIT
        20;
    `
    console.log(SQL_QUERY)

    const allNfts = await db.execute(sql.raw(SQL_QUERY))

    return NextResponse.json(allNfts)
  } catch (error) {
    console.error(error)
    return NextResponse.json([], { status: 500, statusText: "Server error." })
  }
}

function statsToSQL(stats: ListFiltersType["stats"], filters: string[]) {
  for (const [statName, value] of Object.entries(stats)) {
    if (value[0] == null && value[0] == null) continue

    const firstValue = Number(value[0])
    const secondValue = Number(value[1])

    if (firstValue > 0 && secondValue > 0)
      filters.push(
        `(nft.stats ->> '${statName}')::float between ${firstValue} and ${secondValue}`
      )
    else if (firstValue > 0)
      filters.push(`(nft.stats ->> '${statName}')::float >= ${firstValue}`)
    else if (secondValue > 0)
      filters.push(`(nft.stats ->> '${statName}')::float <= ${secondValue}`)
  }
}

function sortToSQL(sort: ListSortType) {
  switch (sort) {
    case "lvhigh":
      return "ORDER BY\n    lvl desc"
    case "pshigh":
      return "ORDER BY\n    power_score desc"
    case "pricehigh":
      return "ORDER BY\n    price desc"
    case "pricelow":
      return "ORDER BY\n    price asc"
    default:
      return ""
  }
}

function getMainFilters(
  {
    search,
    class: mir4Class,
    level,
    power,
    max_price,
    currency,
    wemix_price,
  }: ListFiltersType,
  filters: string[]
) {
  if (search.length > 0)
    filters.push(`"nft"."character_name" ilike '%${search}%'`)
  if (mir4Class !== 0) filters.push(`"nft"."class" = ${mir4Class}`)
  if (isRangeDifferent(level, LIST_FILTER_DEFAULT.level))
    filters.push(`"nft"."lvl" between ${level[0]} and ${level[1]}`)
  if (
    max_price != null &&
    max_price > 0 &&
    wemix_price != null &&
    currency !== undefined
  ) {
    const price = max_price / wemix_price[currency]
    filters.push(`"nft"."price" <= ${price.toFixed(2)}`)
  }
  if (isRangeDifferent(power, LIST_FILTER_DEFAULT.power))
    filters.push(`"nft"."power_score" between ${power[0]} and ${power[1]}`)
}

function getSpiritsFilters(
  spirits: ListFiltersType["spirits"],
  filters: string[]
) {
  for (const spiritName of spirits) {
    const capitalizedName = capitalizeString(spiritName)
    filters.push(`
      EXISTS (
        SELECT 1
        FROM jsonb_array_elements((SELECT spirits.inven FROM spirits WHERE spirits.id = nft.spirits_id)) AS inner_obj
        WHERE inner_obj ->> 'pet_name' = '${capitalizedName}'
      )
    `)
  }
}

function getBasicFilters(
  { codex, world_name }: ListFiltersType,
  filters: string[]
) {
  if (isRangeDifferent(codex, LIST_FILTER_DEFAULT.codex))
    filters.push(
      `(codex ->> 'completed')::int between ${codex[0]} and ${codex[1]}`
    )
  if (typeof world_name === "string" && world_name?.length > 0)
    filters.push(`world_name = '${world_name}'`)
}

function getTrainingFilters(
  training: ListFiltersType["training"],
  filters: string[]
) {
  for (const [trainingName, values] of Object.entries(training)) {
    if (
      isRangeDifferent(
        values,
        LIST_FILTER_DEFAULT.training[trainingName as TrainingType]
      )
    )
      filters.push(
        `(training ->> '${trainingName}')::int BETWEEN ${values[0]} AND ${values[1]}`
      )
  }
}

function getBuildingFilters(
  building: ListFiltersType["building"],
  filters: string[]
) {
  for (const [buildingName, value] of Object.entries(building)) {
    if (value === undefined || value === null || value === 0) return

    filters.push(`(buildings ->> '${buildingName}')::int >= ${value}`)
  }
}

function getSkillsFilters(
  skills: ListFiltersType["skills"],
  filters: string[]
) {
  if (!skills) return

  for (const [skillName, value] of Object.entries(skills)) {
    if (value <= 0) continue

    const unformattedName = formattedSkillsMapping[skillName]

    filters.push(`(skills ->> $$${unformattedName}$$)::int >= ${value}`)
  }
}

function getMystiqueFilters(
  mystique: ListFiltersType["mystique"],
  filters: string[]
) {
  for (const [name, value] of Object.entries(mystique)) {
    if (value == null) return

    filters.push(`(holy_stuff ->> '${name}')::int >= ${value}`)
  }
}

function getPotentialsFilters(
  potentials: ListFiltersType["potentials"],
  filters: string[]
) {
  for (const [potentialName, value] of Object.entries(potentials)) {
    if (value == null) continue
    filters.push(
      `(potentials ->> '${potentialName.toLowerCase()}')::int >= ${value}`
    )
  }
}

function getTicketsFilters(
  tickets: ListFiltersType["tickets"],
  filters: string[]
) {
  for (const [ticketName, value] of Object.entries(tickets)) {
    if (value == null) continue
    filters.push(`(tickets ->> '${ticketName}')::int >= ${value}`)
  }
}

function getMaterialsFilters(
  materials: ListFiltersType["materials"],
  jsonb_agg_filters: string[],
  where_filters: string[]
) {
  if (!materials) return

  // 💀
  jsonb_agg_filters.push(`
        LEFT JOIN LATERAL (
          SELECT jsonb_object_agg(key, value) AS craft_materials
          FROM jsonb_each((SELECT inventory.craft_materials FROM inventory WHERE
              inventory.id = nft.inventory_id))
        ) AS inventory ON true
    `)

  for (const [materialName, value] of Object.entries(materials)) {
    if (value == null) continue

    if (value.Epic != null && value.Epic !== 0) {
      where_filters.push(
        `(inventory.craft_materials -> '[E] ${materialName}')::int >= ${value.Epic}`
      )
    }

    if (value.Legendary != null && value.Legendary !== 0) {
      where_filters.push(
        `(inventory.craft_materials -> '[L] ${materialName}')::int >= ${value.Legendary}`
      )
    }
  }
}
