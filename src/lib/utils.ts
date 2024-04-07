import Accuracy from "@/components/icon/Accuracy";
import EVA from "@/components/icon/EVA";
import PHYSATK from "@/components/icon/PHYSATK";
import PHYSDEF from "@/components/icon/PHYSDEF";
import SpellATK from "@/components/icon/SpellATK";
import SPELLDEF from "@/components/icon/SpellDEF";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { NftStats } from "../../prisma-types";

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

export function getStatIcon(stat: keyof NftStats) {
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

export function gradeToRarity(grade: number | string) {
  switch (Number(grade)) {
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

export function completeArray<T extends {}>(
  array: T[],
  size: number,
): (T | null)[] {
  if (array.length === size) return array;
  const newArray: (T | null)[] = [...array];

  while (newArray.length < size) newArray.push(null);

  return newArray;
}

export function getRelativePercentage(
  firstNumber: number | string,
  secondNumber: string | number,
) {
  const numberA = Number(firstNumber);
  const numberB = Number(secondNumber);
  if (Number.isNaN(numberA) || Number.isNaN(numberB)) return 0;

  const result = (numberA / numberB) * 100;

  return result;
}
