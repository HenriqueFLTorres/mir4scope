import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { completeArray } from "@/lib/utils";
import Image from "next/image";
import { toRoman } from "typescript-roman-numbers-converter";
import { ItemPlaceholder } from ".";
import Spirit from "../icon/Spirit";
import NFTContainer from "./NFTContainer";

export default function NFTMagicSoulOrb({
  magic_orb,
}: {
  magic_orb: {
    equip_item: { [key in string]: NFT_MAGIC_ORB[] };
  };
}) {
  const availableDeckIndexes = Object.keys(magic_orb?.equip_item);

  return (
    <NFTContainer>
      <Tabs
        className="flex w-full flex-col"
        defaultValue={availableDeckIndexes[0]}
      >
        <header className="mb-8 flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Spirit className="h-8 w-8" />
            <h2 className="text-xl font-semibold">Magical Soul Orb</h2>
          </div>

          <TabsList>
            {availableDeckIndexes.map((deckIndex) => (
              <TabsTrigger key={deckIndex} value={deckIndex}>
                {deckIndex}
              </TabsTrigger>
            ))}
          </TabsList>
        </header>

        {Object.entries(magic_orb?.equip_item).map(
          ([deckIndex, magicOrbObject]) => (
            <TabsContent key={deckIndex} value={deckIndex}>
              {completeArray(Object.values(magicOrbObject), 5).map(
                (magicOrb, index) =>
                  magicOrb ? (
                    <MagicOrbItem key={magicOrb.item_name} {...magicOrb} />
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

function MagicOrbItem({
  grade,
  item_exp,
  item_idx,
  item_level,
  item_name,
  item_path,
  tier,
}: NFT_MAGIC_ORB) {
  return (
    <div
      key={item_name}
      className="relative flex h-20 w-20 items-center justify-center"
    >
      <Image
        src={Number(grade) === 5 ? "/bg-legendary.webp" : "/bg-epic.webp"}
        alt=""
        className="object-contain"
        width={80}
        height={80}
      />
      <Image
        src={item_path}
        alt={item_name}
        className="absolute object-contain"
        width={50}
        height={50}
      />

      <div className="absolute -bottom-1 -left-1 flex h-7 w-7 shrink-0 items-center justify-center">
        <Image
          src={"/icon/spirit-transcend.webp"}
          alt={""}
          className="object-contain"
          width={28}
          height={28}
        />
        <p className="absolute">{toRoman(item_level)}</p>
      </div>
    </div>
  );
}
