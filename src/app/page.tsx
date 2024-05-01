"use client";

import { LIST_FILTER_DEFAULT, type ListFiltersType } from "@/atom/ListFilters";
import MainFilters from "@/components/MainFilters";
import NFTDisplay from "@/components/NftList";
import NFTDisplaySkeleton from "@/components/NftList/NFTDisplaySkeleton";
import SortList from "@/components/SortList";
import { getNfts } from "@/lib/get-nfts";
import { useQuery } from "@tanstack/react-query";
import { FilterX, Search } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty },
    control,
    setValue,
    reset,
  } = useForm<ListFiltersType>({ defaultValues: LIST_FILTER_DEFAULT });

  const {
    data: nft_list,
    isLoading,
    refetch,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: ["nft_list"],
    queryFn: () => getNfts(watch()),
    refetchOnWindowFocus: false,
  });

  const onSubmit: SubmitHandler<ListFiltersType> = (data) => console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-24">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <MainFilters register={register} control={control} />

        <div className="mb-16 flex w-full gap-4">
          <button
            type="submit"
            className="h-10 w-full gap-2 rounded-lg border-2 border-[#7C71AA] bg-[#44356A] p-2 font-medium text-white focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40"
            onClick={() => refetch()}
            disabled={!isDirty}
          >
            <Search className="h-5 w-5" /> Update List
          </button>

          <button
            type="reset"
            onClick={() => reset()}
            className="h-10 shrink-0 gap-2 rounded-lg border border-black/20 bg-black/10 p-2 px-12 font-medium text-white transition-colors hover:border-error-400/20 hover:bg-error-400/10 focus-visible:border-error-400/20 focus-visible:bg-error-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error-400 disabled:pointer-events-none disabled:opacity-40"
          >
            <FilterX className="h-5 w-5" /> Clear Filters
          </button>

          <SortList control={control} />
        </div>

        <pre className="rounded bg-black/40 p-2 text-white">
          {JSON.stringify(watch("building"), null, 2)}
        </pre>
      </form>

      {!nft_list || isLoading || isFetching || isRefetching ? (
        <NFTDisplaySkeleton />
      ) : (
        <NFTDisplay nft_list={nft_list} />
      )}
    </main>
  );
}
