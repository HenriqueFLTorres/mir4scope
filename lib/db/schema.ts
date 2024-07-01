import { eq } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { db } from ".";

export const NFT_SCHEMA = pgTable("nft", {
  id: serial("id").primaryKey(),
  characterName: text("character_name").notNull(),
  seq: integer("seq").notNull(),
  transportId: integer("transport_id").notNull(),
  nftId: text("nft_id").notNull(),
  sealedDt: integer("sealed_dt").notNull(),
  class: integer("class").notNull(),
  lvl: integer("lvl").notNull(),
  powerScore: integer("power_score").notNull(),
  price: integer("price").notNull(),
  mirageScore: integer("mirage_score").notNull(),
  miraX: integer("mira_x").notNull(),
  tradeType: text("trade_type").notNull(),
  worldName: text("world_name").notNull(),
  stats: jsonb("stats").$type<{ [key in NFT_STATS_ENUM]: string }>().notNull(),
  skills: jsonb("skills")
    .$type<{ [key in NFT_SKILLS_ENUM]: string }>()
    .notNull(),
  training: jsonb("training").$type<NFT_TRAINING>().notNull(),
  buildings: jsonb("buildings")
    .$type<{ [key in NFT_BUILDINGS_ENUM]: string }>()
    .notNull(),
  assets: jsonb("assets")
    .$type<{ [key in NFT_ASSETS_ENUM]: string }>()
    .notNull(),
  potentials: jsonb("potentials").$type<NFT_POTENTIAL>().notNull(),
  holy_stuff: jsonb("holy_stuff")
    .$type<{ [key in NFT_MYSTIQUE]: string }>()
    .notNull(),
  codex: jsonb("codex").$type<NFT_CODEX>().notNull(),
  equipItems: jsonb("equip_items")
    .$type<{ [key in string]: NFT_EQUIP_ITEM }>()
    .notNull(),
  reinforce: integer("reinforce").notNull(),
  inventoryId: integer("inventory_id").notNull(),
  successionId: integer("succession_id").notNull(),
  spiritsId: integer("spirits_id")
    .notNull()
    .references(() => SPIRITS_SCHEMA.id),
  magicOrbId: integer("magic_orb_id").notNull(),
  magicStoneId: integer("magic_stone_id").notNull(),
  mysticalPieceId: integer("mystical_piece_id").notNull(),
});

export const SPIRITS_SCHEMA = pgTable("spirits", {
  id: serial("id").primaryKey(),
  equip: jsonb("equip")
    .$type<{ [key in string]: { [key in string]: NFT_SPIRIT } }>()
    .notNull(),
  inven: jsonb("inven").$type<NFT_SPIRIT[]>().notNull(),
});

export const MAGIC_ORB_SCHEMA = pgTable("magic_orb", {
  id: serial("id").primaryKey(),
  equipItem: jsonb("equip_item")
    .$type<{ [key in string]: { [key in string]: NFT_MAGIC_ORB } }>()
    .notNull(),
  active_deck: text("active_deck"),
});

export const MAGIC_STONE_SCHEMA = pgTable("magic_stone", {
  id: serial("id").primaryKey(),
  equipItem: jsonb("equip_item")
    .$type<{ [key in string]: { [key in string]: NFT_MAGIC_STONE } }>()
    .notNull(),
  active_deck: text("active_deck"),
});

export const MYSTICAL_PIECE_SCHEMA = pgTable("mystical_piece", {
  id: serial("id").primaryKey(),
  equipItem: jsonb("equip_item")
    .$type<{ [key in string]: { [key in string]: NFT_MYSTICAL_PIECE } }>()
    .notNull(),
  active_deck: text("active_deck"),
});

export const INVENTORY_SCHEMA = pgTable("inventory", {
  id: serial("id").primaryKey(),
  inventory: jsonb("inventory").$type<NFT_INVENTORY_ITEM[]>().notNull(),
});

export const SUCCESSION_SCHEMA = pgTable("succession", {
  id: serial("id").primaryKey(),
  succession: jsonb("succession")
    .$type<{ [key in string]: NFT_SUCCESSION_ITEM }>()
    .notNull(),
});

export const USERS_SCHEMA = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  is_premium: boolean("is_premium"),
  premium_expires: timestamp("premium_expires"),
  created_at: timestamp("created_at"),
});

export type User = typeof USERS_SCHEMA.$inferSelect; // return type when queried
export type NewUser = typeof USERS_SCHEMA.$inferInsert; // insert type

export async function insertUser(user: NewUser): Promise<User[]> {
  return db.insert(USERS_SCHEMA).values(user).returning();
}

export async function selectUserByEmail(email: string): Promise<User[]> {
  return db.select().from(USERS_SCHEMA).where(eq(USERS_SCHEMA.email, email));
}
