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
    [key in ListStatusEnum]: [undefined | number, undefined | number];
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
};

export const ListFilterAtom = atom<ListFiltersType>(LIST_FILTER_DEFAULT);
