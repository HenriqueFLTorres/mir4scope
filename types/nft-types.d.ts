type NFT_STATS_ENUM =
  | "Life"
  | "Monster Accuracy Boost"
  | "MP"
  | "Drop Chance Boost"
  | "Lucky Drop Chance Boost"
  | "Boss ATK DMG Boost"
  | "Dragon Artifact Enhancement Success Chance Boost (R)"
  | "Bash DMG Reduction"
  | "Skill DMG Reduction"
  | "All ATK DMG Boost"
  | "Debilitation RES Boost"
  | "Solitude Training Success Chance Boost"
  | "Silence RES Boost"
  | "Monster EVA Boost"
  | "Box Open Time Boost"
  | "Knockdown Success Boost"
  | "Hunting Copper Gain Boost"
  | "HP"
  | "Darksteel Gain Boost"
  | "HP Potion Effect Boost"
  | "Divine Water Cooldown Reduction"
  | "PvP ATK DMG Boost"
  | "Basic DMG Reduction"
  | "Stun Success Boost"
  | "Monster ATK DMG Boost"
  | "Skill HP Recovery Am't Boost"
  | "Dragon Artifact Enhancement Success Chance Boost (E)"
  | "Accuracy"
  | "Dragon Artifact Enhancement Success Chance Boost (L)"
  | "MP % REGEN (per 10 sec)"
  | "Boss DMG Reduction"
  | "Gathering Boost"
  | "CRIT EVA"
  | "Max Vigor Boost (sec)"
  | "EVA"
  | "Antidemon Power"
  | "HP % REGEN (per 10 sec)"
  | "Bash ATK DMG Boost"
  | "CRIT ATK DMG Boost"
  | "PHYS DEF"
  | "Energy Gathering Boost"
  | "PvP DMG Reduction"
  | "Knockdown RES Boost"
  | "Spell DEF"
  | "Equipment Enhancement Success Chance Boost (All)"
  | "Equipment Enhancement Success Chance Boost (E)"
  | "CRIT"
  | "Mining Boost"
  | "Stun RES Boost"
  | "Equipment Enhancement Success Chance Boost (UC)"
  | "Skill Cooldown Reduction"
  | "Equipment Enhancement Success Chance Boost (L)"
  | "Spell ATK"
  | "Silence Success Boost"
  | "Debilitation Success Boost"
  | "PHYS ATK"
  | "MP Potion Effect Boost"
  | "Hunting EXP Boost"
  | "Monster DMG Reduction"
  | "All DMG Reduction"
  | "Basic ATK DMG Boost"
  | "Skill ATK DMG Boost"
  | "Equipment Enhancement Success Chance Boost (R)"
  | "Energy Gain Boost"
  | "Dragon Artifact Enhancement Success Chance Boost (All)"
  | "CRIT DMG Reduction";

type NFT_SKILLS_ENUM =
  // Warrior
  | "Dragon Flame"
  | "Void Slash"
  | "Splitting Slash"
  | "Body Check"
  | "Ground Smash"
  | "Gale Slash"
  | "Lion's Roar"
  | "Riposte"
  | "Iron Shackle"
  | "Crescent Strike"
  | "Rampant"
  | "Barbaric Charge"
  | "Unbreakable Stance"

  // "Sorcerer"
  | "Dragon Tornado"
  | "Flame Orb"
  | "Frost Orb"
  | "Dark Vortex"
  | "Thunderstorm"
  | "Magic Shield"
  | "Blizzard"
  | "Chain Lightning"
  | "Flame Strike"
  | "Soul Devour"
  | "Immolate"
  | "Vermilion Bird Embrace"
  | "Frozen Block"

  // "Taoist"
  | "Ray of Light"
  | "Moonlight Wave"
  | "Sunbeam Sword"
  | "Moonlight Orb"
  | "Rain of Blades"
  | "Heal"
  | "Piercing Blades"
  | "Guardian Circle"
  | "Tai Chi"
  | "Blasting Charm"
  | "Soaring Slash"
  | "Expulsion Circle"
  | "Greater Heal"

  // Arbalist
  | "Arrow Rain"
  | "Quick Shot"
  | "Painstrike Gale"
  | "Illusion Arrow"
  | "Burst Shell"
  | "Flash Arrow"
  | "Heavenly Bow"
  | "Mind's Eye"
  | "Ice Cage"
  | "Obliterate Shell"
  | "Venom Mist Shell"
  | "Seeking Bolt"
  | "Cloaking"

  // "Lancer"
  | "Dragon Spear"
  | "Ravaging Blow"
  | "Crescent Blade"
  | "Nirvana Kick"
  | "Double Strike"
  | "Sweeping Storm"
  | "Dragon Tail"
  | "Ascending Dragon"
  | "Crushing Blow"
  | "Wind Wall"
  | "Piercing Spear"
  | "Absorption"
  | "Blitz Strike"

  // "Darkist"
  | "Asura"
  | "Ghostly Flame"
  | "Infernal Abyss"
  | "Summon Craveling"
  | "Sanguine Awakening"
  | "Bursting Crimson Flowers"
  | "Decay"
  | "Chain of Blood"
  | "Eldritch Dragon Strike"
  | "Annihilation"
  | "Backflow"
  | "Terrify"
  | "Soul Dispersing Mist";

type NFT_EQUIP_ITEM = {
  item_idx: string;
  enhance: string;
  refine_step: string;
  grade: string;
  tier: string;
  item_type: string;
  item_name: string;
  item_path: string;
  power_score: number;
  options: ITEM_DETAIL[];
  add_option: ITEM_DETAIL[];
};

type ITEM_DETAIL = {
  name: string;
  value: number;
  format: string;
};

type NFT_SPIRIT = {
  transcend: number;
  grade: number;
  pet_name: SpiritsType;
  icon_path: string;
};

type NFT_MAGIC_ORB = {
  item_idx: string;
  item_level: number;
  item_exp: number;
  grade: string;
  tier: string;
  item_name: string;
  item_path: string;
};

type NFT_MAGIC_STONE = {
  item_idx: string;
  trance_step: number;
  refine_step: number;
  grade: string;
  tier: string;
  item_name: string;
  item_path: string;
  power_score: number;
  options: ITEM_DETAIL[];
  add_option: ITEM_DETAIL[];
};

type NFT_MYSTICAL_PIECE = NFT_MAGIC_STONE;

type NFT_INVENTORY_ITEM = {
  item_uid: string;
  item_id: string;
  enhance: number;
  stack: number;
  trance_step: number;
  refine_step: number;
  grade: string;
  main_type: number;
  sub_type: number;
  tab_category: number;
  tier: string;
  item_name: string;
  item_path: string;
  power_score?: number;
  options?: ITEM_DETAIL[];
  add_option?: ITEM_DETAIL[];
  is_tradable: boolean;
};

type NFT_SUCCESSION_ITEM = {
  item_idx: string;
  trance_step: number;
  refine_step: number;
  enhance: number;
  grade: string;
  tier: string;
  item_name: string;
  item_path: string;
  power_score: number;
  options: ITEM_DETAIL[];
  add_option: ITEM_DETAIL[];
};

type NFT_TRAINING = {
  "Nine Yang Manual": string;
  "Muscle Strength Manual": string;
  "Toad Stance": string;
  "Northern Profound Art": string;
  "Violet Mist Art": string;
  "Nine Yin Manual": string;
  Constitution: number;
  collect_name: string;
  collect_level: number;
};

type NFT_ASSETS_ENUM =
  | "acientcoins"
  | "copper"
  | "darksteel"
  | "dragonjade"
  | "dragonsteel"
  | "energy"
  | "speedups";

type NFT_BUILDINGS_ENUM =
  | "Mine"
  | "Forge"
  | "Sanctuary of Hydra"
  | "Tower of Conquest"
  | "Tower of Quintessence"
  | "Millennial Tree"
  | "Portal"
  | "Tower of Victory"
  | "Training Sanctum"
  | "Holy Shrine";

type NFT_MYSTIQUE =
  | "Unicorn Lion Mystique"
  | "Vermilion Bird Mystique"
  | "Black Tortoise Mystique"
  | "White Tiger Mystique"
  | "Blue Dragon Mystique";

type NFT_POTENTIAL = {
  total: number;
  total_max: number;
  hunting: number;
  hunting_max: number;
  pvp: number;
  pvp_max: number;
  secondary: number;
  secondary_max: number;
};

type NFT_CODEX_OBJECT = {
  data: {
    [key in string]: {
      codex_name: number;
      total_count: number;
      completed: number;
      in_progress: number;
    };
  };
  completed: number;
  in_progress: number;
};

type NFT_CODEX = { [key in string]: NFT_CODEX_OBJECT } & {
  completed: number;
  in_progress: number;
};
