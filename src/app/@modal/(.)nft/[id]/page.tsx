import { Link } from "lucide-react"
import { Modal } from "./modal"

import {
  NFTAssets,
  NFTBuildings,
  NFTCodex,
  NFTDragonArtifact,
  NFTEquipmentDisplay,
  NFTInventory,
  NFTMagicSoulOrb,
  NFTMagicStone,
  NFTMysticalPiece,
  NFTMystique,
  NFTPotentials,
  NFTPrice,
  NFTSpirit,
  NFTTags,
  NFTTraining,
  NFTTransferenceEquipment,
} from "@/app/@modal/(.)nft/[id]/(components)/sections"
import { getNft } from "@/lib/get-nft"

export default async function NFTModal({ params }: { params: { id: string } }) {
  const seq = params.id
  const nft = await getNft(seq)

  if (!nft) return null

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
              className="flex h-14 w-full items-center justify-center gap-4 rounded-lg border border-black/20 bg-black/10 px-3 py-1.5 text-lg font-medium transition-colors hover:border-black/40 hover:bg-black/20"
              href={`https://xdraco.com/nft/trade/${nft.seq}`}
              rel="noreferrer"
              target="_blank"
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
  )
}
