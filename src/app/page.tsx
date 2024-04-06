import MainFilters from "@/components/MainFilters";
import NFTDisplay from "@/components/NftList";
import SortList from "@/components/SortList";
import Search from "@/components/icon/Search";
import { FilterX } from "lucide-react";

async function getData() {
  const res = await fetch("http://localhost:3000/api/get-nfts", { cache: "no-cache" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  // const [listFilter, setListFilter] = useAtom(ListFilterAtom);
  const { success, data } = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 bg-gradient-to-br from-[#44356A] to-[#272039] p-24">
      <MainFilters />

      <div className="mb-16 flex w-full gap-4">
        <button
          type="button"
          className="h-10 w-full gap-2 rounded-lg border-2 border-[#7C71AA] bg-[#44356A] p-2 font-medium text-white focus-visible:outline-none"
        >
          <Search className="h-5 w-5" /> Update List
        </button>

        <button
          type="button"
          // onClick={() => setListFilter(LIST_FILTER_DEFAULT)}
          className="h-10 shrink-0 gap-2 rounded-lg border border-black/20 bg-black/10 p-2 px-12 font-medium text-white transition-colors hover:border-error-400/20 hover:bg-error-400/10 focus-visible:border-error-400/20 focus-visible:bg-error-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error-400"
        >
          <FilterX className="h-5 w-5" /> Clear Filters
        </button>

        <SortList />
      </div>

      <NFTDisplay nft_list={data} />
    </main>
  );
}
