import Search from "@/components/icon/Search";
import MainFilters from "@/components/MainFilters";
import NFTDisplay from '@/components/NFTDisplay';
import SortList from '@/components/SortList';
import {
  FilterX
} from "lucide-react";

type nftStatName =
  | "HP"
  | "MP"
  | "PHYS ATK"
  | "Spell ATK"
  | "PHYS DEF"
  | "Spell DEF";

async function getData() {
  const res = await fetch('http://localhost:3000/api/lists', { cache: 'no-cache' })

  if (!res.ok) {
    const data = await res.json();
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  // const [listFilter, setListFilter] = useAtom(ListFilterAtom);
  const { success, data } = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 bg-gradient-to-br from-[#44356A] to-[#272039] p-24">
      <MainFilters />

      <div className="mb-16 flex w-full gap-4">
        <button
          // onClick={async () => {
          //   const response = await fetch("api/dump");
          //   const data = await response.json();

          //   console.log(data);
          // }}
          className="h-10 w-full gap-2 rounded-lg border-2 border-[#7C71AA] bg-[#44356A] p-2 font-medium text-white"
        >
          <Search className="h-5 w-5" /> Update List
        </button>

        <button
          // onClick={() => setListFilter(LIST_FILTER_DEFAULT)}
          className="h-10 shrink-0 gap-2 rounded-lg border-2 border-white/10 bg-white/5 p-2 px-12 font-medium text-white transition-colors hover:border-error-400/20 hover:bg-error-400/10"
        >
          <FilterX className="h-5 w-5" /> Clear Filters
        </button>

        <SortList />
      </div>

      <NFTDisplay nftData={data} />
    </main>
  );
}
