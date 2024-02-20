import { atom } from "jotai";

export type ListFiltersType = {
  class: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  level: number[];
  power: number[];
  codex: number[];
  priceRange: [number, number | undefined];
  materials: CraftingMaterialType;
  skills: SkillsValueType;
  spirits: SpiritsType[];
  status: { [key in StatType]: [number | undefined, number | undefined] };
  tickets: { [key in TicketsType]: number };
  training: {
    [key in TrainingType]: [number, number];
  };
};

export const ListFilterAtom = atom<ListFiltersType>({
  class: 0,
  level: [60, 170],
  power: [100e3, 600e3],
  codex: [100, 2000],
  materials: {
    "Dragon Scale": { Legendary: 0, Epic: 0 },
    "Dragon Claw": { Legendary: 0, Epic: 0 },
    "Dragon Leather": { Legendary: 0, Epic: 0 },
    "Dragon Horn": { Legendary: 0, Epic: 0 },
    "Dragon Eye": { Legendary: 0, Epic: 0 },
  },
  priceRange: [0, undefined],
  skills: {
    "Arrow Rain": 0,
    "Quick Shot": 0,
    "Painstrike Gale": 0,
    "Illusion Arrow": 0,
    "Burst Shell": 0,
    "Flash Arrow": 0,
    "Heavenly Bow": 0,
    "Mind's Eye": 0,
    "Ice Cage": 0,
    "Obliterate Shell": 0,
    "Venom Mist Shell": 0,
    "Seeking Bolt": 0,
    Cloaking: 0,
  },
  spirits: [],
  status: {
    "PHYS ATK": [undefined, undefined],
    "PHYS DEF": [undefined, undefined],
    "Spell ATK": [undefined, undefined],
    "Spell DEF": [undefined, undefined],
    EVA: [undefined, undefined],
    Accuracy: [undefined, undefined],
  },
  tickets: {
    Raid: 0,
    "Raid Boss": 0,
    "Magic Square": 0,
    "Secret Peak": 0,
  },
  training: {
    Constitution: [0, 21],
    "Muscle Strength Manual": [0, 20],
    "Nine Yin Manual": [0, 20],
    "Nine Yang Manual": [0, 20],
    "Violet Mist Art": [0, 12],
    "Northern Profound Art": [0, 12],
    "Toad Stance": [0, 12],
  },
});
