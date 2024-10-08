"use client"

import MainFilters from "@/app/(components)/form/MainFilters"
import SortList from "@/app/(components)/form/SortList"
import NFTDisplay from "@/app/(components)/list"
import NFTDisplaySkeleton from "@/app/(components)/list/skeleton"
import { LIST_FILTER_DEFAULT, type ListFiltersType } from "@/atom/ListFilters"
import { UsdPriceAtom } from "@/atom/Price"
import { Search } from "@/components/other"
import { getNfts } from "@/lib/get-nfts"
import { getPrice } from "@/lib/get-price"
import { useQuery } from "@tanstack/react-query"
import { useSetAtom } from "jotai"
import { FilterX } from "lucide-react"
import { useEffect } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FilterBadges } from "./(components)/form/FilterBadges"

export default function Home() {
  const setUsdPriceAtom = useSetAtom(UsdPriceAtom)

  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty },
    control,
    setValue,
    reset,
    setFocus,
    resetField,
  } = useForm<ListFiltersType>({ defaultValues: LIST_FILTER_DEFAULT })

  const {
    data: nft_list = [],
    isLoading,
    refetch,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: ["nft_list"],
    queryFn: () => getNfts({ ...watch(), wemix_price: price }),
    refetchOnWindowFocus: false,
  })

  const { data: price, isSuccess } = useQuery({
    queryKey: ["price"],
    queryFn: () => getPrice(),
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (isSuccess) {
      setUsdPriceAtom(price.USD)
    }
  }, [isSuccess, price, setUsdPriceAtom])

  const onSubmit: SubmitHandler<ListFiltersType> = (data) => console.debug(data)

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-24 pb-48">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <MainFilters
          control={control}
          register={register}
          setFocus={setFocus}
          setValue={setValue}
        />

        <div className="flex w-full gap-4">
          <button
            className="h-10 w-full gap-2 rounded-lg border-2 border-[#7C71AA] bg-[#44356A] p-2 font-medium text-white focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40"
            disabled={!isDirty}
            type="submit"
            onClick={() => refetch()}
          >
            <Search className="h-5 w-5" /> Update List
          </button>

          <button
            className="h-10 shrink-0 gap-2 rounded-lg border border-black/20 bg-black/10 p-2 px-12 font-medium text-white transition-colors hover:border-error-400/20 hover:bg-error-400/10 focus-visible:border-error-400/20 focus-visible:bg-error-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error-400 disabled:pointer-events-none disabled:opacity-40"
            type="reset"
            onClick={() => reset()}
          >
            <FilterX className="h-5 w-5" /> Clear Filters
          </button>

          <SortList control={control} />
        </div>

        <FilterBadges
          filters={watch()}
          resetField={resetField}
          setValue={setValue}
        />

        {/* <pre className="rounded bg-black/40 p-2 text-xs text-white">
          {JSON.stringify(watch("stats"), null, 2)}
        </pre> */}
      </form>

      {isLoading || isFetching || isRefetching ? (
        <NFTDisplaySkeleton />
      ) : (
        <NFTDisplay nft_list={nft_list} />
      )}
    </main>
  )
}
