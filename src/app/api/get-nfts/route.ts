import type { ListFiltersType } from "@/atom/ListFilters";
import prisma from "@/lib/prisma";
import type { nft, spirits } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

export type NftFromMongo = Exclude<nft, "spirits_id" | "stats"> & {
  spirits_id: { $oid: string };
  spirits: Omit<spirits, "id" | "equip">;
};

export async function POST(request: NextRequest) {
  try {
    const {
      search,
      class: mir4Class,
      level,
      power,
      codex,
      priceRange,
    } = (await request.json()) as ListFiltersType;

    const filter = {
      ...(search ? { character_name: { $regex: search, $options: "i" } } : {}),
      ...(mir4Class > 0 ? { class: { $eq: mir4Class } } : {}),
      ...(level[0] > 60 || level[1] < 170
        ? { lvl: { $gte: level[0], $lte: level[1] } }
        : {}),
      ...(power[0] > 100e3 || power[1] < 600e3
        ? { power_score: { $gte: power[0], $lte: power[1] } }
        : {}),
      ...(priceRange[0] > 0 || priceRange[1]
        ? {
            price: {
              ...(priceRange[0] > 0 ? { $gte: priceRange[0] } : {}),
              ...(priceRange[1] ? { $lte: priceRange[1] } : {}),
            },
          }
        : {}),
    };

    const nft_list = (await prisma.nft.aggregateRaw({
      pipeline: [
        {
          $match: filter,
        },
        {
          $project: {
            codex: {
              $sum: "$1.completed",
            },
          },
        },
        ...(codex[0] > 100 || codex[1] < 2000
          ? [
              {
                $addFields: {
                  codex1: { $toInt: "$codex.1.completed" },
                  codex2: { $toInt: "$codex.2.completed" },
                  codex3: { $toInt: "$codex.3.completed" },
                  codex4: { $toInt: "$codex.4.completed" },
                },
              },
              {
                $addFields: {
                  totalCodex: {
                    $add: ["$codex1", "$codex2", "$codex3", "$codex4"],
                  },
                },
              },
              {
                $unset: ["codex1", "codex2", "codex3", "codex4"],
              },
              {
                $match: {
                  totalCodex: { $gte: codex[0], $lte: codex[1] },
                },
              },
            ]
          : []),
      ],
      options: {
        take: 20,
      },
    })) as unknown as NftFromMongo[];

    const nft_list_with_spirit = await Promise.all(
      (nft_list ? nft_list : []).map(async (nft) => {
        const spirits = await prisma.spirits.aggregateRaw({
          pipeline: [
            { $match: { _id: { $oid: nft.spirits_id.$oid } } },
            {
              $project: {
                inven: {
                  $filter: {
                    input: "$inven",
                    cond: {
                      $gte: ["$$this.grade", 4],
                    },
                  },
                },
              },
            },
            {
              $project: {
                inven: {
                  $sortArray: { input: "$inven", sortBy: { grade: -1 } },
                },
              },
            },
          ],
        });

        return {
          ...nft,
          spirits: spirits[0] as Omit<spirits, "id" | "equip">,
        };
      }),
    );

    return NextResponse.json({
      success: true,
      data: nft_list_with_spirit,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        data: null,
      },
      { status: 500, statusText: "Server error." },
    );
  }
}
