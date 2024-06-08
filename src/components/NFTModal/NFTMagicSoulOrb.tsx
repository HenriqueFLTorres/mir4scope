import Image from "next/image"
import { toRoman } from "typescript-roman-numbers-converter"
import Spirit from "@/components/icon/Spirit"
import ItemPlaceholder from "@/components/NFTModal/ItemPlaceholder"
import NFTContainer from "@/components/NFTModal/NFTContainer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { completeArray } from "@/lib/utils"
import type { NFTSelectAll } from "@/types/schema"

export default function NFTMagicSoulOrb({
  magicOrb,
}: Pick<NFTSelectAll, "magicOrb">) {
  const availableDeckIndexes = Object.keys(magicOrb?.equipItem)

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

        {Object.entries(magicOrb?.equipItem).map(
          ([deckIndex, magicOrbObject]) => (
            <TabsContent key={deckIndex} value={deckIndex}>
              {completeArray(Object.values(magicOrbObject), 5).map(
                (magicOrb, index) =>
                  magicOrb ? (
                    <MagicOrbItem key={magicOrb.item_name} {...magicOrb} />
                  ) : (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <ItemPlaceholder key={`${deckIndex}-${index}`} />
                  )
              )}
            </TabsContent>
          )
        )}
      </Tabs>
    </NFTContainer>
  )
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
      className="relative flex h-20 w-20 items-center justify-center"
      key={item_name}
    >
      <Image
        alt=""
        className="object-contain"
        height={80}
        src={Number(grade) === 5 ? "/bg-legendary.webp" : "/bg-epic.webp"}
        width={80}
      />
      <Image
        alt={item_name}
        className="absolute object-contain"
        height={50}
        src={item_path}
        width={50}
      />

      <div className="absolute -bottom-1 -left-1 flex h-7 w-7 shrink-0 items-center justify-center">
        <Image
          alt={""}
          className="object-contain"
          height={28}
          src={"/icon/spirit-transcend.webp"}
          width={28}
        />
        <p className="absolute">{toRoman(item_level)}</p>
      </div>
    </div>
  )
}
