"use client";

import type { NftFromMongo } from "@/app/api/get-nfts/route";
import NFTCard from "@/components/NftList/NFTCard";

const NFTDisplay = ({ nft_list }: { nft_list: NftFromMongo[] }) => {
  return (
    <section className="mb-24 flex flex-col gap-8 md:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {nft_list.map((data) => (
        <NFTCard key={data.id} {...data} />
      ))}
    </section>
  );
};

export default NFTDisplay;
