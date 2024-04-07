import type { ListFiltersType } from '@/atom/ListFilters';

export const getNfts = async (listFilter: ListFiltersType) => {
  const res = await fetch("http://localhost:3000/api/get-nfts", {
    cache: "no-cache",
    method: "POST",
    body: JSON.stringify(listFilter)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
