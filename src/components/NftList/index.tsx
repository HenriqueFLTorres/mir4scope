import NFTCard from "@/components/NftList/NFTCard";
import type { NFTForDisplay } from "@/types/schema";

const NFTDisplay = ({ nft_list }: { nft_list: NFTForDisplay[] }) => {
  return (
    <section className="mb-24 flex flex-col gap-8 md:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {nft_list.map((data) => (
        <NFTCard key={data.seq} {...data} />
      ))}
    </section>
  );
};

export default NFTDisplay;
