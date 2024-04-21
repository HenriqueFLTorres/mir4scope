import Enhance from "@/components/NFTModal/Enhance";
import ItemDetailTooltip from "@/components/NFTModal/ItemDetailTooltip";
import ItemPlaceholder from "@/components/NFTModal/ItemPlaceholder";
import NFTContainer from "@/components/NFTModal/NFTContainer";
import Transcend from "@/components/NFTModal/Transcend";
import Spirit from "@/components/icon/Spirit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { completeArray, gradeToRarity } from "@/lib/utils";
import type { NFTSelectAll } from "@/types/schema";
import Image from "next/image";

export default function NFTMysticalPiece({
  mysticalPiece,
}: Pick<NFTSelectAll, "mysticalPiece">) {
  const availableDeckIndexes = Object.keys(mysticalPiece?.equipItem);

  return (
    <NFTContainer>
      <Tabs
        className="flex w-full flex-col"
        defaultValue={String(
          mysticalPiece?.active_deck ?? availableDeckIndexes[0],
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
              {completeArray(Object.values(mysticalPieceObject), 8).map(
                (mysticalPiece, index) =>
                  mysticalPiece ? (
                    <MysticalPieceItem
                      key={mysticalPiece.item_idx}
                      {...mysticalPiece}
                    />
                  ) : (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <ItemPlaceholder key={`${deckIndex}-${index}`} />
                  ),
              )}
            </TabsContent>
          ),
        )}
      </Tabs>
    </NFTContainer>
  );
}

function MysticalPieceItem({
  grade,
  item_name,
  item_path,
  tier,
  refine_step,
  trance_step,
  power_score,
  options,
  add_option,
}: NFT_MYSTICAL_PIECE) {
  return (
    <ItemDetailTooltip
      add_option={add_option}
      options={options}
      item_name={item_name}
      item_path={item_path}
      power_score={power_score}
    >
      <div className="relative flex h-20 w-20 items-center justify-center">
        <Image
          src={`/bg-${gradeToRarity(grade)}.webp`}
          alt=""
          className="object-contain"
          width={80}
          height={80}
        />
        <Image
          src={item_path}
          alt={item_name}
          className="absolute object-contain"
          width={64}
          height={64}
        />

        <Transcend value={tier} />

        <Enhance value={trance_step} />
      </div>
    </ItemDetailTooltip>
  );
}
