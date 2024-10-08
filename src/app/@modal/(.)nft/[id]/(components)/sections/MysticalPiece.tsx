import Image from "next/image"
import NFTContainer from "@/app/@modal/(.)nft/[id]/(components)/container"
import Enhance from "@/app/@modal/(.)nft/[id]/(components)/Enhance"
import ItemDetailTooltip from "@/app/@modal/(.)nft/[id]/(components)/ItemDetailTooltip"
import Transcend from "@/app/@modal/(.)nft/[id]/(components)/Transcend"
import { Spirit } from "@/components/other"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/elements/tabs"
import { gradeToRarity } from "@/lib/utils"
import type { NFTSelectAll } from "@/types/schema"

export default function NFTMysticalPiece({
  mysticalPiece,
}: Pick<NFTSelectAll, "mysticalPiece">) {
  const availableDeckIndexes = Object.keys(mysticalPiece?.equipItem)

  return (
    <NFTContainer>
      <Tabs
        className="flex w-full flex-col"
        defaultValue={String(
          mysticalPiece?.active_deck ?? availableDeckIndexes[0]
        )}
      >
        <header className="mb-8 flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Spirit className="h-8 w-8" />
            <h2 className="text-xl font-semibold">Mystical Piece</h2>
          </div>

          <TabsList>
            {availableDeckIndexes.map((deckIndex) => (
              <TabsTrigger key={deckIndex} value={deckIndex}>
                {deckIndex}
              </TabsTrigger>
            ))}
          </TabsList>
        </header>

        {Object.entries(mysticalPiece?.equipItem).map(
          ([deckIndex, mysticalPieceObject]) => (
            <TabsContent
              className="grid w-full grid-cols-3"
              key={deckIndex}
              value={deckIndex}
            >
              {Object.values(mysticalPieceObject).map((mysticalPiece) => (
                <MysticalPieceItem
                  key={mysticalPiece.item_idx}
                  {...mysticalPiece}
                />
              ))}
            </TabsContent>
          )
        )}
      </Tabs>
    </NFTContainer>
  )
}

function MysticalPieceItem({
  grade,
  item_name,
  item_path,
  tier,
  trance_step,
  power_score,
  options,
  add_option,
}: NFT_MYSTICAL_PIECE) {
  return (
    <ItemDetailTooltip
      add_option={add_option}
      item_name={item_name}
      item_path={item_path}
      options={options}
      power_score={power_score}
    >
      <div className="relative flex h-20 w-20 items-center justify-center">
        <Image
          alt=""
          className="object-contain"
          height={80}
          src={`/bg-${gradeToRarity(grade)}.webp`}
          width={80}
        />
        <Image
          alt={item_name}
          className="absolute object-contain"
          height={64}
          src={item_path}
          width={64}
        />

        <Transcend value={tier} />

        <Enhance value={trance_step} />
      </div>
    </ItemDetailTooltip>
  )
}
