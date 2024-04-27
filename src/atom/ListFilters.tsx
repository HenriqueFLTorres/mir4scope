import { atom } from "jotai";

export type ListSortType = "latest" | "pricehigh" | "pricelow" | "lvhigh" | "pshigh"

export type ListFiltersType = {
  search: string;
  sort: ListSortType;
  class: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  level: number[];
  power: number[];
  codex: number[];
  spirits: SpiritsType[];
};

export const LIST_FILTER_DEFAULT: ListFiltersType = {
  search: "",
  sort: "latest",
  class: 0,
  level: [60, 170],
  power: [100e3, 600e3],
  codex: [100, 2000],
  spirits: []
};

export const ListFilterAtom = atom<ListFiltersType>(LIST_FILTER_DEFAULT);
