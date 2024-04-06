import prisma from "@/lib/prisma";
import type { nft, Prisma, spirits } from "@prisma/client";
import { NextResponse } from "next/server";

export type NftFromMongo = Exclude<nft, "spirits_id" | "stats"> & {
  spirits_id: { $oid: string };
  spirits: Omit<spirits, "id" | "equip">;
};

export async function POST(request: Request) {
  try {
    const { seq } = await request.json();

    const nft = await prisma.nft.findFirst({
      where: {
        seq: Number(seq),
      },
    });

    const spirits = await prisma.spirits.findFirst({
      where: {
        id: nft?.spirits_id,
      },
    });

    const magic_orb = await prisma.magic_orb.findFirst({
      where: {
        id: nft?.magic_orb_id,
      },
    });

    return NextResponse.json({
      ...nft,
      spirits,
      magic_orb,
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
