import type { ListFiltersType } from "@/atom/ListFilters"

export const getNfts = async (listFilter: ListFiltersType) => {
  const response = await fetch("/api/get-nfts", {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify(listFilter),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch nfts data")
  }

  return response.json()
}
