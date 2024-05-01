import { atom } from "jotai";

export type ListSortType =
  | "latest"
  | "pricehigh"
  | "pricelow"
  | "lvhigh"
  | "pshigh";

export type ListStatusEnum =
  | "PHYS ATK"
  | "PHYS DEF"
  | "Spell ATK"
  | "Spell DEF"
  | "EVA"
  | "Accuracy";

export type ListMinMaxType = [undefined | number, undefined | number];

export type ListFiltersType = {
  search: string;
  sort: ListSortType;
  class: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  level: number[];
  power: number[];
  codex: number[];
  spirits: SpiritsType[];
  max_price: undefined;
  stats: {
    [key in ListStatusEnum]: ListMinMaxType;
  };
  training: {
    [key in TrainingType]: [number, number];
  };
  building: {
    [key in BuildingType]: [number, number];
  };
};

export const LIST_FILTER_DEFAULT: ListFiltersType = {
  search: "",
  sort: "latest",
  class: 0,
  level: [60, 170],
  power: [100e3, 600e3],
  codex: [100, 2000],
  spirits: [],
  max_price: undefined,
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
    Mine: [0, 25],
    Forge: [0, 25],
    Portal: [0, 25],
    "Holy Shrine": [0, 25],
    "Millennial Tree": [0, 25],
    "Tower of Victory": [0, 25],
    "Training Sanctum": [0, 25],
    "Tower of Conquest": [0, 25],
    "Sanctuary of Hydra": [0, 25],
    "Tower of Quintessence": [0, 25],
  },
};

export const ListFilterAtom = atom<ListFiltersType>(LIST_FILTER_DEFAULT);
