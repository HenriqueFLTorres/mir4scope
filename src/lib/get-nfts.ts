import type { ListFiltersType } from "@/atom/ListFilters";

export const getNfts = async (listFilter: ListFiltersType) => {
  const response = await fetch("http://localhost:3000/api/get-nfts", {
    method: "POST",
    body: JSON.stringify(listFilter),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch nfts data");
  }

  return response.json();
};
