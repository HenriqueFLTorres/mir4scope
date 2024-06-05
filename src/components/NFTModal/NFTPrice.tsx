"use client";

import { getReadableNumber } from "@/lib/utils";
import Wemix from "../icon/Wemix";
import { useAtomValue } from "jotai/index";
import { UsdPriceAtom } from "@/atom/Price";

interface NftPriceProps {
  nft_price: number;
  seq: number;
}

export default function NFTPrice(props: NftPriceProps) {
  const price = useAtomValue(UsdPriceAtom);

  const formattedPrice = price ? (Number(price) * props.nft_price).toFixed(2) : 0;

  return (
    <a
      href={`https://xdraco.com/nft/trade/${props.seq}`}
      target="_blank"
      className="h-14 rounded-lg bg-gradient-to-b from-[#FF4BAC] to-[#89005A] p-0.5"
      rel="noreferrer"
    >
      <span className="flex h-full w-full items-center justify-center gap-4 rounded-lg bg-gradient-to-r from-[#140000] via-[#320030] to-[#140000] px-3 py-1.5 text-lg font-medium transition-colors hover:border-black/40 hover:bg-black/20">
        <Wemix className="h-6 w-6" /> {getReadableNumber(props.nft_price)}
        <b className="ml-2">
          ${formattedPrice}
        </b>
      </span>
    </a>
  );
}
