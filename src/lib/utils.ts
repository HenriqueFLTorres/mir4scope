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

export function capitalizeString(input: string) {
  const words = input.split(" ")

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  })

  return capitalizedWords.join(" ")
}

export const isRangeDifferent = (
  value1: (number | undefined)[],
  value2: (number | undefined)[]
) => {
  if (value1.length !== value2.length) return true

  for (let i = 0; i < value1.length; i++) {
    if (value1[i] !== value2[i]) return true
  }

  return false
}
