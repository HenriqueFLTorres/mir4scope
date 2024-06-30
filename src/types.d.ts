type Mir4Classes =
  | "Warrior"
  | "Sorcerer"
  | "Taoist"
  | "Arbalist"
  | "Lancer"
  | "Darkist"

type MaterialsType =
  | "Dragon Scale"
  | "Dragon Claw"
  | "Dragon Leather"
  | "Dragon Horn"
  | "Dragon Eye"

type CraftingMaterialType = {
  [key in MaterialsType]: { Legendary: number; Epic: number }
}

type SkillsValueType = {
  [key in SkillsType]: number
}

type TicketsType =
  | "Raid Ticket"
  | "Boss Raid Ticket"
  | "Hell Raid Ticket"
  | "Magic Square Ticket"
  | "Secret Peak Ticket"
  | "Wayfarer Travel Pass"

type TrainingType =
  | "Constitution"
  | "Muscle Strength Manual"
  | "Nine Yin Manual"
  | "Nine Yang Manual"
  | "Violet Mist Art"
  | "Northern Profound Art"
  | "Toad Stance"

type SpiritsType =
  | "Alluring Spirit Cat Lulu"
  | "Bloodtip Drago"
  | "Butterfly Fairy Dreamfly"
  | "Dark Crown Prince Wooska"
  | "Dark Stallion Grifforse"
  | "Eighthorns Revenant Destructive Emperor"
  | "Fairy King Pepo"
  | "Fire Hawk Goldking"
  | "Firelord Balrokk"
  | "Ghost Knight Styx"
  | "Grand GEN Khalion"
  | "Hell Lord Inferno"
  | "Luminous Empress Candela"
  | "Luminous Setra"
  | "North Sea Demon King Sumacheon"
  | "Red Eyes Lucy"
  | "Resurrector Darknyan"
  | "Small White Dragon Chunryu"
  | "Tri-head Draconis"
  | "Wind Summoner Galesoul"
  | "Absolute Beauty Whaley"
  | "Assassin Nyanja"
  | "Blue Baron Mantata"
  | "Brutal Lionheart Koiga"
  | "Dark Assassin Zakhan"
  | "Dark Cloud Dragon Poipoi"
  | "Dark Ice Demon Nerr"
  | "Desert Sage Woosa"
  | "Fire Devil Flamehorn"
  | "Flame Hellborn Biyoho"
  | "Gem Mania Shaoshao"
  | "Glowing Gem Sparkler"
  | "Golden Bird Suparna"
  | "Jade Butterfly Visana"
  | "Leocrat Khun"
  | "Lucky Cat Luckster"
  | "Radiance Dragon Mir"
  | "Redhorn Komet"
  | "Soul Harvester Reaper"
  | "Spring Messenger Yobi"
  | "Thunder Beast Baratan"
  | "Verdant Watcher Gargas"
  | "White Peacock Crystalglass"

type BuildingType =
  | "Mine"
  | "Forge"
  | "Portal"
  | "Holy Shrine"
  | "Millennial Tree"
  | "Tower of Victory"
  | "Training Sanctum"
  | "Tower of Conquest"
  | "Sanctuary of Hydra"
  | "Tower of Quintessence"

type PotentialType = "Hunting" | "PvP" | "Secondary"

type CurrencyPriceType = "WEMIX" | "USD" | "BRL"

type Keys = (keyof typeof data)[]

type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]
