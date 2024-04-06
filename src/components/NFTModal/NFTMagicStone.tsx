import { completeArray, gradeToRarity } from "@/lib/utils";
import Image from "next/image";
import { ItemPlaceholder } from ".";
import type { NftMagicStone } from "../../../prisma-types";
import Spirit from "../icon/Spirit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Enhance from "./Enhance";
import NFTContainer from "./NFTContainer";
import Transcend from "./Transcend";

export default function NFTMagicStone({
  magic_stone,
}: {
  magic_stone: {
    equip_item: { [key in string]: NftMagicStone[] };
    active_deck: number;
  };
}) {
  const availableDeckIndexes = Object.keys(magic_stone?.equip_item);

  return (
    <NFTContainer>
      <Tabs
        className="flex w-full flex-col"
        defaultValue={String(
          magic_stone?.active_deck ?? availableDeckIndexes[0],
        )}
      >
        <header className="mb-8 flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Spirit className="h-8 w-8" />
            <h2 className="text-xl font-semibold">Magic Stone</h2>
          </div>

          <TabsList>
            {availableDeckIndexes.map((deckIndex) => (
              <TabsTrigger key={deckIndex} value={deckIndex}>
                {deckIndex}
              </TabsTrigger>
            ))}
          </TabsList>
        </header>

        {Object.entries(magic_stone?.equip_item).map(
          ([deckIndex, magicStoneObject]) => (
            <TabsContent
              className="grid w-full grid-cols-4"
              key={deckIndex}
              value={deckIndex}
            >
              {completeArray(Object.values(magicStoneObject), 12).map(
                (magicStone, index) =>
                  magicStone ? (
                    <MagicStoneItem key={magicStone.item_idx} {...magicStone} />
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

function MagicStoneItem({
  grade,
  item_name,
  item_path,
  tier,
  refine_step,
  trance_step,
  power_score,
  options,
  add_option,
}: NftMagicStone) {
  return (
    <div
      key={item_name}
      className="relative flex h-20 w-20 items-center justify-center"
    >
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
  );
}
