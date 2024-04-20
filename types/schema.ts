import type {
  INVENTORY_SCHEMA,
  MAGIC_ORB_SCHEMA,
  MAGIC_STONE_SCHEMA,
  MYSTICAL_PIECE_SCHEMA,
  NFT_SCHEMA,
  SPIRITS_SCHEMA,
  SUCCESSION_SCHEMA,
} from "@/drizzle/schema";

export type SelectNFT = typeof NFT_SCHEMA.$inferSelect;
export type SelectSpirit = typeof SPIRITS_SCHEMA.$inferSelect;
export type SelectMagicOrb = typeof MAGIC_ORB_SCHEMA.$inferSelect;
export type SelectMagicStone = typeof MAGIC_STONE_SCHEMA.$inferSelect;
export type SelectMysticalPiece = typeof MYSTICAL_PIECE_SCHEMA.$inferSelect;
export type SelectInventory = typeof INVENTORY_SCHEMA.$inferSelect;
export type SelectSuccession = typeof SUCCESSION_SCHEMA.$inferSelect;

export type NFTForDisplay = SelectNFT & {
  spirits: { inven: SelectSpirit["inven"] };
};

export type NFTSelectAll = SelectNFT & { spirits: SelectSpirit } & {
  magicOrb: SelectMagicOrb;
} & { magicStone: SelectMagicStone } & {
  mysticalPiece: SelectMysticalPiece;
} & { inventory: SelectInventory["inventory"] } & {
  succession: SelectSuccession["succession"];
};
