import { completeArray, gradeToRarity } from "@/lib/utils";
import Image from "next/image";
import { ItemPlaceholder } from ".";
import type { NftMysticalPiece } from "../../../prisma-types";
import Spirit from "../icon/Spirit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Enhance from "./Enhance";
import ItemDetailTooltip from "./ItemDetailTooltip";
import NFTContainer from "./NFTContainer";
import Transcend from "./Transcend";

export default function NFTMysticalPiece({
  mystical_piece,
}: {
  mystical_piece: {
    equip_item: { [key in string]: NftMysticalPiece[] };
    active_deck: number;
  };
}) {
  const availableDeckIndexes = Object.keys(mystical_piece?.equip_item);

  return (
    <NFTContainer>
      <Tabs
        className="flex w-full flex-col"
        defaultValue={String(
          mystical_piece?.active_deck ?? availableDeckIndexes[0],
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

        {Object.entries(mystical_piece?.equip_item).map(
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
}: NftMysticalPiece) {
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
