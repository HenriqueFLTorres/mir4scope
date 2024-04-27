import {
  LIST_FILTER_DEFAULT,
  type ListFiltersType,
  type ListSortType,
} from "@/atom/ListFilters";
import { isRangeDifferent } from "@/components/FilterChips";
import { db } from "@/drizzle/index";
import { sql } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

const NON_NULL_SPIRITS = `
  where
    spirits.inven is not null
`;

export async function POST(request: NextRequest) {
  try {
    const mainFilters: ListFiltersType = await request.json();
    const { sort, spirits } = mainFilters;

    const filters: string[] = [];

    getMainFilters(mainFilters, filters);
    getSpiritsFilters(spirits, filters);

    const JOINED_FILTERS =
      filters.length > 0 ? `AND ( ${filters.join("\nAND ")} )` : "";

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
        nft.codex,
        nft.equip_items,
        nft.spirits_id,
        spirits.inven
      FROM
        nft
      LEFT JOIN LATERAL (
        SELECT jsonb_agg(obj) AS inven
        FROM jsonb_array_elements((SELECT spirits.inven FROM spirits WHERE spirits.id = nft.spirits_id)) AS obj
        WHERE (obj ->> 'grade')::int >= 4
      ) AS spirits(inven) ON true
      ${JOINED_FILTERS}
      ${spirits.length > 0 ? NON_NULL_SPIRITS : ""}
      ORDER BY
        (spirits.inven -> 0 ->> 'grade')::int DESC
        ${sortToSQL(sort)}
      LIMIT
        20;
    `;

    const allNfts = await db.execute(sql.raw(SQL_QUERY));

    return NextResponse.json(allNfts);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500, statusText: "Server error." });
  }
}

function sortToSQL(sort: ListSortType) {
  switch (sort) {
    case "lvhigh":
      return ", lvl desc";
    case "pshigh":
      return ", power_score desc";
    case "pricehigh":
      return ", price desc";
    case "pricelow":
      return ", price asc";
    default:
      return "";
  }
}

function getMainFilters(
  { search, class: mir4Class, level, power, codex, max_price }: ListFiltersType,
  filters: string[],
) {
  if (search) filters.push(`"nft"."character_name" ilike '%${search}%'`);
  if (mir4Class !== 0) filters.push(`"nft"."class" = ${mir4Class}`);
  if (isRangeDifferent(level, LIST_FILTER_DEFAULT.level))
    filters.push(`"nft"."lvl" between ${level[0]} and ${level[1]}`);
  if (max_price) filters.push(`WHERE "nft"."price" <= ${max_price}`);
  if (isRangeDifferent(power, LIST_FILTER_DEFAULT.power))
    filters.push(`"nft"."power_score" between ${power[0]} and ${power[1]}`);
  if (isRangeDifferent(codex, LIST_FILTER_DEFAULT.codex))
    filters.push(
      `(codex ->> 'completed')::int between ${codex[0]} and ${codex[1]}`,
    );
}

function getSpiritsFilters(spirits: SpiritsType[], filters: string[]) {
  for (const spiritName of spirits) {
    filters.push(`
      EXISTS (
        SELECT 1
        FROM jsonb_array_elements((SELECT spirits.inven FROM spirits WHERE spirits.id = nft.spirits_id)) AS inner_obj
        WHERE inner_obj ->> 'pet_name' = '${spiritName}'
      )
    `);
  }
}
