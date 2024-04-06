declare global {
  namespace PrismaJson {
    type nft_status = NftStats;
    type nft_training = NftTraining;
    type nft_equip_items = { [key in string]: NftEquipItem };
    type nft_skills = NftSkills;

    type nft_spirit_equip = NftSpirit[];
    type nft_spirit_inven = { [key in string]: { [key in string]: NftSpirit } };
    type nft_assets = { [key in NftAssets]: string };
    type nft_succession = { [key in string]: NftSuccessionItem };

    type nft_magic_orb_equip_item = NftMagicOrb[];
  }
}

export type NftStats = {
  Life: string;
  "Monster Accuracy Boost": string;
  MP: string;
  "Drop Chance Boost": string;
  "Lucky Drop Chance Boost": string;
  "Boss ATK DMG Boost": string;
  "Dragon Artifact Enhancement Success Chance Boost (R)": string;
  "Bash DMG Reduction": string;
  "Skill DMG Reduction": string;
  "All ATK DMG Boost": string;
  "Debilitation RES Boost": string;
  "Solitude Training Success Chance Boost": string;
  "Silence RES Boost": string;
  "Monster EVA Boost": string;
  "Box Open Time Boost": string;
  "Knockdown Success Boost": string;
  "Hunting Copper Gain Boost": string;
  HP: string;
  "Darksteel Gain Boost": string;
  "HP Potion Effect Boost": string;
  "Divine Water Cooldown Reduction": string;
  "PvP ATK DMG Boost": string;
  "Basic DMG Reduction": string;
  "Stun Success Boost": string;
  "Monster ATK DMG Boost": string;
  "Skill HP Recovery Am't Boost": string;
  "Dragon Artifact Enhancement Success Chance Boost (E)": string;
  Accuracy: string;
  "Dragon Artifact Enhancement Success Chance Boost (L)": string;
  "MP % REGEN (per 10 sec)": string;
  "Boss DMG Reduction": string;
  "Gathering Boost": string;
  "CRIT EVA": string;
  "Max Vigor Boost (sec)": string;
  EVA: string;
  "Antidemon Power": string;
  "HP % REGEN (per 10 sec)": string;
  "Bash ATK DMG Boost": string;
  "CRIT ATK DMG Boost": string;
  "PHYS DEF": string;
  "Energy Gathering Boost": string;
  "PvP DMG Reduction": string;
  "Knockdown RES Boost": string;
  "Spell DEF": string;
  "Equipment Enhancement Success Chance Boost (All)": string;
  "Equipment Enhancement Success Chance Boost (E)": string;
  CRIT: string;
  "Mining Boost": string;
  "Stun RES Boost": string;
  "Equipment Enhancement Success Chance Boost (UC)": string;
  "Skill Cooldown Reduction": string;
  "Equipment Enhancement Success Chance Boost (L)": string;
  "Spell ATK": string;
  "Silence Success Boost": string;
  "Debilitation Success Boost": string;
  "PHYS ATK": string;
  "MP Potion Effect Boost": string;
  "Hunting EXP Boost": string;
  "Monster DMG Reduction": string;
  "All DMG Reduction": string;
  "Basic ATK DMG Boost": string;
  "Skill ATK DMG Boost": string;
  "Equipment Enhancement Success Chance Boost (R)": string;
  "Energy Gain Boost": string;
  "Dragon Artifact Enhancement Success Chance Boost (All)": string;
  "CRIT DMG Reduction": string;
};

export type NftTraining = {
  chi: {
    "Nine Yang Manual": string;
    "Muscle Strength Manual": string;
    "Toad Stance": string;
    "Northern Profound Art": string;
    "Violet Mist Art": string;
    "Nine Yin Manual": string;
  };
  constitution: number;
  collect_name: string;
  collect_level: number;
};

export type NftEquipItem = {
  item_idx: string;
  enhance: string;
  refine_step: string;
  grade: string;
  tier: string;
  item_type: string;
  item_name: string;
  item_path: string;
};

export type NftSkills = Partial<{ [key in NftAllSkills]: string }>;

export type NftAllSkills =
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

export type NftSpirit = {
  transcend: number;
  grade: number;
  pet_name: SpiritsType;
  icon_path: string;
};

export type NftMagicOrb = {
  item_idx: string;
  item_level: number;
  item_exp: number;
  grade: string;
  tier: string;
  item_name: string;
  item_path: string;
};

export type NftSuccessionItem = {
  item_idx: string;
  trance_step: number;
  refine_step: number;
  enhance: number;
  grade: string;
  tier: string;
  item_name: string;
  item_path: string;
};

export type NftAssets =
  | "acientcoins"
  | "copper"
  | "darksteel"
  | "dragonjade"
  | "dragonsteel"
  | "energy"
  | "speedups";
