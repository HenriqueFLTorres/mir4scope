import { db } from "@/drizzle/index";
import {
  INVENTORY_SCHEMA,
  MAGIC_ORB_SCHEMA,
  MAGIC_STONE_SCHEMA,
  MYSTICAL_PIECE_SCHEMA,
  NFT_SCHEMA,
  SPIRITS_SCHEMA,
  SUCCESSION_SCHEMA,
} from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { seq } = await request.json();

    const nft = (
      await db.select().from(NFT_SCHEMA).where(eq(NFT_SCHEMA.seq, seq)).limit(1)
    ).at(0);

    if (!nft) throw new Error("NFT not found.");

    const spirits = (
      await db
        .select()
        .from(SPIRITS_SCHEMA)
        .where(eq(SPIRITS_SCHEMA.id, nft.spiritsId))
        .limit(1)
    ).at(0);

    const magic_orb = (
      await db
        .select()
        .from(MAGIC_ORB_SCHEMA)
        .where(eq(MAGIC_ORB_SCHEMA.id, nft.magicOrbId))
        .limit(1)
    ).at(0);

    const magic_stone = (
      await db
        .select()
        .from(MAGIC_STONE_SCHEMA)
        .where(eq(MAGIC_STONE_SCHEMA.id, nft.magicStoneId))
        .limit(1)
    ).at(0);

    const mystical_piece = (
      await db
        .select()
        .from(MYSTICAL_PIECE_SCHEMA)
        .where(eq(MYSTICAL_PIECE_SCHEMA.id, nft.mysticalPieceId))
        .limit(1)
    ).at(0);

    const inventory = (
      await db
        .select()
        .from(INVENTORY_SCHEMA)
        .where(eq(INVENTORY_SCHEMA.id, nft.inventoryId))
        .limit(1)
    ).at(0);

    const succession = (
      await db
        .select()
        .from(SUCCESSION_SCHEMA)
        .where(eq(SUCCESSION_SCHEMA.id, nft.successionId))
        .limit(1)
    ).at(0);

    return NextResponse.json({
      ...nft,
      spirits,
      magic_orb,
      magic_stone,
      mystical_piece,
      inventory: inventory?.inventory,
      succession: succession?.succession,
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
