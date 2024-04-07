import prisma from "@/lib/prisma";
import type { nft, spirits } from "@prisma/client";
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

    const magic_stone = await prisma.magic_stone.findFirst({
      where: {
        id: nft?.magic_stone_id,
      },
    });

    const mystical_piece = await prisma.mystical_piece.findFirst({
      where: {
        id: nft?.mystical_piece_id,
      },
    });

    const inventory = await prisma.inventory.findFirst({
      where: {
        id: nft?.inventory_id,
      },
    });

    return NextResponse.json({
      ...nft,
      spirits,
      magic_orb,
      magic_stone,
      mystical_piece,
      inventory: inventory?.inventory
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: null,
      },
      { status: 500, statusText: "Server error." },
    );
  }
}
