import prisma from "@/lib/prisma";
import type { Nft, Prisma, Spirits } from "@prisma/client";
import { NextResponse } from "next/server";

export type NftFromMongo = Exclude<Nft, "spirits_id" | "stats"> & {
  spirits_id: { $oid: string };
  spirits: Omit<Spirits, "id" | "equip">;
};

export async function GET() {
  try {
    const nft_list = (await prisma.nft.findRaw({
      // filter: {  },
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
                  $sortArray: { input: "$inven", sortBy: { grade: 1 } },
                },
              },
            },
          ],
        });

        return {
          ...nft,
          spirits: spirits[0] as Omit<Spirits, "id" | "equip">,
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
