import ItemPlaceholder from "@/components/NFTModal/ItemPlaceholder";
import NFTContainer from "@/components/NFTModal/NFTContainer";
import Transcend from "@/components/NFTModal/Transcend";
import Spirit from "@/components/icon/Spirit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { completeArray } from "@/lib/utils";
import Image from "next/image";

export default function NFTSpirit({
  spirits,
}: {
  spirits: { equip: { [key in string]: { [key in string]: NFT_SPIRIT } } };
}) {
  const availableDeckIndexes = Object.keys(spirits?.equip);

  return (
    <NFTContainer>
      <Tabs
        className="flex w-full flex-col"
        defaultValue={availableDeckIndexes[0]}
      >
        <header className="mb-8 flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Spirit className="h-8 w-8" />
            <h2 className="text-xl font-semibold">Spirit</h2>
          </div>

          <TabsList>
            {availableDeckIndexes.map((deckIndex) => (
              <TabsTrigger key={deckIndex} value={deckIndex}>
                {deckIndex}
              </TabsTrigger>
            ))}
          </TabsList>
        </header>

        {Object.entries(spirits?.equip).map(([deckIndex, spiritsObject]) => (
          <TabsContent key={deckIndex} value={deckIndex}>
            {completeArray(Object.values(spiritsObject), 5).map(
              (spirit, index) =>
                spirit ? (
                  <SpiritItem key={spirit.pet_name} {...spirit} />
                ) : (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <ItemPlaceholder key={`${deckIndex}-${index}`} />
                ),
            )}
          </TabsContent>
        ))}
      </Tabs>
    </NFTContainer>
  );
}

function SpiritItem({ grade, icon_path, pet_name, transcend }: NFT_SPIRIT) {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <Image
        src={grade === 5 ? "/bg-legendary.webp" : "/bg-epic.webp"}
        alt=""
        className="object-contain"
        width={80}
        height={80}
      />
      <Image
        src={icon_path}
        alt={pet_name}
        className="absolute object-contain"
        width={50}
        height={50}
      />

      <Transcend value={transcend} />
    </div>
  );
}
