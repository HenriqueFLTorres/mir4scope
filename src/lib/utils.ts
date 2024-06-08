import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Accuracy from "@/components/icon/Accuracy"
import EVA from "@/components/icon/EVA"
import PHYSATK from "@/components/icon/PHYSATK"
import PHYSDEF from "@/components/icon/PHYSDEF"
import SpellATK from "@/components/icon/SpellATK"
import SPELLDEF from "@/components/icon/SpellDEF"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNumber(input: string | number) {
  let newValue = input
  newValue = newValue.toString()
  newValue = newValue.replace(/\D/g, "")
  newValue = Number(newValue)

  const validNumber = Number.isInteger(newValue)

  return validNumber ? newValue : null
}

export const getReadableNumber = (number: number) =>
  Math.round(number).toLocaleString("en", { useGrouping: true })

export function classIndexToName(index: number) {
  switch (index) {
    case 1:
      return "Warrior"
    case 2:
      return "Sorcerer"
    case 3:
      return "Taoist"
    case 4:
      return "Arbalist"
    case 5:
      return "Lancer"
    case 6:
      return "Darkist"
    default:
      throw new Error(
        `Unknown class index given to classIndexToName function: ${index}`
      )
  }
}

export function getStatIcon(stat: NFT_STATS_ENUM) {
  switch (stat) {
    case "PHYS ATK":
      return PHYSATK
    case "PHYS DEF":
      return PHYSDEF
    case "Spell ATK":
      return SpellATK
    case "Spell DEF":
      return SPELLDEF
    case "EVA":
      return EVA
    case "Accuracy":
      return Accuracy
    default:
      throw new Error(`Unknown stat type: ${stat}`)
  }
}

export function gradeToRarity(grade: number | string) {
  switch (Number(grade)) {
    case 5:
      return "legendary"
    case 4:
      return "epic"
    case 3:
      return "rare"
    case 2:
      return "uncommon"
    default:
      return "common"
  }
}

export function completeArray<T extends {}>(
  array: T[],
  size: number
): (T | null)[] {
  if (array.length === size) return array
  const newArray: (T | null)[] = [...array]

  while (newArray.length < size) newArray.push(null)

  return newArray
}

export function getRelativePercentage(
  firstNumber: number | string,
  secondNumber: string | number
) {
  const numberA = Number(firstNumber)
  const numberB = Number(secondNumber)
  if (Number.isNaN(numberA) || Number.isNaN(numberB)) return 0

  const result = (numberA / numberB) * 100

  return result
}

export function capitalizeString(input: string) {
  const words = input.split(" ")

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  })

  return capitalizedWords.join(" ")
}

export const ALL_MIR4_SERVERS = {
  Asia: {
    ASIA1: [
      "ASIA011",
      "ASIA012",
      "ASIA013",
      "ASIA014",
      "ASIA021",
      "ASIA022",
      "ASIA023",
      "ASIA024",
      "ASIA031",
      "ASIA032",
      "ASIA033",
      "ASIA041",
      "ASIA042",
      "ASIA043",
    ],
    ASIA2: [
      "ASIA051",
      "ASIA052",
      "ASIA053",
      "ASIA054",
      "ASIA061",
      "ASIA062",
      "ASIA063",
      "ASIA064",
      "ASIA071",
      "ASIA072",
      "ASIA073",
      "ASIA081",
      "ASIA082",
      "ASIA083",
    ],
    ASIA3: [
      "ASIA311",
      "ASIA312",
      "ASIA313",
      "ASIA314",
      "ASIA321",
      "ASIA322",
      "ASIA323",
      "ASIA324",
      "ASIA331",
      "ASIA332",
      "ASIA333",
      "ASIA341",
      "ASIA342",
      "ASIA343",
    ],
    ASIA4: [
      "ASIA351",
      "ASIA352",
      "ASIA353",
      "ASIA354",
      "ASIA361",
      "ASIA362",
      "ASIA363",
      "ASIA364",
      "ASIA371",
      "ASIA372",
      "ASIA373",
    ],
  },
  "Middle East": {
    INMENA1: [
      "INMENA011",
      "INMENA012",
      "INMENA013",
      "INMENA014",
      "INMENA021",
      "INMENA022",
      "INMENA023",
      "INMENA024",
    ],
  },
  Europe: {
    EU1: [
      "EU011",
      "EU012",
      "EU013",
      "EU014",
      "EU021",
      "EU022",
      "EU023",
      "EU024",
      "EU031",
      "EU032",
      "EU033",
      "EU034",
      "EU041",
      "EU042",
      "EU043",
    ],
  },
  "South America": {
    SA1: [
      "SA011",
      "SA012",
      "SA013",
      "SA014",
      "SA021",
      "SA022",
      "SA023",
      "SA031",
      "SA032",
      "SA033",
      "SA034",
      "SA041",
      "SA043",
      "SA044",
    ],
    SA2: [
      "SA051",
      "SA052",
      "SA053",
      "SA054",
      "SA061",
      "SA062",
      "SA063",
      "SA064",
      "SA071",
      "SA072",
      "SA073",
      "SA081",
      "SA082",
      "SA083",
    ],
  },
  "North America": {
    NA2: [
      "NA051",
      "NA052",
      "NA053",
      "NA054",
      "NA061",
      "NA062",
      "NA064",
      "NA071",
      "NA072",
      "NA073",
      "NA074",
      "NA081",
      "NA082",
      "NA083",
    ],
  },
}
