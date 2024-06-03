import { Modal } from "./modal";

import NFTAssets from "@/components/NFTModal/NFTAssets";
import NFTBuildings from "@/components/NFTModal/NFTBuildings";
import NFTCodex from "@/components/NFTModal/NFTCodex";
import NFTDragonArtifact from "@/components/NFTModal/NFTDragonArtifact";
import NFTEquipmentDisplay from "@/components/NFTModal/NFTEquipmentDisplay";
import NFTInventory from "@/components/NFTModal/NFTInventory";
import NFTMagicSoulOrb from "@/components/NFTModal/NFTMagicSoulOrb";
import NFTMagicStone from "@/components/NFTModal/NFTMagicStone";
import NFTMysticalPiece from "@/components/NFTModal/NFTMysticalPiece";
import NFTMystique from "@/components/NFTModal/NFTMystique";
import NFTPotentials from "@/components/NFTModal/NFTPotentials";
import NFTSpirit from "@/components/NFTModal/NFTSpirit";
import NFTTags from "@/components/NFTModal/NFTTags";
import NFTTraining from "@/components/NFTModal/NFTTraining";
import NFTTransferenceEquipment from "@/components/NFTModal/NFTTransferenceEquipment";
import Wemix from "@/components/icon/Wemix";
import { getNft } from "@/lib/get-nft";
import { getReadableNumber } from "@/lib/utils";
import { Link } from "lucide-react";
import { useAtom, useAtomValue } from "jotai";
import { UsdPriceAtom } from "@/atom/Price";
import NFTPrice from "@/components/NFTModal/NFTPrice";

export default async function NFTModal({ params }: { params: { id: string } }) {
  const seq = params.id;
  const nft = await getNft(seq);


  if (!nft) return null;

  console.log(nft?.training);

  return (
    <Modal>
      <section className="relative mb-16 flex h-[34rem] w-full justify-center gap-16">
        <NFTEquipmentDisplay class={nft.class} equipItems={nft.equipItems} />
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold">{nft.characterName}</h1>
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

            <NFTPrice nft_price={nft.price} seq={nft.seq} />
          </footer>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <NFTSpirit spirits={nft?.spirits} />

        <NFTMagicSoulOrb magicOrb={nft?.magicOrb} />

        <NFTDragonArtifact equip_items={nft?.equipItems} />

        <NFTTransferenceEquipment succession={nft?.succession} />

        <NFTMagicStone magicStone={nft?.magicStone} />

        <NFTMysticalPiece mysticalPiece={nft?.mysticalPiece} />

        <NFTTraining training={nft?.training} />

        <NFTBuildings buildings={nft?.buildings} />

        <NFTMystique holy_stuff={nft?.holy_stuff} />

        <NFTPotentials potentials={nft?.potentials} />

        <NFTCodex codex={nft?.codex} />

        <NFTInventory inventory={nft?.inventory} />
      </section>
    </Modal>
  );
}
