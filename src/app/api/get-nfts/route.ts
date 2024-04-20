import { db } from "@/drizzle/index";
import { NFT_SCHEMA } from "@/drizzle/schema";
import { sql } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const allNfts = await db.select().from(NFT_SCHEMA).limit(20);

    const nftsWithSpirit = await Promise.all(
      allNfts.map(async (nft) => {
        const spirits = await db.execute(sql`
          SELECT
            jsonb_agg(obj) AS inven
          FROM
            spirits
            LEFT JOIN LATERAL jsonb_array_elements(spirits.inven) AS obj ON true
          WHERE
            id = ${nft.spiritsId}
            AND (obj ->> 'grade')::int >= 4
          GROUP BY
            spirits.id
          LIMIT
            1;
        `);

        return { ...nft, spirits: spirits[0] };
      }),
    );

    return NextResponse.json(nftsWithSpirit);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500, statusText: "Server error." });
  }
}
