import { LIST_FILTER_DEFAULT } from "@/atom/ListFilters";
import MainFilters from "@/components/MainFilters";
import NFTDisplay from '@/components/NftList';
import NFTDisplaySkeleton from '@/components/NftList/NFTDisplaySkeleton';
import SortList from "@/components/SortList";
import Search from "@/components/icon/Search";
import { getNfts } from "@/lib/get-nfts";
import { FilterX } from "lucide-react";

export default async function Home() {
  // const {
  //   data: nft_list,
  //   isLoading,
  //   refetch,
  //   isFetching,
  //   isRefetching,
  // } = useQuery({
  //   queryKey: ["nft_list"],
  //   queryFn: () => getNfts(listFilter),
  //   refetchOnWindowFocus: false,
  // });
  const nft_list = await getNfts();

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

      {!nft_list ? (
        <NFTDisplaySkeleton />
      ) : (
        <NFTDisplay nft_list={nft_list} />
      )}
    </main>
  );
}
