import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNumber(input: string | number) {
  input = input.toString();
  input = input.replace(/\D/g, "");
  input = Number(input);

  const validNumber = Number.isInteger(input);

  return validNumber ? input : null;
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
