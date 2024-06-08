import { eq } from "drizzle-orm"
import { db } from "@/drizzle/index"
import {
  INVENTORY_SCHEMA,
  MAGIC_ORB_SCHEMA,
  MAGIC_STONE_SCHEMA,
  MYSTICAL_PIECE_SCHEMA,
  NFT_SCHEMA,
  SPIRITS_SCHEMA,
  SUCCESSION_SCHEMA,
} from "@/drizzle/schema"
import type { NFTSelectAll } from "@/types/schema"

export const getNft = async (seq: string) => {
  try {
    const nft = (
      await db
        .select()
        .from(NFT_SCHEMA)
        .where(eq(NFT_SCHEMA.seq, Number(seq)))
        .limit(1)
    ).at(0)

    if (!nft) throw new Error("NFT not found.")

    const spirits = (
      await db
        .select()
        .from(SPIRITS_SCHEMA)
        .where(eq(SPIRITS_SCHEMA.id, nft.spiritsId))
        .limit(1)
    ).at(0)

    const magicOrb = (
      await db
        .select()
        .from(MAGIC_ORB_SCHEMA)
        .where(eq(MAGIC_ORB_SCHEMA.id, nft.magicOrbId))
        .limit(1)
    ).at(0)

    const magicStone = (
      await db
        .select()
        .from(MAGIC_STONE_SCHEMA)
        .where(eq(MAGIC_STONE_SCHEMA.id, nft.magicStoneId))
        .limit(1)
    ).at(0)

    const mysticalPiece = (
      await db
        .select()
        .from(MYSTICAL_PIECE_SCHEMA)
        .where(eq(MYSTICAL_PIECE_SCHEMA.id, nft.mysticalPieceId))
        .limit(1)
    ).at(0)

    const inventory = (
      await db
        .select()
        .from(INVENTORY_SCHEMA)
        .where(eq(INVENTORY_SCHEMA.id, nft.inventoryId))
        .limit(1)
    ).at(0)

    const succession = (
      await db
        .select()
        .from(SUCCESSION_SCHEMA)
        .where(eq(SUCCESSION_SCHEMA.id, nft.successionId))
        .limit(1)
    ).at(0)

    return {
      ...nft,
      spirits,
      magicOrb,
      magicStone,
      mysticalPiece,
      inventory: inventory?.inventory,
      succession: succession?.succession,
    } as NFTSelectAll
  } catch (error) {
    console.error(error)
  }
}
