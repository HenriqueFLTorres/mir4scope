import { atom } from "jotai"

export type ListSortType =
  | "latest"
  | "pricehigh"
  | "pricelow"
  | "lvhigh"
  | "pshigh"

export type ListStatusEnum =
  | "PHYS ATK"
  | "PHYS DEF"
  | "Spell ATK"
  | "Spell DEF"
  | "EVA"
  | "Accuracy"

export type ListMinMaxType = [undefined | number, undefined | number]

export type ListFiltersType = {
  search: string
  sort: ListSortType
  class: 0 | 1 | 2 | 3 | 4 | 5 | 6
  level: number[]
  power: number[]
  codex: number[]
  spirits: SpiritsType[]
  currency: string | undefined
  max_price: number | undefined
  world_name: string | undefined
  wemix_price:
    | {
        [key in string]: number
      }
    | undefined
  stats: Partial<{
    [key in NFT_STATS_ENUM]: ListMinMaxType
  }>
  training: {
    [key in TrainingType]: [number, number]
  }
  building: {
    [key in BuildingType]: number | undefined
  }
  skills:
    | {
        [key in string]: number
      }
    | undefined
  mystique: {
    [key in NFT_MYSTIQUE]: number | undefined
  }
  potentials: {
    [key in PotentialType]: number | undefined
  }
  tickets: {
    [key in TicketsType]: number | undefined
  }
  materials:
    | {
        [key in MaterialsType]: { Legendary: number; Epic: number }
      }
    | undefined
}

export const LIST_FILTER_DEFAULT: ListFiltersType = {
  search: "",
  sort: "latest",
  class: 0,
  level: [60, 170],
  power: [100e3, 600e3],
  codex: [100, 2000],
  spirits: [],
  currency: "WEMIX",
  max_price: undefined,
  world_name: undefined,
  wemix_price: undefined,
  stats: {
    "PHYS ATK": [undefined, undefined],
    "PHYS DEF": [undefined, undefined],
    "Spell ATK": [undefined, undefined],
    "Spell DEF": [undefined, undefined],
    EVA: [undefined, undefined],
    Accuracy: [undefined, undefined],
  },
  training: {
    Constitution: [0, 21],
    "Muscle Strength Manual": [0, 20],
    "Nine Yang Manual": [0, 20],
    "Nine Yin Manual": [0, 20],
    "Northern Profound Art": [0, 12],
    "Toad Stance": [0, 12],
    "Violet Mist Art": [0, 12],
  },
  building: {
    Mine: undefined,
    Forge: undefined,
    Portal: undefined,
    "Holy Shrine": undefined,
    "Millennial Tree": undefined,
    "Tower of Victory": undefined,
    "Training Sanctum": undefined,
    "Tower of Conquest": undefined,
    "Sanctuary of Hydra": undefined,
    "Tower of Quintessence": undefined,
  },
  skills: undefined,
  mystique: {
    "Unicorn Lion Mystique": undefined,
    "Vermilion Bird Mystique": undefined,
    "Black Tortoise Mystique": undefined,
    "White Tiger Mystique": undefined,
    "Blue Dragon Mystique": undefined,
  },
  potentials: {
    Hunting: undefined,
    PvP: undefined,
    Secondary: undefined,
  },
  tickets: {
    "Raid Ticket": undefined,
    "Boss Raid Ticket": undefined,
    "Hell Raid Ticket": undefined,
    "Magic Square Ticket": undefined,
    "Secret Peak Ticket": undefined,
    "Wayfarer Travel Pass": undefined,
  },
  materials: undefined,
}

export const ListFilterAtom = atom<ListFiltersType>(LIST_FILTER_DEFAULT)
