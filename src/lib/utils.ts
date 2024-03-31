import Accuracy from "@/components/icon/Accuracy";
import EVA from "@/components/icon/EVA";
import PHYSATK from "@/components/icon/PHYSATK";
import PHYSDEF from "@/components/icon/PHYSDEF";
import SpellATK from "@/components/icon/SpellATK";
import SPELLDEF from "@/components/icon/SpellDEF";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNumber(input: string | number) {
  let newValue = input;
  newValue = newValue.toString();
  newValue = newValue.replace(/\D/g, "");
  newValue = Number(newValue);

  const validNumber = Number.isInteger(newValue);

  return validNumber ? newValue : null;
}

export const getReadableNumber = (number: number) =>
  Math.round(number).toLocaleString("en", { useGrouping: true });

export function classIndexToName(index: number) {
  switch (index) {
    case 1:
      return "Warrior";
    case 2:
      return "Sorcerer";
    case 3:
      return "Taoist";
    case 4:
      return "Arbalist";
    case 5:
      return "Lancer";
    case 6:
      return "Darkist";
    default:
      throw new Error(
        `Unknown class index given to classIndexToName function: ${index}`,
      );
  }
}

export function getStatIcon(stat: StatType) {
  switch (stat) {
    case "PHYS ATK":
      return PHYSATK;
    case "PHYS DEF":
      return PHYSDEF;
    case "Spell ATK":
      return SpellATK;
    case "Spell DEF":
      return SPELLDEF;
    case "EVA":
      return EVA;
    case "Accuracy":
      return Accuracy;
    default:
      throw new Error(`Unknown stat type: ${stat}`);
  }
}

export function gradeToRarity(grade: number) {
  switch (grade) {
    case 5:
      return "legendary";
    case 4:
      return "epic";
    case 3:
      return "rare";
    case 2:
      return "uncommon";
    default:
      return "common";
  }
}

export function handleTierValue(tier: number) {
  switch (tier) {
    case 5:
      return "V";
    case 4:
      return "IV";
    default:
      return "I".repeat(tier);
  }
}
