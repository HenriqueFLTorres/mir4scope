"use client";

import { getNft } from "@/lib/get-nft";
import { getReadableNumber } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import Wemix from "../icon/Wemix";
import { Dialog, DialogContent } from "../ui/dialog";
import NFTAssets from "./NFTAssets";
import NFTEquipmentDisplay from "./NFTEquipmentDisplay";
import NFTTags from "./NFTTags";

export default function NFTModal({ seq }: { seq: string }) {
  const router = useRouter();
  const handleClose = () => router.back();
  const { data: nft, isLoading } = useQuery({
    queryKey: ["nft", seq],
    queryFn: () => getNft(seq),
  });
  console.log(nft);

  return (
    <Dialog defaultOpen open onOpenChange={handleClose}>
      <DialogContent className="max-w-[80rem]">
        {isLoading ? (
          <p>asdfasdf</p>
        ) : (
          <section className="relative flex h-[34rem] w-full justify-center gap-16">
            <NFTEquipmentDisplay
              class={nft.class}
              equip_items={nft.equip_items}
            />
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl font-bold">{nft.character_name}</h1>
              <NFTTags {...nft} />

              <NFTAssets assets={nft.assets} />

              <footer className="mt-auto flex flex-col gap-4">
                <a
                  href={`https://xdraco.com/nft/trade/${nft.seq}`}
                  target="_blank"
                  className="flex h-14 w-full items-center justify-center gap-4 rounded-lg border border-black/20 bg-black/10 px-3 py-1.5 text-lg font-medium transition-colors hover:border-black/40 hover:bg-black/20"
                  rel="noreferrer"
                >
                  <Link /> Open Link
                </a>

                <a
                  href={`https://xdraco.com/nft/trade/${nft.seq}`}
                  target="_blank"
                  className="h-14 rounded-lg bg-gradient-to-b from-[#FF4BAC] to-[#89005A] p-0.5"
                  rel="noreferrer"
                >
                  <span className="flex h-full w-full items-center justify-center gap-4 rounded-lg bg-gradient-to-r from-[#140000] via-[#320030] to-[#140000] px-3 py-1.5 text-lg font-medium transition-colors hover:border-black/40 hover:bg-black/20">
                    <Wemix className="h-6 w-6" /> {getReadableNumber(nft.price)}
                  </span>
                </a>
              </footer>
            </div>
          </section>
        )}
      </DialogContent>
    </Dialog>
  );
}
