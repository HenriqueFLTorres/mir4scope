import NFTContainer from "@/app/@modal/(.)nft/[id]/(components)/NFTContainer"
import Transcend from "@/app/@modal/(.)nft/[id]/(components)/Transcend"
import { Spirit } from "@/components/other"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/elements/tabs"
import Image from "next/image"

export default function NFTSpirit({
  spirits,
}: {
  spirits: { equip: { [key in string]: { [key in string]: NFT_SPIRIT } } }
}) {
  const availableDeckIndexes = Object.keys(spirits?.equip)

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
            {Object.values(spiritsObject).map((spirit) => (
              <SpiritItem key={spirit.pet_name} {...spirit} />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </NFTContainer>
  )
}

function SpiritItem({ grade, icon_path, pet_name, transcend }: NFT_SPIRIT) {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <Image
        alt=""
        className="object-contain"
        height={80}
        src={grade === 5 ? "/bg-legendary.webp" : "/bg-epic.webp"}
        width={80}
      />
      <Image
        alt={pet_name}
        className="absolute object-contain"
        height={50}
        src={icon_path}
        width={50}
      />

      <Transcend value={transcend} />
    </div>
  )
}
