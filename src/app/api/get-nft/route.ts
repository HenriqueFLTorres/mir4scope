import prisma from "@/lib/prisma";
import type { Nft, Prisma, Spirits } from "@prisma/client";
import { NextResponse } from "next/server";

export type NftFromMongo = Exclude<Nft, "spirits_id" | "stats"> & {
  spirits_id: { $oid: string };
  spirits: Omit<Spirits, "id" | "equip">;
};

export async function POST(request: Request) {
  try {
    const { seq } = await request.json();

    const nft = await prisma.nft.findFirst({
      where: {
        seq: Number(seq),
      },
    });

    const spirits = prisma.spirits.findFirst({
      where: {
        id: nft?.spirits_id,
      },
    });

    return NextResponse.json({
      ...nft,
      spirits,
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
