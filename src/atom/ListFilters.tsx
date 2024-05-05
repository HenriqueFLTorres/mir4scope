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
    [key in BuildingType]: number | undefined;
  };
  skills:
    | {
        [key in string]: number;
      }
    | undefined;
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
};

export const ListFilterAtom = atom<ListFiltersType>(LIST_FILTER_DEFAULT);
