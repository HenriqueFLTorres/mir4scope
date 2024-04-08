"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { getNft } from "@/lib/get-nft";
import { getReadableNumber } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Wemix from "../icon/Wemix";
import NFTAssets from "./NFTAssets";
import NFTBuildings from "./NFTBuildings";
import NFTCodex from "./NFTCodex";
import NFTDragonArtifact from "./NFTDragonArtifact";
import NFTEquipmentDisplay from "./NFTEquipmentDisplay";
import NFTInventory from "./NFTInventory";
import NFTMagicSoulOrb from "./NFTMagicSoulOrb";
import NFTMagicStone from "./NFTMagicStone";
import NFTMysticalPiece from "./NFTMysticalPiece";
import NFTMystique from "./NFTMystique";
import NFTPotentials from "./NFTPotentials";
import NFTSpirit from "./NFTSpirit";
import NFTTags from "./NFTTags";
import NFTTraining from "./NFTTraining";
import NFTTransferenceEquipment from "./NFTTransferenceEquipment";

export default function NFTModal({ seq }: { seq: string }) {
  const router = useRouter();
  const handleClose = () => router.back();
  const { data: nft, isLoading } = useQuery({
    queryKey: ["nft", seq],
    queryFn: () => getNft(seq),
    refetchOnWindowFocus: false,
  });

  return (
    <Sheet defaultOpen open onOpenChange={handleClose}>
      <SheetContent className="overflow-auto">
        {isLoading ? (
          <p>asdfasdf</p>
        ) : (
          <>
            <section className="relative mb-16 flex h-[34rem] w-full justify-center gap-16">
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
                      <Wemix className="h-6 w-6" />{" "}
                      {getReadableNumber(nft.price)}
                    </span>
                  </a>
                </footer>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-4">
              <NFTSpirit spirits={nft?.spirits} />

              <NFTMagicSoulOrb magic_orb={nft?.magic_orb} />

              <NFTDragonArtifact equip_items={nft?.equip_items} />

              <NFTTransferenceEquipment succession={nft?.succession} />

              <NFTMagicStone magic_stone={nft?.magic_stone} />

              <NFTMysticalPiece mystical_piece={nft?.mystical_piece} />

              <NFTTraining training={nft?.training} />

              <NFTBuildings buildings={nft?.buildings} />

              <NFTMystique holy_stuff={nft?.holy_stuff} />

              <NFTPotentials potentials={nft?.potentials} />

              <NFTCodex codex={nft?.codex} />

              <NFTInventory inventory={nft?.inventory} />
            </section>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function ItemPlaceholder() {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <Image
        src={"/icon/spirit-none.webp"}
        alt=""
        className="object-contain"
        width={80}
        height={80}
      />
    </div>
  );
}
